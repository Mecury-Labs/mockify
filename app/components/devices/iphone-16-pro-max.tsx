import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 16 Pro Max device configuration.
 *
 * Frame PNG: 1470 x 3000 (Apple Design Resources)
 */
export const IPHONE_16_PRO_MAX: DeviceConfig = {
  name: "iPhone 16 Pro Max",
  frameSrc: "/devices/iPhone 16 Pro Max - Natural Titanium.png",
  framePngWidth: 1470,
  framePngHeight: 3000,
  screenLeftFraction: 0.052381,
  screenTopFraction: 0.022667,
  screenWidthFraction: 0.894558,
  screenHeightFraction: 0.954333,
  screenRadiusFraction: 0.133333,
  statusBarSrc: "/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png",
  statusBarHeightFraction: 0.065812,
  colors: [
    { name: "Natural Titanium", frameSrc: "/devices/iPhone 16 Pro Max - Natural Titanium.png", swatch: "#C2B9AE" },
    { name: "Black Titanium", frameSrc: "/devices/iPhone 16 Pro Max - Black Titanium.png", swatch: "#3B3B3D" },
    { name: "White Titanium", frameSrc: "/devices/iPhone 16 Pro Max - White Titanium.png", swatch: "#E3E4DF" },
    { name: "Desert Titanium", frameSrc: "/devices/iPhone 16 Pro Max - Desert Titanium.png", swatch: "#C4A97D" },
  ],
  defaultColor: "Natural Titanium",
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
