import { ImageResponse } from "next/og";

export const runtime = "edge";

/*
 * Gallery Image 1 — Hero / Social Preview
 * "Pixel-perfect iPhone mockups. Zero design skills needed."
 * Shows 3 staggered device frames with vibrant screens + tagline
 */

const W = 1270;
const H = 760;

function DeviceFrame({
  x,
  y,
  rotate,
  screenGradient,
  scale = 1,
}: {
  x: number;
  y: number;
  rotate: number;
  screenGradient: string;
  scale?: number;
}) {
  const w = 96 * scale;
  const h = 192 * scale;
  const r = 22 * scale;
  const screenW = 78 * scale;
  const screenH = 166 * scale;
  const screenR = 14 * scale;
  const mt = 13 * scale;
  const islandW = 26 * scale;
  const islandH = 9 * scale;
  const islandR = 4.5 * scale;
  const islandMt = 7 * scale;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: r,
        background: "linear-gradient(180deg, #4a4a4e 0%, #2c2c2e 30%, #1d1d1f 100%)",
        boxShadow: `0 0 0 1px rgba(255,255,255,0.12), 0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(99,102,241,0.05)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        style={{
          width: screenW,
          height: screenH,
          borderRadius: screenR,
          background: screenGradient,
          marginTop: mt,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Glass overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: screenR,
            background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 40%)",
            display: "flex",
          }}
        />
        {/* Dynamic island */}
        <div
          style={{
            width: islandW,
            height: islandH,
            borderRadius: islandR,
            background: "#0a0a0a",
            marginTop: islandMt,
            display: "flex",
            boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
          }}
        />
        {/* App content blocks */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6 * scale,
            marginTop: 14 * scale,
          }}
        >
          <div
            style={{
              width: 52 * scale,
              height: 30 * scale,
              borderRadius: 7 * scale,
              background: "rgba(255,255,255,0.88)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: `${5 * scale}px ${7 * scale}px`,
              gap: 3 * scale,
            }}
          >
            <div style={{ width: 26 * scale, height: 3 * scale, borderRadius: 2, background: "#1d1d1f", display: "flex" }} />
            <div style={{ width: 18 * scale, height: 3 * scale, borderRadius: 2, background: "#a1a1a6", display: "flex" }} />
            <div style={{ width: 22 * scale, height: 3 * scale, borderRadius: 2, background: "#c7c7cc", display: "flex" }} />
          </div>
          <div
            style={{
              width: 52 * scale,
              height: 16 * scale,
              borderRadius: 5 * scale,
              background: "rgba(255,255,255,0.65)",
              display: "flex",
              alignItems: "center",
              padding: `0 ${6 * scale}px`,
              gap: 4 * scale,
            }}
          >
            <div style={{ width: 5 * scale, height: 5 * scale, borderRadius: 3 * scale, background: "#6366f1", display: "flex" }} />
            <div style={{ width: 20 * scale, height: 2.5 * scale, borderRadius: 2, background: "#4a4a4e", display: "flex" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

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
        {/* Large ambient glows */}
        <div style={{ position: "absolute", top: -200, left: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 65%)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -200, right: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,146,60,0.12) 0%, transparent 65%)", display: "flex" }} />
        <div style={{ position: "absolute", top: 200, right: 300, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,147,251,0.08) 0%, transparent 65%)", display: "flex" }} />

        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Left side — Text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 80,
            width: 600,
            zIndex: 2,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                padding: "6px 14px",
                borderRadius: 100,
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                fontSize: 14,
                fontWeight: 600,
                color: "#a5b4fc",
                letterSpacing: "0.5px",
                display: "flex",
              }}
            >
              OPEN SOURCE
            </div>
            <div
              style={{
                padding: "6px 14px",
                borderRadius: 100,
                background: "rgba(251,146,60,0.12)",
                border: "1px solid rgba(251,146,60,0.25)",
                fontSize: 14,
                fontWeight: 600,
                color: "#fdba74",
                letterSpacing: "0.5px",
                display: "flex",
              }}
            >
              REACT
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#f5f5f7",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Pixel-Perfect</span>
            <span>iPhone Mockups</span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 20,
              color: "#86868b",
              marginTop: 20,
              lineHeight: 1.5,
              letterSpacing: "-0.3px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Official Apple Design Resources.</span>
            <span>20 devices. 76 colors. One component.</span>
          </div>

          {/* Install command */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 32,
              padding: "14px 24px",
              borderRadius: 14,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              width: 380,
            }}
          >
            <span style={{ color: "#6366f1", fontSize: 16, fontWeight: 600 }}>$</span>
            <span style={{ fontSize: 16, color: "#e5e5ea", fontFamily: "monospace" }}>
              npm install @mockifydev/react
            </span>
          </div>
        </div>

        {/* Right side — 3 staggered devices */}
        <DeviceFrame x={620} y={100} rotate={-8} scale={1.6} screenGradient="linear-gradient(160deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" />
        <DeviceFrame x={780} y={60} rotate={0} scale={1.7} screenGradient="linear-gradient(160deg, #f5576c 0%, #ff6b6b 40%, #feca57 100%)" />
        <DeviceFrame x={950} y={110} rotate={8} scale={1.55} screenGradient="linear-gradient(160deg, #0abcf9 0%, #2c69d1 50%, #6366f1 100%)" />
      </div>
    ),
    { width: W, height: H }
  );
}
