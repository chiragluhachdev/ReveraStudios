import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Branded favicon: "R" wordmark with the accent dot on ink.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <span style={{ fontSize: 340, color: "#FAFAF8", lineHeight: 1 }}>R</span>
        <span style={{ fontSize: 340, color: "#B4472E", lineHeight: 1 }}>.</span>
      </div>
    ),
    { ...size }
  );
}
