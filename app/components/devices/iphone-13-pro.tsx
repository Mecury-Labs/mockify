import DeviceMockup, { type DeviceConfig } from "../device-mockup";

export const IPHONE_13_PRO: DeviceConfig = {
  name: "iPhone 13 Pro",
  frameSrc: "/devices/iPhone 13 Pro.png",
  framePngWidth: 1400,
  framePngHeight: 2700,
  screenLeftFraction: 0.083571,
  screenTopFraction: 0.035556,
  screenWidthFraction: 0.832857,
  screenHeightFraction: 0.932593,
  screenRadiusFraction: 0.101421,
  statusBarSrc: "/status-bar/Notch Status Bar Black.png",
  statusBarHeightFraction: 0.055,
  colors: [
    { name: "Graphite", frameSrc: "/devices/iPhone 13 Pro - Graphite.png", swatch: "#54524F" },
    { name: "Silver", frameSrc: "/devices/iPhone 13 Pro - Silver.png", swatch: "#E3E4DF" },
  ],
  defaultColor: "Graphite",
};

interface IPhone13ProProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone13Pro({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone13ProProps) {
  return (
    <DeviceMockup
      device={IPHONE_13_PRO}
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
