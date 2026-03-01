import DeviceMockup, { type DeviceConfig } from "../device-mockup";

export const IPHONE_13: DeviceConfig = {
  name: "iPhone 13",
  frameSrc: "/devices/iPhone 13.png",
  framePngWidth: 1400,
  framePngHeight: 2700,
  screenLeftFraction: 0.083571,
  screenTopFraction: 0.035556,
  screenWidthFraction: 0.832857,
  screenHeightFraction: 0.932593,
  screenRadiusFraction: 0.101421,
  statusBarSrc: "/status-bar/Notch Status Bar Black.png",
  statusBarHeightFraction: 0.055,
  colors: [
    { name: "Midnight", frameSrc: "/devices/iPhone 13 - Midnight.png", swatch: "#3E3C39" },
    { name: "Starlight", frameSrc: "/devices/iPhone 13 - Starlight.png", swatch: "#F0E4D3" },
  ],
  defaultColor: "Midnight",
};

interface IPhone13Props {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone13({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone13Props) {
  return (
    <DeviceMockup
      device={IPHONE_13}
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
