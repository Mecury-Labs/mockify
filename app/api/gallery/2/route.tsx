import { ImageResponse } from "next/og";

export const runtime = "edge";

/*
 * Gallery Image 2 — Device & Color Showcase
 * Highlights the breadth: 20 devices, 76 colors, all real Apple frames
 */

const W = 1270;
const H = 760;

const COLORS = [
  { name: "Space Black", hex: "#3B3B3D" },
  { name: "Silver", hex: "#E3E4DF" },
  { name: "Natural Titanium", hex: "#C2B9AE" },
  { name: "Ultramarine", hex: "#7C8ACF" },
  { name: "Teal", hex: "#B0D4CE" },
  { name: "Cosmic Orange", hex: "#D4956A" },
  { name: "Deep Blue", hex: "#3D4F6A" },
  { name: "Sky Blue", hex: "#A8C8D8" },
  { name: "Desert Titanium", hex: "#C4A97D" },
  { name: "Lavender", hex: "#D0C4D8" },
  { name: "Deep Purple", hex: "#635166" },
  { name: "Pink", hex: "#F2C8D0" },
  { name: "Sage", hex: "#BEC8B0" },
  { name: "Gold", hex: "#F4E8CE" },
  { name: "Red", hex: "#FA2837" },
  { name: "Mist Blue", hex: "#B4C8D4" },
];

const DEVICES = [
  "iPhone 17 Pro Max",
  "iPhone 17 Pro",
  "iPhone 17",
  "iPhone Air",
  "iPhone 16 Pro Max",
  "iPhone 16 Pro",
  "iPhone 16 Plus",
  "iPhone 16",
  "iPhone 15 Pro Max",
  "iPhone 15 Pro",
  "iPhone 15 Plus",
  "iPhone 15",
  "iPhone 14 Pro Max",
  "iPhone 14 Pro",
  "iPhone 14 Plus",
  "iPhone 14",
  "iPhone 13 Pro Max",
  "iPhone 13 Pro",
  "iPhone 13 Mini",
  "iPhone 13",
];

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          background: "linear-gradient(135deg, #0a0a0f 0%, #12121a 40%, #0f0f18 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glows */}
        <div style={{ position: "absolute", top: -150, right: 100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -150, left: 100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,146,60,0.1) 0%, transparent 65%)", display: "flex" }} />

        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, display: "flex", backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        {/* Content wrapper */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            zIndex: 2,
            padding: "40px 80px",
          }}
        >
          {/* Top stats row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 60,
              marginBottom: 48,
            }}
          >
            {[
              { value: "20", label: "iPhone Models", accent: "#a5b4fc" },
              { value: "76", label: "Color Variants", accent: "#fdba74" },
              { value: "100%", label: "Apple Design Resources", accent: "#86efac" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 52, fontWeight: 800, color: stat.accent, letterSpacing: "-2px" }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: 16, color: "#86868b", fontWeight: 500, letterSpacing: "0.5px" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Color swatches grid */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            {/* Section label */}
            <div style={{ fontSize: 13, color: "#6e6e73", letterSpacing: "2px", fontWeight: 600, textTransform: "uppercase", display: "flex" }}>
              EVERY COLOR APPLE SHIPS
            </div>

            {/* Swatch row */}
            <div style={{ display: "flex", gap: 12 }}>
              {COLORS.map((c) => (
                <div
                  key={c.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: c.hex,
                      border: "2px solid rgba(255,255,255,0.12)",
                      boxShadow: `0 4px 16px ${c.hex}33`,
                      display: "flex",
                    }}
                  />
                  <span style={{ fontSize: 9, color: "#6e6e73", fontWeight: 500, display: "flex" }}>
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Device list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              marginTop: 36,
            }}
          >
            <div style={{ fontSize: 13, color: "#6e6e73", letterSpacing: "2px", fontWeight: 600, display: "flex" }}>
              EVERY MODEL SINCE iPHONE 13
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                justifyContent: "center",
                maxWidth: 1000,
              }}
            >
              {DEVICES.map((d) => (
                <div
                  key={d}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 100,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontSize: 13,
                    color: "#a1a1a6",
                    fontWeight: 500,
                    display: "flex",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H }
  );
}
