import DeviceMockup, { type DeviceConfig } from "../device-mockup";

const IPHONE_15: DeviceConfig = {
  name: "iPhone 15",
  frameSrc: "/devices/iPhone 15.png",
  framePngWidth: 1419,
  framePngHeight: 2796,
  screenLeftFraction: 0.084566,
  screenTopFraction: 0.042919,
  screenWidthFraction: 0.828752,
  screenHeightFraction: 0.914163,
  screenRadiusFraction: 0.115983,
  statusBarSrc: "/status-bar/iPhone 16 and 16 Plus Status Bar Black.png",
  statusBarHeightFraction: 0.065,
};

interface IPhone15Props {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone15({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone15Props) {
  return (
    <DeviceMockup
      device={IPHONE_15}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
