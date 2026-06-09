export type JsonPrimitive = string | number | boolean | null
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue }

export type StrapiQueryValue =
  | JsonPrimitive
  | Date
  | undefined
  | StrapiQueryValue[]
  | { [key: string]: StrapiQueryValue }

export type StrapiQueryParams = Record<string, StrapiQueryValue>

export type StrapiPagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export type StrapiMeta = {
  pagination?: StrapiPagination
  [key: string]: unknown
}

export type StrapiResponse<T> = {
  data: T
  meta?: StrapiMeta
}

export type StrapiCollectionResponse<T> = StrapiResponse<T[]>

export type StrapiEntity<TAttributes extends object> = TAttributes & {
  id: number
  documentId?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
}
