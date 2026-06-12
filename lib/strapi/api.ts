import "server-only"

import { getRequiredStrapiApiUrl } from "@/lib/strapi/env"
import type { JsonValue, StrapiQueryParams, StrapiQueryValue } from "@/lib/strapi/types"

export type StrapiFetchOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | JsonValue
  authToken?: string | null
  query?: StrapiQueryParams
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

export class StrapiApiError extends Error {
  readonly status: number
  readonly statusText: string
  readonly url: string
  readonly details: unknown

  constructor(response: Response, details: unknown) {
    super(`Strapi request failed: ${response.status} ${response.statusText}`)
    this.name = "StrapiApiError"
    this.status = response.status
    this.statusText = response.statusText
    this.url = response.url
    this.details = details
  }
}

export class StrapiConnectionError extends Error {
  readonly path: string

  constructor(path: string, cause: unknown) {
    super(`Strapi request could not be completed for ${path}`, { cause })
    this.name = "StrapiConnectionError"
    this.path = path
  }
}

export function isStrapiRequestError(error: unknown) {
  return error instanceof StrapiApiError || error instanceof StrapiConnectionError
}

const STRAPI_API_PATH_PREFIX = "/api"

function normalizeApiPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  if (normalizedPath.startsWith(STRAPI_API_PATH_PREFIX)) {
    return normalizedPath
  }

  return `${STRAPI_API_PATH_PREFIX}${normalizedPath}`
}

function appendQueryParam(
  searchParams: URLSearchParams,
  key: string,
  value: StrapiQueryValue,
) {
  if (value === undefined || value === null) {
    return
  }

  if (value instanceof Date) {
    searchParams.append(key, value.toISOString())
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      appendQueryParam(searchParams, `${key}[${index}]`, item)
    })
    return
  }

  if (typeof value === "object") {
    Object.entries(value).forEach(([childKey, childValue]) => {
      appendQueryParam(searchParams, `${key}[${childKey}]`, childValue)
    })
    return
  }

  searchParams.append(key, String(value))
}

function buildStrapiApiUrl(path: string, query?: StrapiQueryParams) {
  const url = new URL(`${getRequiredStrapiApiUrl()}${normalizeApiPath(path)}`)

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      appendQueryParam(url.searchParams, key, value)
    })
  }

  return url
}

function isJsonBody(body: StrapiFetchOptions["body"]): body is JsonValue {
  return (
    body !== undefined &&
    !(body instanceof Blob) &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof ArrayBuffer) &&
    !(body instanceof ReadableStream) &&
    typeof body !== "string"
  )
}

async function readResponseBody(response: Response) {
  const contentType = response.headers.get("content-type")

  if (contentType?.includes("application/json")) {
    return response.json()
  }

  return response.text()
}

export async function strapiFetch<TResponse>(
  path: string,
  options: StrapiFetchOptions = {},
) {
  const { authToken, body, headers, query, ...fetchOptions } = options
  const token = authToken ?? process.env.STRAPI_API_TOKEN
  const requestHeaders = new Headers(headers)

  requestHeaders.set("Accept", "application/json")

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`)
  }

  const requestBody = isJsonBody(body) ? JSON.stringify(body) : body

  if (isJsonBody(body) && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json")
  }

  let url: URL

  try {
    url = buildStrapiApiUrl(path, query)
  } catch (error) {
    throw new StrapiConnectionError(path, error)
  }

  let response: Response

  try {
    response = await fetch(url, {
      ...fetchOptions,
      body: requestBody,
      headers: requestHeaders,
    })
  } catch (error) {
    throw new StrapiConnectionError(url.toString(), error)
  }

  if (!response.ok) {
    throw new StrapiApiError(response, await readResponseBody(response))
  }

  if (response.status === 204) {
    return undefined as TResponse
  }

  return readResponseBody(response) as Promise<TResponse>
}
