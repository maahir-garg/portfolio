import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Maahir Garg — AI Engineer at GIC. CS + Quantitative Finance at NUS.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f5f1e8",
          color: "#1a1a1a",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6b6b6b",
          }}
        >
          <span>Field Notebook</span>
          <span>Singapore · 01°17′N 103°51′E</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 128,
              lineHeight: 1.0,
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Maahir Garg
          </div>
          <div
            style={{
              fontSize: 42,
              lineHeight: 1.25,
              color: "#3a3a3a",
              fontStyle: "italic",
              maxWidth: 960,
            }}
          >
            AI Engineer at GIC. Computer Science &amp; Quantitative Finance at NUS.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6b6b6b",
            borderTop: "1px solid #c9c3b6",
            paddingTop: 28,
          }}
        >
          <span>maahir-garg.vercel.app</span>
          <span>Agentic LLMs · Spatial Computing · Data</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
