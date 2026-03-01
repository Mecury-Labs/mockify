import DeviceMockup, { type DeviceConfig } from "../device-mockup";

export const IPHONE_14_PLUS: DeviceConfig = {
  name: "iPhone 14 Plus",
  frameSrc: "/devices/iPhone 14 Plus.png",
  framePngWidth: 1464,
  framePngHeight: 2978,
  screenLeftFraction: 0.061475,
  screenTopFraction: 0.035594,
  screenWidthFraction: 0.877049,
  screenHeightFraction: 0.930826,
  screenRadiusFraction: 0.109283,
  statusBarSrc: "/status-bar/Notch Status Bar Black.png",
  statusBarHeightFraction: 0.055,
  colors: [
    { name: "Midnight", frameSrc: "/devices/iPhone 14 Plus - Midnight.png", swatch: "#3E3C39" },
    { name: "Starlight", frameSrc: "/devices/iPhone 14 Plus - Starlight.png", swatch: "#F0E4D3" },
    { name: "Blue", frameSrc: "/devices/iPhone 14 Plus - Blue.png", swatch: "#A0B4C8" },
    { name: "Purple", frameSrc: "/devices/iPhone 14 Plus - Purple.png", swatch: "#E5DDEA" },
    { name: "Red", frameSrc: "/devices/iPhone 14 Plus - Red.png", swatch: "#FA2837" },
  ],
  defaultColor: "Midnight",
};

interface IPhone14PlusProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone14Plus({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone14PlusProps) {
  return (
    <DeviceMockup
      device={IPHONE_14_PLUS}
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
