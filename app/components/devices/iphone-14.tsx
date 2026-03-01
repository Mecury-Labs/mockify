import DeviceMockup, { type DeviceConfig } from "../device-mockup";

const IPHONE_14: DeviceConfig = {
  name: "iPhone 14",
  frameSrc: "/devices/iPhone 14.png",
  framePngWidth: 1370,
  framePngHeight: 2732,
  screenLeftFraction: 0.074453,
  screenTopFraction: 0.039898,
  screenWidthFraction: 0.851095,
  screenHeightFraction: 0.922767,
  screenRadiusFraction: 0.103642,
  statusBarSrc: "/status-bar/Notch Status Bar Black.png",
  statusBarHeightFraction: 0.055,
};

interface IPhone14Props {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone14({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone14Props) {
  return (
    <DeviceMockup
      device={IPHONE_14}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
