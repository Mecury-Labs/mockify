import DeviceMockup, { type DeviceConfig } from "../device-mockup";

const IPHONE_14_PRO_MAX: DeviceConfig = {
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
};

interface IPhone14ProMaxProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone14ProMax({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone14ProMaxProps) {
  return (
    <DeviceMockup
      device={IPHONE_14_PRO_MAX}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
