import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 17 device configuration.
 *
 * Frame PNG: 1350 x 2760 (Apple Design Resources)
 */
export const IPHONE_17: DeviceConfig = {
  name: "iPhone 17",
  frameSrc: "/devices/iPhone 17 - Black.png",
  framePngWidth: 1350,
  framePngHeight: 2760,
  screenLeftFraction: 0.054815,
  screenTopFraction: 0.025725,
  screenWidthFraction: 0.889630,
  screenHeightFraction: 0.948188,
  screenRadiusFraction: 0.147407,
  statusBarSrc: "/status-bar/iPhone 16 and 16 Plus Status Bar Black.png",
  statusBarHeightFraction: 0.068708,
  colors: [
    { name: "Black", frameSrc: "/devices/iPhone 17 - Black.png", swatch: "#3B3B3D" },
    { name: "White", frameSrc: "/devices/iPhone 17 - White.png", swatch: "#F5F5F0" },
    { name: "Lavender", frameSrc: "/devices/iPhone 17 - Lavender.png", swatch: "#D0C4D8" },
    { name: "Mist Blue", frameSrc: "/devices/iPhone 17 - Mist Blue.png", swatch: "#B4C8D4" },
    { name: "Sage", frameSrc: "/devices/iPhone 17 - Sage.png", swatch: "#BEC8B0" },
  ],
  defaultColor: "Black",
};

interface IPhone17Props {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone17({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone17Props) {
  return (
    <DeviceMockup
      device={IPHONE_17}
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
