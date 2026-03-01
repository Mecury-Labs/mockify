import Image from "next/image";

/**
 * iPhone 16 Mockup Component
 *
 * Dimensions based on iPhone 16 physical proportions:
 *   - Logical resolution: 393 x 852 (points)
 *   - Aspect ratio: ~0.461
 *   - Corner radius: ~55px at full size (scaled proportionally)
 *
 * The component renders at a default width of 280px and scales proportionally.
 * The `scale` prop lets you resize it (1 = 280px wide, 1.5 = 420px, etc.)
 */

// iPhone 16 proportions
const IPHONE_16 = {
  // Screen logical resolution
  screenWidth: 393,
  screenHeight: 852,
  // Corner radius at full screen size
  cornerRadius: 55,
  // Status bar height at full screen size
  statusBarHeight: 54,
  // Dynamic Island dimensions at full screen size
  dynamicIslandWidth: 126,
  dynamicIslandHeight: 37,
  dynamicIslandTop: 11,
  // Bezel thickness
  bezelThickness: 10,
  // Side button positions (relative to device height)
  silentSwitchTop: 0.148,
  silentSwitchHeight: 0.035,
  volumeUpTop: 0.195,
  volumeUpHeight: 0.065,
  volumeDownTop: 0.275,
  volumeDownHeight: 0.065,
  powerButtonTop: 0.26,
  powerButtonHeight: 0.083,
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
  /** Additional className for the outer wrapper */
  className?: string;
}

export default function IPhoneMockup({
  children,
  scale = 1,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhoneMockupProps) {
  // Base width the component renders at (before scale)
  const baseWidth = 280;
  const width = baseWidth * scale;
  const aspectRatio = IPHONE_16.screenWidth / IPHONE_16.screenHeight;
  const height = width / aspectRatio;

  // Scale all proportions relative to the render size
  const scaleFactor = width / IPHONE_16.screenWidth;
  const cornerRadius = IPHONE_16.cornerRadius * scaleFactor;
  const bezel = IPHONE_16.bezelThickness * scaleFactor;
  const statusBarHeight = IPHONE_16.statusBarHeight * scaleFactor;

  // Dynamic Island
  const diWidth = IPHONE_16.dynamicIslandWidth * scaleFactor;
  const diHeight = IPHONE_16.dynamicIslandHeight * scaleFactor;
  const diTop = IPHONE_16.dynamicIslandTop * scaleFactor;
  const diRadius = diHeight / 2;

  // Device outer dimensions (screen + bezel)
  const deviceWidth = width + bezel * 2;
  const deviceHeight = height + bezel * 2;
  const deviceRadius = cornerRadius + bezel;

  // Side buttons
  const buttonWidth = 3 * scale;
  const silentSwitchTop = deviceHeight * IPHONE_16.silentSwitchTop;
  const silentSwitchHeight = deviceHeight * IPHONE_16.silentSwitchHeight;
  const volumeUpTop = deviceHeight * IPHONE_16.volumeUpTop;
  const volumeUpHeight = deviceHeight * IPHONE_16.volumeUpHeight;
  const volumeDownTop = deviceHeight * IPHONE_16.volumeDownTop;
  const volumeDownHeight = deviceHeight * IPHONE_16.volumeDownHeight;
  const powerTop = deviceHeight * IPHONE_16.powerButtonTop;
  const powerHeight = deviceHeight * IPHONE_16.powerButtonHeight;

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: deviceWidth + buttonWidth * 2,
        height: deviceHeight,
      }}
    >
      {/* Left side buttons */}
      {/* Silent switch */}
      <div
        className="absolute left-0 rounded-l-sm"
        style={{
          width: buttonWidth,
          height: silentSwitchHeight,
          top: silentSwitchTop,
          background: "#b0b0b0",
        }}
      />
      {/* Volume Up */}
      <div
        className="absolute left-0 rounded-l-sm"
        style={{
          width: buttonWidth,
          height: volumeUpHeight,
          top: volumeUpTop,
          background: "#b0b0b0",
        }}
      />
      {/* Volume Down */}
      <div
        className="absolute left-0 rounded-l-sm"
        style={{
          width: buttonWidth,
          height: volumeDownHeight,
          top: volumeDownTop,
          background: "#b0b0b0",
        }}
      />

      {/* Right side button - Power */}
      <div
        className="absolute rounded-r-sm"
        style={{
          width: buttonWidth,
          height: powerHeight,
          top: powerTop,
          right: 0,
          background: "#b0b0b0",
        }}
      />

      {/* Device frame (bezel) */}
      <div
        className="absolute"
        style={{
          left: buttonWidth,
          top: 0,
          width: deviceWidth,
          height: deviceHeight,
          borderRadius: deviceRadius,
          background: "#1a1a1a",
          boxShadow: `
            0 0 0 1px rgba(0,0,0,0.12),
            0 2px 8px rgba(0,0,0,0.15),
            0 8px 30px rgba(0,0,0,0.12),
            inset 0 0 0 1px rgba(255,255,255,0.05)
          `,
        }}
      >
        {/* Screen area */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: bezel,
            top: bezel,
            width: width,
            height: height,
            borderRadius: cornerRadius,
            backgroundColor: screenColor,
          }}
        >
          {/* Screen content */}
          <div className="absolute inset-0 w-full h-full">{children}</div>

          {/* Status bar overlay */}
          {showStatusBar && (
            <Image
              alt="iPhone 16 Status Bar"
              className="absolute pointer-events-none select-none"
              src="/status-bar/iPhone 16 Status Bar Black.png"
              width={IPHONE_16.screenWidth}
              height={IPHONE_16.statusBarHeight}
              style={{
                width: "calc(100% + 4px)",
                height: statusBarHeight,
                top: 0,
                left: -2,
                objectFit: "cover",
                objectPosition: "center 48%",
                borderTopLeftRadius: cornerRadius,
                borderTopRightRadius: cornerRadius,
                transform: "translateZ(0)",
              }}
            />
          )}

          {/* Dynamic Island */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: diWidth,
              height: diHeight,
              top: diTop,
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: diRadius,
              background: "#000",
            }}
          />
        </div>

        {/* Bottom indicator bar (home indicator) */}
        <div
          className="absolute"
          style={{
            bottom: bezel + 8 * scaleFactor,
            left: "50%",
            transform: "translateX(-50%)",
            width: width * 0.35,
            height: 5 * scaleFactor,
            borderRadius: 3 * scaleFactor,
            background: "rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </div>
  );
}
