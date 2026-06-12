import { ImageResponse } from "next/og"

import { authorName, defaultDescription } from "@/lib/seo"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8f6f1",
          color: "#141414",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 30,
            letterSpacing: 0,
          }}
        >
          <span>{authorName}</span>
          <span>Portfolio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <h1
            style={{
              margin: 0,
              maxWidth: 880,
              fontSize: 92,
              lineHeight: 0.95,
              letterSpacing: 0,
            }}
          >
            Marketing digital, design et sites web
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: 830,
              color: "#4a4740",
              fontSize: 34,
              lineHeight: 1.28,
            }}
          >
            {defaultDescription}
          </p>
        </div>
      </div>
    ),
    size,
  )
}
