import DeviceMockup, { type DeviceConfig } from "../device-mockup";

export const IPHONE_13_MINI: DeviceConfig = {
  name: "iPhone 13 Mini",
  frameSrc: "/devices/iPhone 13 Mini.png",
  framePngWidth: 1240,
  framePngHeight: 2500,
  screenLeftFraction: 0.064516,
  screenTopFraction: 0.033600,
  screenWidthFraction: 0.870968,
  screenHeightFraction: 0.934400,
  screenRadiusFraction: 0.106452,
  statusBarSrc: "/status-bar/Notch Status Bar Black.png",
  statusBarHeightFraction: 0.055,
  colors: [
    { name: "Midnight", frameSrc: "/devices/iPhone 13 Mini - Midnight.png", swatch: "#3E3C39" },
    { name: "Starlight", frameSrc: "/devices/iPhone 13 Mini - Starlight.png", swatch: "#F0E4D3" },
  ],
  defaultColor: "Midnight",
};

interface IPhone13MiniProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone13Mini({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone13MiniProps) {
  return (
    <DeviceMockup
      device={IPHONE_13_MINI}
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
