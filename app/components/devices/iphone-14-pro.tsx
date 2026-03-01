import DeviceMockup, { type DeviceConfig } from "../device-mockup";

const IPHONE_14_PRO: DeviceConfig = {
  name: "iPhone 14 Pro",
  frameSrc: "/devices/iPhone 14 Pro.png",
  framePngWidth: 1339,
  framePngHeight: 2716,
  screenLeftFraction: 0.059746,
  screenTopFraction: 0.029456,
  screenWidthFraction: 0.878268,
  screenHeightFraction: 0.941091,
  screenRadiusFraction: 0.122913,
  statusBarSrc: "/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png",
  statusBarHeightFraction: 0.065,
};

interface IPhone14ProProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone14Pro({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone14ProProps) {
  return (
    <DeviceMockup
      device={IPHONE_14_PRO}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
