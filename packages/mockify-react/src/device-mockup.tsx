import type { DeviceMockupProps } from "./types";

/**
 * Renders an ultra-realistic iPhone device mockup.
 *
 * Uses a 3-layer compositing approach:
 * 1. Screen content area (z-index 10)
 * 2. Status bar PNG overlay
 * 3. Device frame PNG on top (z-index 20, pointer-events: none)
 *
 * All positioning is fraction-based so mockups scale to any size.
 *
 * @example
 * ```tsx
 * import { DeviceMockup, iPhone16Pro } from "@mockify/react";
 *
 * <DeviceMockup device={iPhone16Pro} width={320}>
 *   <img src="/screenshot.png" alt="App" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
 * </DeviceMockup>
 * ```
 */
export function DeviceMockup({
  device,
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  style,
  color,
  basePath = "https://unpkg.com/@mockify/react@latest/assets",
}: DeviceMockupProps) {
  // Resolve frame source: color prop → defaultColor → frameSrc fallback
  const resolvedColor = color ?? device.defaultColor;
  const colorVariant = resolvedColor
    ? device.colors.find((c) => c.name === resolvedColor)
    : undefined;
  const frameSrc = colorVariant?.frameSrc ?? device.frameSrc;

  // Compute dimensions
  const frameW = width;
  const frameH = width * (device.framePngHeight / device.framePngWidth);
  const screenLeft = frameW * device.screenLeftFraction;
  const screenTop = frameH * device.screenTopFraction;
  const screenW = frameW * device.screenWidthFraction;
  const screenH = frameH * device.screenHeightFraction;
  const screenRadius = frameW * device.screenRadiusFraction;
  const statusBarH = screenH * device.statusBarHeightFraction;

  // Resolve paths
  const resolvedFrameSrc = `${basePath}${frameSrc}`;
  const resolvedStatusBarSrc = `${basePath}${device.statusBarSrc}`;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: frameW,
        height: frameH,
        ...style,
      }}
    >
      {/* Layer 1: Screen content area */}
      <div
        style={{
          position: "absolute",
          left: screenLeft,
          top: screenTop,
          width: screenW,
          height: screenH,
          borderRadius: screenRadius,
          overflow: "hidden",
          boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.1)",
          backgroundColor: screenColor,
          backfaceVisibility: "hidden",
          pointerEvents: "auto",
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {children}

          {/* Status bar overlay */}
          {showStatusBar && (
            <img
              alt=""
              src={resolvedStatusBarSrc}
              style={{
                position: "absolute",
                pointerEvents: "none",
                width: "calc(100% + 4px)",
                height: statusBarH,
                top: 0,
                left: -2,
                objectFit: "cover",
                objectPosition: "center 48%",
                borderTopLeftRadius: screenRadius,
                borderTopRightRadius: screenRadius,
                transform: "translateZ(0)",
              }}
            />
          )}
        </div>
      </div>

      {/* Layer 3: Device frame PNG */}
      <img
        alt={device.name}
        src={resolvedFrameSrc}
        style={{
          position: "absolute",
          pointerEvents: "none",
          userSelect: "none",
          left: 0,
          top: 0,
          width: frameW,
          height: frameH,
          zIndex: 20,
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
