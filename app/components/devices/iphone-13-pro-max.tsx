import DeviceMockup, { type DeviceConfig } from "../device-mockup";

const IPHONE_13_PRO_MAX: DeviceConfig = {
  name: "iPhone 13 Pro Max",
  frameSrc: "/devices/iPhone 13 Pro Max.png",
  framePngWidth: 1500,
  framePngHeight: 3000,
  screenLeftFraction: 0.072000,
  screenTopFraction: 0.070667,
  screenWidthFraction: 0.854000,
  screenHeightFraction: 0.892333,
  screenRadiusFraction: 0.106411,
  statusBarSrc: "/status-bar/Notch Status Bar Black.png",
  statusBarHeightFraction: 0.055,
};

interface IPhone13ProMaxProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone13ProMax({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone13ProMaxProps) {
  return (
    <DeviceMockup
      device={IPHONE_13_PRO_MAX}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
