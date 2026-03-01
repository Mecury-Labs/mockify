import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 16 Pro Max device configuration.
 *
 * Frame PNG: 1164 x 2380 (native)
 * Proportions derived from mockup.60fps.design + PNG pixel analysis
 */
export const IPHONE_16_PRO_MAX: DeviceConfig = {
  name: "iPhone 16 Pro Max",
  frameSrc: "/devices/iPhone 16 Pro Max.png",
  framePngWidth: 1164,
  framePngHeight: 2380,
  screenLeftFraction: 0.050687,
  screenTopFraction: 0.022269,
  screenWidthFraction: 0.898625,
  screenHeightFraction: 0.955462,
  screenRadiusFraction: 0.124252,
  statusBarSrc: "/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png",
  statusBarHeightFraction: 0.065812,
  colors: [],
};

interface IPhone16ProMaxProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone16ProMax({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone16ProMaxProps) {
  return (
    <DeviceMockup
      device={IPHONE_16_PRO_MAX}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
      color={color}
    >
      {children}
    </DeviceMockup>
  );
}
