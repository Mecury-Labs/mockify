import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 16 Pro device configuration.
 *
 * Frame PNG: 1071 x 2190 (native)
 * Proportions reverse-engineered from mockup.60fps.design
 */
const IPHONE_16_PRO: DeviceConfig = {
  name: "iPhone 16 Pro",
  frameSrc: "/devices/iPhone 16 Pro.png",
  framePngWidth: 1071,
  framePngHeight: 2190,
  screenLeftFraction: 0.048309,
  screenTopFraction: 0.018913,
  screenWidthFraction: 0.903382,
  screenHeightFraction: 0.959811,
  screenRadiusFraction: 0.125761,
  statusBarSrc: "/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png",
  statusBarHeightFraction: 0.073892,
};

interface IPhone16ProProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone16Pro({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone16ProProps) {
  return (
    <DeviceMockup
      device={IPHONE_16_PRO}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
