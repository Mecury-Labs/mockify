import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 16 Pro device configuration.
 *
 * Frame PNG: 1350 x 2760 (Apple Design Resources)
 */
export const IPHONE_16_PRO: DeviceConfig = {
  name: "iPhone 16 Pro",
  frameSrc: "/devices/iPhone 16 Pro - Natural Titanium.png",
  framePngWidth: 1350,
  framePngHeight: 2760,
  screenLeftFraction: 0.054815,
  screenTopFraction: 0.025725,
  screenWidthFraction: 0.889630,
  screenHeightFraction: 0.948188,
  screenRadiusFraction: 0.147407,
  statusBarSrc: "/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png",
  statusBarHeightFraction: 0.073892,
  colors: [
    { name: "Natural Titanium", frameSrc: "/devices/iPhone 16 Pro - Natural Titanium.png", swatch: "#C2B9AE" },
    { name: "Black Titanium", frameSrc: "/devices/iPhone 16 Pro - Black Titanium.png", swatch: "#3B3B3D" },
    { name: "White Titanium", frameSrc: "/devices/iPhone 16 Pro - White Titanium.png", swatch: "#E3E4DF" },
    { name: "Desert Titanium", frameSrc: "/devices/iPhone 16 Pro - Desert Titanium.png", swatch: "#C4A97D" },
  ],
  defaultColor: "Natural Titanium",
};

interface IPhone16ProProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone16Pro({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone16ProProps) {
  return (
    <DeviceMockup
      device={IPHONE_16_PRO}
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
