import { ImageResponse } from "next/og";

export const runtime = "edge";

/*
 * Exact replica of the MockifyLogo from navbar.tsx
 * Original viewBox: 0 0 32 32 → scaled 7.5x to 240x240
 */

const S = 7.5; // scale factor

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 240,
          height: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {/* Device frame — rect x=6 y=2 w=20 h=28 rx=6 */}
        <div
          style={{
            position: "absolute",
            left: 6 * S,
            top: 2 * S,
            width: 20 * S,
            height: 28 * S,
            borderRadius: 6 * S,
            background: "linear-gradient(180deg, #2c2c2e 0%, #1a1a1c 100%)",
            display: "flex",
          }}
        />

        {/* Frame highlight edge — rect x=6.5 y=2.5 w=19 h=27 rx=5.5 stroke=0.5 */}
        <div
          style={{
            position: "absolute",
            left: 6.5 * S,
            top: 2.5 * S,
            width: 19 * S,
            height: 27 * S,
            borderRadius: 5.5 * S,
            border: `${0.5 * S}px solid rgba(255,255,255,0.08)`,
            display: "flex",
          }}
        />

        {/* Screen — rect x=8 y=4.5 w=16 h=23 rx=4 */}
        <div
          style={{
            position: "absolute",
            left: 8 * S,
            top: 4.5 * S,
            width: 16 * S,
            height: 23 * S,
            borderRadius: 4 * S,
            background: "linear-gradient(180deg, #fafafa 0%, #e8e8ed 100%)",
            display: "flex",
          }}
        />

        {/* Dynamic island — rect x=13 y=6 w=6 h=2.5 rx=1.25 */}
        <div
          style={{
            position: "absolute",
            left: 13 * S,
            top: 6 * S,
            width: 6 * S,
            height: 2.5 * S,
            borderRadius: 1.25 * S,
            background: "#1d1d1f",
            display: "flex",
          }}
        />

        {/* Content line 1 — rect x=10.5 y=11.5 w=7 h=1.2 rx=0.6 */}
        <div
          style={{
            position: "absolute",
            left: 10.5 * S,
            top: 11.5 * S,
            width: 7 * S,
            height: 1.2 * S,
            borderRadius: 0.6 * S,
            background: "#c7c7cc",
            display: "flex",
          }}
        />

        {/* Content line 2 — rect x=10.5 y=14 w=4.5 h=1.2 rx=0.6 */}
        <div
          style={{
            position: "absolute",
            left: 10.5 * S,
            top: 14 * S,
            width: 4.5 * S,
            height: 1.2 * S,
            borderRadius: 0.6 * S,
            background: "#d1d1d6",
            display: "flex",
          }}
        />

        {/* Action button — circle cx=16 cy=19.5 r=1.8 stroke=0.8 */}
        <div
          style={{
            position: "absolute",
            left: (16 - 1.8) * S,
            top: (19.5 - 1.8) * S,
            width: 1.8 * 2 * S,
            height: 1.8 * 2 * S,
            borderRadius: 1.8 * S,
            border: `${0.8 * S}px solid #c7c7cc`,
            display: "flex",
          }}
        />
      </div>
    ),
    { width: 240, height: 240 }
  );
}
