import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Rêvera Studio — Creative Technology & Digital Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "72px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(250,250,248,0.6)",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          <span>Rêvera Studio</span>
          <span>Est. 2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <span style={{ fontSize: 150, color: "#FAFAF8", lineHeight: 1 }}>
              Rêvera
            </span>
            <span style={{ fontSize: 150, color: "#B4472E", lineHeight: 1 }}>
              .
            </span>
          </div>
          <span
            style={{
              marginTop: 28,
              fontSize: 40,
              color: "rgba(250,250,248,0.85)",
            }}
          >
            Creative Technology &amp; Digital Agency
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "rgba(250,250,248,0.55)",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          <span>Websites · Apps · Branding · Content · AI</span>
          <span>www.reverastudios.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
