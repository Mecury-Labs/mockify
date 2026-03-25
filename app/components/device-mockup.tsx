import Image from "next/image";

/**
 * Shared device mockup renderer.
 *
 * Uses the same layering technique as mockup.60fps.design:
 *   Layer 1 (back):  Screen content div positioned behind the frame
 *   Layer 2:         Status bar PNG overlay on the screen
 *   Layer 3 (front): Real device frame PNG on top (pointer-events: none)
 *
 * Each device provides a `DeviceConfig` with its frame PNG path,
 * native dimensions, screen inset proportions, and status bar asset.
 */

/** A single color variant for a device */
export interface DeviceColorVariant {
  /** Human-readable color name, e.g. "Midnight" */
  name: string;
  /** Path to the frame PNG for this color */
  frameSrc: string;
  /** CSS color swatch for the picker UI (hex) */
  swatch: string;
}

export interface DeviceConfig {
  /** Display name for alt text */
  name: string;
  /** Path to the device frame PNG in /public (used when no color is selected) */
  frameSrc: string;
  /** Native width of the frame PNG */
  framePngWidth: number;
  /** Native height of the frame PNG */
  framePngHeight: number;
  /** Screen left offset as fraction of frame width */
  screenLeftFraction: number;
  /** Screen top offset as fraction of frame height */
  screenTopFraction: number;
  /** Screen width as fraction of frame width */
  screenWidthFraction: number;
  /** Screen height as fraction of frame height */
  screenHeightFraction: number;
  /** Screen corner radius as fraction of frame width */
  screenRadiusFraction: number;
  /** Path to the status bar PNG in /public */
  statusBarSrc: string;
  /** Status bar height as fraction of screen height */
  statusBarHeightFraction: number;
  /** Available color variants. Empty array means single-color device */
  colors: DeviceColorVariant[];
  /** Default color name (must match one of colors[].name) */
  defaultColor?: string;
}

/* ── Dynamic Island / Notch masking ── */

type NotchType = "dynamic-island" | "notch";

function getNotchType(config: DeviceConfig): NotchType {
  if (config.statusBarSrc.includes("Notch")) return "notch";
  return "dynamic-island";
}

/** Build a rounded-rect sub-path (clockwise) for use inside an evenodd path */
function roundedRectPath(
  x: number, y: number, w: number, h: number, r: number
): string {
  r = Math.min(r, w / 2, h / 2);
  return [
    `M${x + r},${y}`,
    `H${x + w - r}`,
    `Q${x + w},${y} ${x + w},${y + r}`,
    `V${y + h - r}`,
    `Q${x + w},${y + h} ${x + w - r},${y + h}`,
    `H${x + r}`,
    `Q${x},${y + h} ${x},${y + h - r}`,
    `V${y + r}`,
    `Q${x},${y} ${x + r},${y}`,
    "Z",
  ].join(" ");
}

/**
 * Build a CSS mask that hides the Dynamic Island or Notch from the frame PNG.
 *
 * Uses a single SVG with fill-rule="evenodd": an outer rect (whole frame)
 * with an inner cutout (DI/notch). Where they overlap the fill cancels out,
 * creating a transparent hole that hides that part of the frame.
 */
function buildNotchMaskStyle(
  config: DeviceConfig,
  notchType: NotchType
): React.CSSProperties {
  const { framePngWidth: W, framePngHeight: H } = config;
  const screenW = config.screenWidthFraction * W;
  const screenH = config.screenHeightFraction * H;
  const screenTop = config.screenTopFraction * H;

  let cutX: number, cutY: number, cutW: number, cutH: number, r: number;

  if (notchType === "dynamic-island") {
    cutW = screenW * 0.35;
    cutH = screenH * 0.036;
    cutX = W / 2 - cutW / 2;
    cutY = screenTop + screenH * 0.005;
    r = cutH / 2;
  } else {
    cutW = screenW * 0.55;
    cutH = screenTop + screenH * 0.04;
    cutX = W / 2 - cutW / 2;
    cutY = 0;
    r = W * 0.018;
  }

  // Outer rect (full frame) + inner cutout (DI/notch) with evenodd → hole
  const pathData =
    `M0,0 H${W} V${H} H0 Z ` + roundedRectPath(cutX, cutY, cutW, cutH, r);

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${W} ${H}'><path fill='white' fill-rule='evenodd' d='${pathData}'/></svg>`;
  const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

  return {
    WebkitMaskImage: maskUrl,
    WebkitMaskSize: "100% 100%",
    maskImage: maskUrl,
    maskSize: "100% 100%",
  } as React.CSSProperties;
}

export interface DeviceMockupProps {
  /** Device configuration */
  device: DeviceConfig;
  /** Content to render inside the phone screen */
  children?: React.ReactNode;
  /** Width of the rendered device in pixels. Default: 320 */
  width?: number;
  /** Screen background color. Default: "#f2f2f2" */
  screenColor?: string;
  /** Whether to show the status bar overlay. Default: true */
  showStatusBar?: boolean;
  /** Additional className for the outer wrapper */
  className?: string;
  /** Color variant name. Uses defaultColor or frameSrc fallback if not set */
  color?: string;
  /** Whether to hide the Dynamic Island / Notch cutout. Default: false */
  hideDynamicIsland?: boolean;
}

export default function DeviceMockup({
  device,
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
  hideDynamicIsland = false,
}: DeviceMockupProps) {
  // Resolve the frame source: color prop → defaultColor → frameSrc fallback
  const resolvedColor = color ?? device.defaultColor;
  const colorVariant = resolvedColor
    ? device.colors.find((c) => c.name === resolvedColor)
    : undefined;
  const frameSrc = colorVariant?.frameSrc ?? device.frameSrc;

  const frameW = width;
  const frameH = width * (device.framePngHeight / device.framePngWidth);

  const screenLeft = frameW * device.screenLeftFraction;
  const screenTop = frameH * device.screenTopFraction;
  const screenW = frameW * device.screenWidthFraction;
  const screenH = frameH * device.screenHeightFraction;
  const screenRadius = frameW * device.screenRadiusFraction;

  const statusBarH = screenH * device.statusBarHeightFraction;

  // Build mask styles when hiding the DI/notch
  const notchType = getNotchType(device);
  const frameMaskStyle =
    hideDynamicIsland && notchType ? buildNotchMaskStyle(device, notchType) : {};

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: frameW,
        height: frameH,
      }}
    >
      {/* Layer 1: Screen content area (behind the frame) */}
      <div
        className="absolute"
        style={{
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
        <div className="absolute inset-0 w-full h-full">
          {/* User content */}
          {children}

          {/* Layer 2: Status bar overlay */}
          {showStatusBar && (
            <Image
              alt="Status bar"
              className="absolute pointer-events-none"
              src={device.statusBarSrc}
              width={device.framePngWidth}
              height={Math.round(
                device.framePngHeight *
                  device.screenHeightFraction *
                  device.statusBarHeightFraction
              )}
              unoptimized
              style={{
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

      {/* Layer 3: Device frame PNG (on top of everything) */}
      <Image
        alt={device.name}
        className="absolute pointer-events-none select-none"
        src={frameSrc}
        width={device.framePngWidth}
        height={device.framePngHeight}
        unoptimized
        style={{
          left: 0,
          top: 0,
          width: frameW,
          height: frameH,
          zIndex: 20,
          transform: "translateZ(0)",
          ...frameMaskStyle,
        }}
      />
    </div>
  );
}
