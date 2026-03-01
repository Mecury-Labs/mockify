import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 16 device configuration.
 *
 * Frame PNG: 1359 x 2736 (Apple Design Resources)
 */
export const IPHONE_16: DeviceConfig = {
  name: "iPhone 16",
  frameSrc: "/devices/iPhone 16 - Black.png",
  framePngWidth: 1359,
  framePngHeight: 2736,
  screenLeftFraction: 0.067697,
  screenTopFraction: 0.033626,
  screenWidthFraction: 0.863870,
  screenHeightFraction: 0.932383,
  screenRadiusFraction: 0.126564,
  statusBarSrc: "/status-bar/iPhone 16 and 16 Plus Status Bar Black.png",
  statusBarHeightFraction: 0.068966,
  colors: [
    { name: "Black", frameSrc: "/devices/iPhone 16 - Black.png", swatch: "#3B3B3D" },
    { name: "White", frameSrc: "/devices/iPhone 16 - White.png", swatch: "#F5F5F0" },
    { name: "Teal", frameSrc: "/devices/iPhone 16 - Teal.png", swatch: "#B0D4CE" },
    { name: "Pink", frameSrc: "/devices/iPhone 16 - Pink.png", swatch: "#F2C8D0" },
    { name: "Ultramarine", frameSrc: "/devices/iPhone 16 - Ultramarine.png", swatch: "#7C8ACF" },
  ],
  defaultColor: "Black",
};

interface IPhone16Props {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone16({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone16Props) {
  return (
    <DeviceMockup
      device={IPHONE_16}
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
