import DeviceMockup, { type DeviceConfig } from "../device-mockup";

export const IPHONE_14: DeviceConfig = {
  name: "iPhone 14",
  frameSrc: "/devices/iPhone 14.png",
  framePngWidth: 1370,
  framePngHeight: 2732,
  screenLeftFraction: 0.074453,
  screenTopFraction: 0.039898,
  screenWidthFraction: 0.851095,
  screenHeightFraction: 0.922767,
  screenRadiusFraction: 0.103642,
  statusBarSrc: "/status-bar/Notch Status Bar Black.png",
  statusBarHeightFraction: 0.055,
  colors: [
    { name: "Midnight", frameSrc: "/devices/iPhone 14 - Midnight.png", swatch: "#3E3C39" },
    { name: "Starlight", frameSrc: "/devices/iPhone 14 - Starlight.png", swatch: "#F0E4D3" },
    { name: "Blue", frameSrc: "/devices/iPhone 14 - Blue.png", swatch: "#A0B4C8" },
    { name: "Purple", frameSrc: "/devices/iPhone 14 - Purple.png", swatch: "#E5DDEA" },
    { name: "Red", frameSrc: "/devices/iPhone 14 - Red.png", swatch: "#FA2837" },
  ],
  defaultColor: "Midnight",
};

interface IPhone14Props {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone14({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone14Props) {
  return (
    <DeviceMockup
      device={IPHONE_14}
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
