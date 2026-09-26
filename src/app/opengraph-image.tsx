import { ImageResponse } from "next/og";

// TODO: replace with a real generated OG image (see BUILD_PLAN.md asset prompts)
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #dff2e6 0%, #f7fbf6 60%, #ffffff 100%)",
          color: "#233b2e",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, display: "flex" }}>
          Dompet Garuda
        </div>
        <div style={{ fontSize: 28, color: "#5c7a6c", marginTop: 20, display: "flex" }}>
          Transfer tanpa internet, aman tanpa ribet.
        </div>
      </div>
    ),
    { ...size }
  );
}
