import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 17 Pro Max device configuration.
 *
 * Frame PNG: 1470 x 3000 (Apple Design Resources)
 */
export const IPHONE_17_PRO_MAX: DeviceConfig = {
  name: "iPhone 17 Pro Max",
  frameSrc: "/devices/iPhone 17 Pro Max - Silver.png",
  framePngWidth: 1470,
  framePngHeight: 3000,
  screenLeftFraction: 0.052381,
  screenTopFraction: 0.022667,
  screenWidthFraction: 0.894558,
  screenHeightFraction: 0.954333,
  screenRadiusFraction: 0.136054,
  statusBarSrc: "/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png",
  statusBarHeightFraction: 0.066415,
  colors: [
    { name: "Silver", frameSrc: "/devices/iPhone 17 Pro Max - Silver.png", swatch: "#E3E4DF" },
    { name: "Cosmic Orange", frameSrc: "/devices/iPhone 17 Pro Max - Cosmic Orange.png", swatch: "#D4956A" },
    { name: "Deep Blue", frameSrc: "/devices/iPhone 17 Pro Max - Deep Blue.png", swatch: "#3D4F6A" },
  ],
  defaultColor: "Silver",
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
