import DeviceMockup, { type DeviceConfig } from "../device-mockup";

const IPHONE_14_PLUS: DeviceConfig = {
  name: "iPhone 14 Plus",
  frameSrc: "/devices/iPhone 14 Plus.png",
  framePngWidth: 1464,
  framePngHeight: 2978,
  screenLeftFraction: 0.061475,
  screenTopFraction: 0.067830,
  screenWidthFraction: 0.876366,
  screenHeightFraction: 0.898590,
  screenRadiusFraction: 0.109198,
  statusBarSrc: "/status-bar/Notch Status Bar Black.png",
  statusBarHeightFraction: 0.055,
};

interface IPhone14PlusProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone14Plus({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone14PlusProps) {
  return (
    <DeviceMockup
      device={IPHONE_14_PLUS}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
