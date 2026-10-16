import { ImageResponse } from "next/og";

export const alt = "Harsh Meena — Data Analyst turning complex data into clear decisions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 74px",
          background: "#0b0b0b",
          color: "#fff",
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#d4af37", fontSize: 22, letterSpacing: 4 }}>
          <span style={{ width: 34, height: 2, background: "#d4af37" }} />
          DATA ANALYST / INDORE, INDIA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontFamily: "Georgia", fontSize: 86, letterSpacing: -5, lineHeight: 1.05 }}>Complex data.</div>
          <div style={{ color: "#d4af37", fontFamily: "Georgia", fontSize: 86, fontStyle: "italic", letterSpacing: -5, lineHeight: 1.05 }}>Clear decisions.</div>
          <div style={{ marginTop: 14, color: "#c5c5c5", fontSize: 25 }}>Harsh Meena · SQL · Python · Power BI · Excel</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #444", paddingTop: 20, color: "#a8a8a8", fontSize: 18, letterSpacing: 2 }}>
          <span>BUSINESS QUESTIONS, ANSWERED WITH EVIDENCE</span>
          <span>HARSHMEENA9977-OPS.GITHUB.IO</span>
        </div>
      </div>
    ),
    size,
  );
}
