import Image from "next/image";

/**
 * Ultra-realistic iPhone 16 Mockup Component
 *
 * Uses the same technique as mockup.60fps.design:
 *   Layer 1 (back):  Screen content div with rounded corners
 *   Layer 2:         Status bar PNG overlay on screen
 *   Layer 3 (front): Real device frame PNG overlay (z-index on top)
 *
 * The device frame PNG is a transparent image with the titanium frame,
 * bezel, side buttons, and camera cutout pre-rendered. The screen area
 * is transparent so user content shows through.
 *
 * All proportions reverse-engineered from the 60fps.design implementation:
 *   Frame PNG: 1167 x 2357 (native)
 *   Screen inset: left 5.263%, top 1.891%, width 89.474%, height 95.981%
 *   Screen corner radius: 12.456% of frame width
 */

// Proportions derived from the device frame PNG and 60fps.design source
const DEVICE = {
  // Native PNG dimensions
  framePngWidth: 1167,
  framePngHeight: 2357,

  // Screen position as fraction of frame PNG dimensions
  // These define where the transparent screen hole is in the PNG
  screenLeftFraction: 0.052632,
  screenTopFraction: 0.018913,
  screenWidthFraction: 0.894737,
  screenHeightFraction: 0.959811,

  // Screen corner radius as fraction of frame width
  screenRadiusFraction: 0.124557,

  // Status bar height as fraction of screen height
  statusBarHeightFraction: 0.064039,
};

interface IPhoneMockupProps {
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
}

export default function IPhoneMockup({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhoneMockupProps) {
  // Frame dimensions at render size
  const frameW = width;
  const frameH = width * (DEVICE.framePngHeight / DEVICE.framePngWidth);

  // Screen dimensions and position (positioned behind the frame PNG)
  const screenLeft = frameW * DEVICE.screenLeftFraction;
  const screenTop = frameH * DEVICE.screenTopFraction;
  const screenW = frameW * DEVICE.screenWidthFraction;
  const screenH = frameH * DEVICE.screenHeightFraction;
  const screenRadius = frameW * DEVICE.screenRadiusFraction;

  // Status bar height
  const statusBarH = screenH * DEVICE.statusBarHeightFraction;

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
          boxShadow: "black 0px 0px 0px 1px",
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
              src="/status-bar/iPhone 16 Status Bar Black.png"
              width={DEVICE.framePngWidth}
              height={Math.round(
                DEVICE.framePngHeight *
                  DEVICE.screenHeightFraction *
                  DEVICE.statusBarHeightFraction
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
        alt="iPhone 16 Plus"
        className="absolute pointer-events-none select-none"
        src="/devices/iPhone 16 Plus.png"
        width={DEVICE.framePngWidth}
        height={DEVICE.framePngHeight}
        unoptimized
        style={{
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
