import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 17 Pro Max device configuration.
 *
 * Frame PNG: 1167 x 2380 (native)
 * Proportions derived from mockup.60fps.design + PNG pixel analysis
 */
export const IPHONE_17_PRO_MAX: DeviceConfig = {
  name: "iPhone 17 Pro Max",
  frameSrc: "/devices/iPhone 17 Pro Max.png",
  framePngWidth: 1167,
  framePngHeight: 2380,
  screenLeftFraction: 0.051414,
  screenTopFraction: 0.022269,
  screenWidthFraction: 0.896315,
  screenHeightFraction: 0.955462,
  screenRadiusFraction: 0.125067,
  statusBarSrc: "/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png",
  statusBarHeightFraction: 0.066415,
  colors: [],
};

interface IPhone17ProMaxProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone17ProMax({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone17ProMaxProps) {
  return (
    <DeviceMockup
      device={IPHONE_17_PRO_MAX}
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
