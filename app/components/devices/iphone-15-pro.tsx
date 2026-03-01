import DeviceMockup, { type DeviceConfig } from "../device-mockup";

const IPHONE_15_PRO: DeviceConfig = {
  name: "iPhone 15 Pro",
  frameSrc: "/devices/iPhone 15 Pro.png",
  framePngWidth: 1419,
  framePngHeight: 2796,
  screenLeftFraction: 0.084566,
  screenTopFraction: 0.042919,
  screenWidthFraction: 0.829458,
  screenHeightFraction: 0.914163,
  screenRadiusFraction: 0.116082,
  statusBarSrc: "/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png",
  statusBarHeightFraction: 0.065,
};

interface IPhone15ProProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone15Pro({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone15ProProps) {
  return (
    <DeviceMockup
      device={IPHONE_15_PRO}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
