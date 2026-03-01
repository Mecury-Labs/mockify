import Image from "next/image";

/**
 * Photorealistic iPhone 16 Mockup Component (Pure CSS)
 *
 * Layers (back to front):
 *   1. Outer shadow container
 *   2. Titanium frame with gradient + chamfer highlight
 *   3. Screen bezel inset with inner shadow
 *   4. Screen content area
 *   5. Status bar PNG overlay
 *   6. Dynamic Island cutout
 *   7. Glass reflection overlay
 *   8. Home indicator
 *   9. Side buttons with gradients
 *
 * Based on iPhone 16 physical proportions:
 *   - Logical screen: 393 x 852 pt
 *   - Device body: ~71.6 x 147.6 mm
 *   - Corner radius: ~55pt at screen resolution
 */

const IPHONE_16 = {
  screenWidth: 393,
  screenHeight: 852,
  cornerRadius: 55,
  statusBarHeight: 54,
  dynamicIslandWidth: 126,
  dynamicIslandHeight: 37.5,
  dynamicIslandTop: 11,
  bezelThickness: 12,
  // Side button positions (fraction of device height)
  silentSwitchTop: 0.138,
  silentSwitchHeight: 0.032,
  volumeUpTop: 0.185,
  volumeUpHeight: 0.06,
  volumeDownTop: 0.26,
  volumeDownHeight: 0.06,
  powerButtonTop: 0.245,
  powerButtonHeight: 0.078,
};

interface IPhoneMockupProps {
  /** Content to render inside the phone screen */
  children?: React.ReactNode;
  /** Scale factor. 1 = 280px wide. Default: 1 */
  scale?: number;
  /** Screen background color. Default: "#f2f2f2" */
  screenColor?: string;
  /** Whether to show the status bar overlay. Default: true */
  showStatusBar?: boolean;
  /** Frame color variant */
  frameColor?: "black" | "white" | "natural" | "teal" | "pink";
  /** Additional className for the outer wrapper */
  className?: string;
}

// Titanium frame gradients per color variant
const FRAME_STYLES: Record<
  string,
  { gradient: string; chamfer: string; buttonGradient: string }
> = {
  black: {
    gradient:
      "linear-gradient(135deg, #2c2c2e 0%, #1c1c1e 15%, #3a3a3c 40%, #2c2c2e 60%, #1c1c1e 85%, #2c2c2e 100%)",
    chamfer:
      "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.15) 100%)",
    buttonGradient: "linear-gradient(to bottom, #3a3a3c 0%, #1c1c1e 100%)",
  },
  white: {
    gradient:
      "linear-gradient(135deg, #e8e8ed 0%, #d1d1d6 15%, #f2f2f7 40%, #e5e5ea 60%, #d1d1d6 85%, #e8e8ed 100%)",
    chamfer:
      "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.6) 100%)",
    buttonGradient: "linear-gradient(to bottom, #e5e5ea 0%, #c7c7cc 100%)",
  },
  natural: {
    gradient:
      "linear-gradient(135deg, #8a8680 0%, #6e6a64 15%, #9e9a94 40%, #8a8680 60%, #6e6a64 85%, #8a8680 100%)",
    chamfer:
      "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.2) 100%)",
    buttonGradient: "linear-gradient(to bottom, #9e9a94 0%, #6e6a64 100%)",
  },
  teal: {
    gradient:
      "linear-gradient(135deg, #3a6b6b 0%, #2a5252 15%, #4a8080 40%, #3a6b6b 60%, #2a5252 85%, #3a6b6b 100%)",
    chamfer:
      "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.18) 100%)",
    buttonGradient: "linear-gradient(to bottom, #4a8080 0%, #2a5252 100%)",
  },
  pink: {
    gradient:
      "linear-gradient(135deg, #c4889a 0%, #a06878 15%, #d8a0b0 40%, #c4889a 60%, #a06878 85%, #c4889a 100%)",
    chamfer:
      "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.25) 100%)",
    buttonGradient: "linear-gradient(to bottom, #d8a0b0 0%, #a06878 100%)",
  },
};

