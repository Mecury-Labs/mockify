import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 16 Plus device configuration.
 *
 * Frame PNG: 1470 x 2970 (Apple Design Resources)
 */
export const IPHONE_16_PLUS: DeviceConfig = {
  name: "iPhone 16 Plus",
  frameSrc: "/devices/iPhone 16 Plus - Black.png",
  framePngWidth: 1470,
  framePngHeight: 2970,
  screenLeftFraction: 0.062585,
  screenTopFraction: 0.029966,
  screenWidthFraction: 0.874150,
  screenHeightFraction: 0.939731,
  screenRadiusFraction: 0.120408,
  statusBarSrc: "/status-bar/iPhone 16 and 16 Plus Status Bar Black.png",
  statusBarHeightFraction: 0.064039,
  colors: [
    { name: "Black", frameSrc: "/devices/iPhone 16 Plus - Black.png", swatch: "#3B3B3D" },
    { name: "White", frameSrc: "/devices/iPhone 16 Plus - White.png", swatch: "#F5F5F0" },
    { name: "Teal", frameSrc: "/devices/iPhone 16 Plus - Teal.png", swatch: "#B0D4CE" },
    { name: "Pink", frameSrc: "/devices/iPhone 16 Plus - Pink.png", swatch: "#F2C8D0" },
    { name: "Ultramarine", frameSrc: "/devices/iPhone 16 Plus - Ultramarine.png", swatch: "#7C8ACF" },
  ],
  defaultColor: "Black",
};

interface IPhone16PlusProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone16Plus({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone16PlusProps) {
  return (
    <DeviceMockup
      device={IPHONE_16_PLUS}
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
