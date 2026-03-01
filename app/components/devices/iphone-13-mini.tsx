import DeviceMockup, { type DeviceConfig } from "../device-mockup";

const IPHONE_13_MINI: DeviceConfig = {
  name: "iPhone 13 Mini",
  frameSrc: "/devices/iPhone 13 Mini.png",
  framePngWidth: 1240,
  framePngHeight: 2500,
  screenLeftFraction: 0.064516,
  screenTopFraction: 0.075200,
  screenWidthFraction: 0.868548,
  screenHeightFraction: 0.892800,
  screenRadiusFraction: 0.106156,
  statusBarSrc: "/status-bar/Notch Status Bar Black.png",
  statusBarHeightFraction: 0.055,
};

interface IPhone13MiniProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone13Mini({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone13MiniProps) {
  return (
    <DeviceMockup
      device={IPHONE_13_MINI}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
