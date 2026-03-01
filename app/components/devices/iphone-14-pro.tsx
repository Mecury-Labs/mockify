import DeviceMockup, { type DeviceConfig } from "../device-mockup";

export const IPHONE_14_PRO: DeviceConfig = {
  name: "iPhone 14 Pro",
  frameSrc: "/devices/iPhone 14 Pro.png",
  framePngWidth: 1339,
  framePngHeight: 2716,
  screenLeftFraction: 0.059746,
  screenTopFraction: 0.029456,
  screenWidthFraction: 0.878268,
  screenHeightFraction: 0.941091,
  screenRadiusFraction: 0.122913,
  statusBarSrc: "/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png",
  statusBarHeightFraction: 0.065,
  colors: [
    { name: "Space Black", frameSrc: "/devices/iPhone 14 Pro - Space Black.png", swatch: "#3B3B3D" },
    { name: "Silver", frameSrc: "/devices/iPhone 14 Pro - Silver.png", swatch: "#E3E4DF" },
    { name: "Gold", frameSrc: "/devices/iPhone 14 Pro - Gold.png", swatch: "#F4E8CE" },
    { name: "Deep Purple", frameSrc: "/devices/iPhone 14 Pro - Deep Purple.png", swatch: "#635166" },
  ],
  defaultColor: "Space Black",
};

interface IPhone14ProProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone14Pro({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone14ProProps) {
  return (
    <DeviceMockup
      device={IPHONE_14_PRO}
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
