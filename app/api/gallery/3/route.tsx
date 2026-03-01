import { ImageResponse } from "next/og";

export const runtime = "edge";

/*
 * Gallery Image 3 — Developer Experience
 * Shows code snippet + rendered mockup side by side
 */

const W = 1270;
const H = 760;

const CODE_LINES = [
  { text: 'import', color: '#c678dd' },
  { text: ' { DeviceMockup, iPhone17Pro }', color: '#e5c07b' },
  { text: ' from', color: '#c678dd' },
  { text: " '@mockifydev/react'", color: '#98c379' },
  { text: '', color: '' }, // blank line
  { text: 'export default', color: '#c678dd' },
  { text: ' function ', color: '#61afef' },
  { text: 'App() {', color: '#e5c07b' },
  { text: '  return (', color: '#abb2bf' },
  { text: '    <', color: '#abb2bf' },
  { text: 'DeviceMockup', color: '#e06c75' },
  { text: '', color: '' },
  { text: '      device', color: '#d19a66' },
  { text: '={iPhone17Pro}', color: '#abb2bf' },
  { text: '      color', color: '#d19a66' },
  { text: '="Cosmic Orange"', color: '#98c379' },
  { text: '      width', color: '#d19a66' },
  { text: '={380}', color: '#d19a66' },
  { text: '    >', color: '#abb2bf' },
  { text: '      <', color: '#abb2bf' },
  { text: 'img', color: '#e06c75' },
  { text: ' src', color: '#d19a66' },
  { text: '="/screenshot.png"', color: '#98c379' },
  { text: ' />', color: '#abb2bf' },
  { text: '    </', color: '#abb2bf' },
  { text: 'DeviceMockup', color: '#e06c75' },
  { text: '>', color: '#abb2bf' },
  { text: '  )', color: '#abb2bf' },
  { text: '}', color: '#abb2bf' },
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
        <div style={{ position: "absolute", top: -100, left: 200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -100, right: 200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,149,106,0.1) 0%, transparent 65%)", display: "flex" }} />

        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, display: "flex", backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        {/* Main layout — two columns */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            gap: 60,
            padding: "40px 80px",
            zIndex: 2,
          }}
        >
          {/* Left — Code editor */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 560,
              borderRadius: 20,
              background: "#1e1e2e",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
              overflow: "hidden",
            }}
          >
            {/* Editor top bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 18px",
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                gap: 8,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 6, background: "#ff5f57", display: "flex" }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, background: "#febc2e", display: "flex" }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, background: "#28c840", display: "flex" }} />
              <span style={{ marginLeft: 12, fontSize: 13, color: "#6e6e73", fontFamily: "monospace" }}>App.tsx</span>
            </div>

            {/* Code content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px 24px",
                gap: 2,
                fontFamily: "monospace",
                fontSize: 14,
                lineHeight: 1.7,
              }}
            >
              {/* Line 1: import */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#4a4a5a", width: 30 }}>1</span>
                <span style={{ color: "#c678dd" }}>import</span>
                <span style={{ color: "#e5c07b" }}>{" { DeviceMockup, iPhone17Pro }"}</span>
                <span style={{ color: "#c678dd" }}>{" from"}</span>
                <span style={{ color: "#98c379" }}>{" '@mockifydev/react'"}</span>
              </div>
              {/* Line 2: blank */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#4a4a5a", width: 30 }}>2</span>
              </div>
              {/* Line 3: export */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#4a4a5a", width: 30 }}>3</span>
                <span style={{ color: "#c678dd" }}>export default </span>
                <span style={{ color: "#61afef" }}>function </span>
                <span style={{ color: "#e5c07b" }}>{"App()"}</span>
                <span style={{ color: "#abb2bf" }}>{" {"}</span>
              </div>
              {/* Line 4 */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#4a4a5a", width: 30 }}>4</span>
                <span style={{ color: "#abb2bf" }}>{"  return ("}</span>
              </div>
              {/* Line 5 */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#4a4a5a", width: 30 }}>5</span>
                <span style={{ color: "#abb2bf" }}>{"    <"}</span>
                <span style={{ color: "#e06c75" }}>DeviceMockup</span>
              </div>
              {/* Line 6 */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#4a4a5a", width: 30 }}>6</span>
                <span style={{ color: "#d19a66" }}>{"      device"}</span>
                <span style={{ color: "#abb2bf" }}>{"={iPhone17Pro}"}</span>
              </div>
              {/* Line 7 */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#4a4a5a", width: 30 }}>7</span>
                <span style={{ color: "#d19a66" }}>{"      color"}</span>
                <span style={{ color: "#abb2bf" }}>{"="}</span>
                <span style={{ color: "#98c379" }}>{'"Cosmic Orange"'}</span>
              </div>
              {/* Line 8 */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#4a4a5a", width: 30 }}>8</span>
                <span style={{ color: "#d19a66" }}>{"      width"}</span>
                <span style={{ color: "#d19a66" }}>{"={380}"}</span>
              </div>
              {/* Line 9 */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#4a4a5a", width: 30 }}>9</span>
                <span style={{ color: "#abb2bf" }}>{"    >"}</span>
              </div>
              {/* Line 10 */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#4a4a5a", width: 30 }}>10</span>
                <span style={{ color: "#abb2bf" }}>{"      <"}</span>
                <span style={{ color: "#e06c75" }}>img</span>
                <span style={{ color: "#d19a66" }}>{" src"}</span>
                <span style={{ color: "#abb2bf" }}>{"="}</span>
                <span style={{ color: "#98c379" }}>{'"screenshot.png"'}</span>
                <span style={{ color: "#abb2bf" }}>{" />"}</span>
              </div>
              {/* Line 11 */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#4a4a5a", width: 30 }}>11</span>
                <span style={{ color: "#abb2bf" }}>{"    </"}</span>
                <span style={{ color: "#e06c75" }}>DeviceMockup</span>
                <span style={{ color: "#abb2bf" }}>{">"}</span>
              </div>
              {/* Line 12 */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#4a4a5a", width: 30 }}>12</span>
                <span style={{ color: "#abb2bf" }}>{"  )"}</span>
              </div>
              {/* Line 13 */}
              <div style={{ display: "flex" }}>
                <span style={{ color: "#4a4a5a", width: 30 }}>13</span>
                <span style={{ color: "#abb2bf" }}>{"}"}</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: 36,
                color: "#6366f1",
                display: "flex",
              }}
            >
              {"->"}
            </div>
            <div style={{ fontSize: 12, color: "#6e6e73", fontWeight: 600, letterSpacing: "1px", display: "flex" }}>
              RENDERS
            </div>
          </div>

          {/* Right — Rendered device mockup */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            {/* Device frame */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 130,
                height: 260,
                borderRadius: 30,
                background: "linear-gradient(180deg, #D4956A 0%, #c4854a 100%)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.15), 0 20px 60px rgba(212,149,106,0.3), 0 0 80px rgba(212,149,106,0.1)",
                position: "relative",
              }}
            >
              {/* Frame inner border */}
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  left: 2,
                  right: 2,
                  bottom: 2,
                  borderRadius: 28,
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                }}
              />

              {/* Screen */}
              <div
                style={{
                  width: 110,
                  height: 234,
                  borderRadius: 22,
                  marginTop: 13,
                  background: "linear-gradient(160deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* Glass */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 22,
                    background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 40%)",
                    display: "flex",
                  }}
                />
                {/* Dynamic island */}
                <div
                  style={{
                    width: 38,
                    height: 13,
                    borderRadius: 7,
                    background: "#0a0a0a",
                    marginTop: 10,
                    display: "flex",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                />
                {/* App content */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 20,
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 44,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.88)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "8px 10px",
                      gap: 5,
                    }}
                  >
                    <div style={{ width: 36, height: 4, borderRadius: 2, background: "#1d1d1f", display: "flex" }} />
                    <div style={{ width: 26, height: 4, borderRadius: 2, background: "#a1a1a6", display: "flex" }} />
                    <div style={{ width: 30, height: 4, borderRadius: 2, background: "#c7c7cc", display: "flex" }} />
                  </div>
                  <div
                    style={{
                      width: 72,
                      height: 24,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.65)",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 8px",
                      gap: 6,
                    }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#6366f1", display: "flex" }} />
                    <div style={{ width: 30, height: 3, borderRadius: 2, background: "#4a4a4e", display: "flex" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Label */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#f5f5f7" }}>iPhone 17 Pro</span>
              <span style={{ fontSize: 13, color: "#D4956A", fontWeight: 500 }}>Cosmic Orange</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H }
  );
}
