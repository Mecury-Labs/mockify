import DeviceMockup, { type DeviceConfig } from "../device-mockup";

const IPHONE_15_PRO_MAX: DeviceConfig = {
  name: "iPhone 15 Pro Max",
  frameSrc: "/devices/iPhone 15 Pro Max.png",
  framePngWidth: 1530,
  framePngHeight: 3036,
  screenLeftFraction: 0.078431,
  screenTopFraction: 0.039526,
  screenWidthFraction: 0.843137,
  screenHeightFraction: 0.920948,
  screenRadiusFraction: 0.107843,
  statusBarSrc: "/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png",
  statusBarHeightFraction: 0.065,
};

interface IPhone15ProMaxProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone15ProMax({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone15ProMaxProps) {
  return (
    <DeviceMockup
      device={IPHONE_15_PRO_MAX}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
