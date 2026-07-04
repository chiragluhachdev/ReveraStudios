import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        <span style={{ fontSize: 118, color: "#FAFAF8", lineHeight: 1 }}>R</span>
        <span style={{ fontSize: 118, color: "#B4472E", lineHeight: 1 }}>.</span>
      </div>
    ),
    { ...size }
  );
}
