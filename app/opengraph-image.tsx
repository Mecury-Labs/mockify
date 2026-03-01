import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mockify — iPhone Device Mockups for React";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(145deg, #0a0a0a 0%, #141416 50%, #0a0a0a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top-left glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(120,130,255,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Bottom-right glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,160,125,0.06) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            zIndex: 1,
          }}
        >
          {/* Logo icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "linear-gradient(145deg, #2c2c2e, #1a1a1c)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            {/* Phone frame inside icon */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "36px",
                height: "52px",
                borderRadius: "10px",
                background: "linear-gradient(180deg, #fafafa 0%, #e8e8ed 100%)",
                position: "relative",
              }}
            >
              {/* Dynamic island */}
              <div
                style={{
                  width: "14px",
                  height: "5px",
                  borderRadius: "3px",
                  background: "#1d1d1f",
                  marginTop: "5px",
                  display: "flex",
                }}
              />
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: "#f5f5f7",
                letterSpacing: "-2px",
                lineHeight: 1,
                display: "flex",
              }}
            >
              Mockify
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 400,
                color: "#86868b",
                letterSpacing: "-0.3px",
                display: "flex",
              }}
            >
              iPhone Device Mockups for React
            </div>
          </div>

          {/* Feature pills */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            {["20 Devices", "76 Colors", "Apple Design Resources", "Open Source"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    padding: "8px 18px",
                    borderRadius: "100px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontSize: 15,
                    color: "#a1a1a6",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {label}
                </div>
              )
            )}
          </div>

          {/* Install command */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "8px",
              padding: "12px 24px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span style={{ color: "#86868b", fontSize: 16 }}>$</span>
            <span
              style={{
                fontSize: 16,
                color: "#f5f5f7",
                fontFamily: "monospace",
                letterSpacing: "-0.3px",
              }}
            >
              npm install @mockifydev/react
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
