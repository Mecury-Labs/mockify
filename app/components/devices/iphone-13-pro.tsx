import DeviceMockup, { type DeviceConfig } from "../device-mockup";

const IPHONE_13_PRO: DeviceConfig = {
  name: "iPhone 13 Pro",
  frameSrc: "/devices/iPhone 13 Pro.png",
  framePngWidth: 1400,
  framePngHeight: 2700,
  screenLeftFraction: 0.082143,
  screenTopFraction: 0.068519,
  screenWidthFraction: 0.834286,
  screenHeightFraction: 0.900370,
  screenRadiusFraction: 0.101248,
  statusBarSrc: "/status-bar/Notch Status Bar Black.png",
  statusBarHeightFraction: 0.055,
};

interface IPhone13ProProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone13Pro({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone13ProProps) {
  return (
    <DeviceMockup
      device={IPHONE_13_PRO}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
