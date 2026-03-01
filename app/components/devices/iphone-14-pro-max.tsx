import DeviceMockup, { type DeviceConfig } from "../device-mockup";

export const IPHONE_14_PRO_MAX: DeviceConfig = {
  name: "iPhone 14 Pro Max",
  frameSrc: "/devices/iPhone 14 Pro Max.png",
  framePngWidth: 1450,
  framePngHeight: 2936,
  screenLeftFraction: 0.055172,
  screenTopFraction: 0.023842,
  screenWidthFraction: 0.888276,
  screenHeightFraction: 0.952316,
  screenRadiusFraction: 0.113617,
  statusBarSrc: "/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png",
  statusBarHeightFraction: 0.065,
  colors: [
    { name: "Space Black", frameSrc: "/devices/iPhone 14 Pro Max - Space Black.png", swatch: "#3B3B3D" },
    { name: "Silver", frameSrc: "/devices/iPhone 14 Pro Max - Silver.png", swatch: "#E3E4DF" },
    { name: "Gold", frameSrc: "/devices/iPhone 14 Pro Max - Gold.png", swatch: "#F4E8CE" },
    { name: "Deep Purple", frameSrc: "/devices/iPhone 14 Pro Max - Deep Purple.png", swatch: "#635166" },
  ],
  defaultColor: "Space Black",
};

interface IPhone14ProMaxProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone14ProMax({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone14ProMaxProps) {
  return (
    <DeviceMockup
      device={IPHONE_14_PRO_MAX}
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
