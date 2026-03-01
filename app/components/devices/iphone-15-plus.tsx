import DeviceMockup, { type DeviceConfig } from "../device-mockup";

const IPHONE_15_PLUS: DeviceConfig = {
  name: "iPhone 15 Plus",
  frameSrc: "/devices/iPhone 15 Plus.png",
  framePngWidth: 1530,
  framePngHeight: 3036,
  screenLeftFraction: 0.078431,
  screenTopFraction: 0.039526,
  screenWidthFraction: 0.841830,
  screenHeightFraction: 0.920948,
  screenRadiusFraction: 0.107676,
  statusBarSrc: "/status-bar/iPhone 16 and 16 Plus Status Bar Black.png",
  statusBarHeightFraction: 0.065,
};

interface IPhone15PlusProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone15Plus({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone15PlusProps) {
  return (
    <DeviceMockup
      device={IPHONE_15_PLUS}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