export default function IPhoneMockup({
  children,
  scale = 1,
  screenColor = "#000000",
  showStatusBar = true,
  frameColor = "black",
  className = "",
}: IPhoneMockupProps) {
  const baseWidth = 280;
  const w = baseWidth * scale;
  const h = w / (IPHONE_16.screenWidth / IPHONE_16.screenHeight);
  const s = w / IPHONE_16.screenWidth; // scale factor

  const cr = IPHONE_16.cornerRadius * s;
  const bezel = IPHONE_16.bezelThickness * s;
  const statusH = IPHONE_16.statusBarHeight * s;

  // Dynamic Island
  const diW = IPHONE_16.dynamicIslandWidth * s;
  const diH = IPHONE_16.dynamicIslandHeight * s;
  const diTop = IPHONE_16.dynamicIslandTop * s;

  // Device outer
  const dw = w + bezel * 2;
  const dh = h + bezel * 2;
  const dcr = cr + bezel;

  // Side buttons
  const btnW = Math.max(2.5, 3 * scale);
  const btnOffset = btnW + 1; // gap between button and frame

  const styles = FRAME_STYLES[frameColor] || FRAME_STYLES.black;

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: dw + btnOffset * 2,
        height: dh,
        transform: "translateZ(0)",
      }}
    >
      {/* ===== LEFT SIDE BUTTONS ===== */}
      {/* Silent switch / Action Button */}
      <SideButton
        side="left"
        top={dh * IPHONE_16.silentSwitchTop}
        height={dh * IPHONE_16.silentSwitchHeight}
        width={btnW}
        offset={0}
        gradient={styles.buttonGradient}
      />
      {/* Volume Up */}
      <SideButton
        side="left"
        top={dh * IPHONE_16.volumeUpTop}
        height={dh * IPHONE_16.volumeUpHeight}
        width={btnW}
        offset={0}
        gradient={styles.buttonGradient}
      />
      {/* Volume Down */}
      <SideButton
        side="left"
        top={dh * IPHONE_16.volumeDownTop}
        height={dh * IPHONE_16.volumeDownHeight}
        width={btnW}
        offset={0}
        gradient={styles.buttonGradient}
      />

      {/* ===== RIGHT SIDE BUTTON ===== */}
      {/* Power / Side Button */}
      <SideButton
        side="right"
        top={dh * IPHONE_16.powerButtonTop}
        height={dh * IPHONE_16.powerButtonHeight}
        width={btnW}
        offset={0}
        gradient={styles.buttonGradient}
      />

      {/* ===== DEVICE FRAME (Titanium body) ===== */}
      <div
        className="absolute"
        style={{
          left: btnOffset,
          top: 0,
          width: dw,
          height: dh,
          borderRadius: dcr,
          background: styles.gradient,
          // Multi-layer shadow system for depth
          boxShadow: [
            // 1. Contact shadow (tight, dark)
            `0 1px 2px rgba(0,0,0,0.3)`,
            // 2. Near shadow
            `0 4px 12px rgba(0,0,0,0.2)`,
            // 3. Medium diffused shadow
            `0 12px 36px rgba(0,0,0,0.18)`,
            // 4. Large ambient shadow
            `0 32px 72px rgba(0,0,0,0.12)`,
            // 5. Very large soft glow
            `0 48px 100px rgba(0,0,0,0.08)`,
          ].join(", "),
          transform: "translateZ(0)",
        }}
      >
        {/* Chamfer / edge highlight - the polished edge catch */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: dcr,
            border: `${Math.max(0.5, 0.8 * scale)}px solid transparent`,
            backgroundImage: styles.chamfer,
            backgroundClip: "border-box",
            WebkitMask:
              "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Inner edge - subtle bright line inside the frame */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: bezel - Math.max(0.5, 0.8 * scale),
            top: bezel - Math.max(0.5, 0.8 * scale),
            width: w + Math.max(1, 1.6 * scale),
            height: h + Math.max(1, 1.6 * scale),
            borderRadius: cr + Math.max(0.5, 0.8 * scale),
            boxShadow: `inset 0 0 0 ${Math.max(0.5, 0.5 * scale)}px rgba(0,0,0,0.6)`,
          }}
        />

        {/* ===== SCREEN AREA ===== */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: bezel,
            top: bezel,
            width: w,
            height: h,
            borderRadius: cr,
            backgroundColor: screenColor,
            // Screen-to-bezel transition shadow
            boxShadow: `inset 0 0 0 ${Math.max(
              0.5,
              0.5 * scale
            )}px rgba(0,0,0,0.4)`,
          }}
        >
          {/* User content */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {children}
          </div>

          {/* Status bar overlay */}
          {showStatusBar && (
            <Image
              alt="iPhone 16 Status Bar"
              className="absolute pointer-events-none select-none"
              src="/status-bar/iPhone 16 Status Bar Black.png"
              width={IPHONE_16.screenWidth}
              height={IPHONE_16.statusBarHeight}
              unoptimized
              style={{
                width: "calc(100% + 4px)",
                height: statusH,
                top: 0,
                left: -2,
                objectFit: "cover",
                objectPosition: "center 48%",
                borderTopLeftRadius: cr,
                borderTopRightRadius: cr,
                transform: "translateZ(0)",
                zIndex: 2,
              }}
            />
          )}

          {/* Dynamic Island */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: diW,
              height: diH,
              top: diTop,
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: diH / 2,
              background: "#000",
              boxShadow: `inset 0 0 ${2 * s}px rgba(0,0,0,0.9), 0 0 ${
                1 * s
              }px rgba(0,0,0,0.3)`,
              zIndex: 3,
            }}
          />

          {/* Screen glass reflection overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: cr,
              background: [
                // Primary diagonal reflection
                `linear-gradient(
                  155deg,
                  rgba(255,255,255,0.09) 0%,
                  rgba(255,255,255,0.04) 25%,
                  transparent 45%,
                  transparent 65%,
                  rgba(255,255,255,0.015) 85%,
                  rgba(255,255,255,0.03) 100%
                )`,
              ].join(", "),
              zIndex: 4,
            }}
          />

          {/* Subtle edge glow on glass */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: cr,
              boxShadow: `inset 0 ${1 * s}px ${2 * s}px rgba(255,255,255,0.06), inset 0 -${
                1 * s
              }px ${2 * s}px rgba(0,0,0,0.04)`,
              zIndex: 4,
            }}
          />

          {/* Home indicator */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: 8 * s,
              left: "50%",
              transform: "translateX(-50%)",
              width: w * 0.36,
              height: Math.max(4, 5 * s),
              borderRadius: Math.max(2, 2.5 * s),
              background: "rgba(0,0,0,0.25)",
              zIndex: 5,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** Side button sub-component */
function SideButton({
  side,
  top,
  height,
  width,
  offset,
  gradient,
}: {
  side: "left" | "right";
  top: number;
  height: number;
  width: number;
  offset: number;
  gradient: string;
}) {
  const isLeft = side === "left";
  return (
    <div
      className="absolute"
      style={{
        [isLeft ? "left" : "right"]: offset,
        top,
        width,
        height,
        background: gradient,
        borderRadius: isLeft
          ? `${width * 0.4}px 0 0 ${width * 0.4}px`
          : `0 ${width * 0.4}px ${width * 0.4}px 0`,
        boxShadow: isLeft
          ? `
              -1px 0 1px rgba(0,0,0,0.15),
              inset 1px 0 0 rgba(255,255,255,0.08),
              inset 0 1px 0 rgba(255,255,255,0.06),
              inset 0 -1px 0 rgba(0,0,0,0.1)
            `
          : `
              1px 0 1px rgba(0,0,0,0.15),
              inset -1px 0 0 rgba(255,255,255,0.08),
              inset 0 1px 0 rgba(255,255,255,0.06),
              inset 0 -1px 0 rgba(0,0,0,0.1)
            `,
      }}
    />
  );
}
