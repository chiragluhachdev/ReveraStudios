"use client";

// Catches errors thrown in the root layout itself. Must render its
// own <html>/<body>. Kept intentionally minimal and self-contained.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAFAF8",
          color: "#0A0A0A",
          fontFamily: "Georgia, 'Times New Roman', serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}>Something broke.</h1>
        <p style={{ color: "#6B6862", fontFamily: "Helvetica, Arial, sans-serif" }}>
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: 16,
            padding: "14px 28px",
            borderRadius: 999,
            border: "none",
            background: "#0A0A0A",
            color: "#FAFAF8",
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
