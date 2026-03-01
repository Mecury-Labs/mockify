import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 17 Pro device configuration.
 *
 * Frame PNG: 1350 x 2760 (Apple Design Resources)
 */
export const IPHONE_17_PRO: DeviceConfig = {
  name: "iPhone 17 Pro",
  frameSrc: "/devices/iPhone 17 Pro - Silver.png",
  framePngWidth: 1350,
  framePngHeight: 2760,
  screenLeftFraction: 0.054815,
  screenTopFraction: 0.025725,
  screenWidthFraction: 0.889630,
  screenHeightFraction: 0.948188,
  screenRadiusFraction: 0.146667,
  statusBarSrc: "/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png",
  statusBarHeightFraction: 0.073693,
  colors: [
    { name: "Silver", frameSrc: "/devices/iPhone 17 Pro - Silver.png", swatch: "#E3E4DF" },
    { name: "Cosmic Orange", frameSrc: "/devices/iPhone 17 Pro - Cosmic Orange.png", swatch: "#D4956A" },
    { name: "Deep Blue", frameSrc: "/devices/iPhone 17 Pro - Deep Blue.png", swatch: "#3D4F6A" },
  ],
  defaultColor: "Silver",
};

interface IPhone17ProProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone17Pro({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone17ProProps) {
  return (
    <DeviceMockup
      device={IPHONE_17_PRO}
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
