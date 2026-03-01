import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 16 device configuration.
 *
 * Frame PNG: 1079 x 2171 (native)
 * Proportions reverse-engineered from mockup.60fps.design
 */
const IPHONE_16: DeviceConfig = {
  name: "iPhone 16",
  frameSrc: "/devices/iPhone 16.png",
  framePngWidth: 1079,
  framePngHeight: 2171,
  screenLeftFraction: 0.057143,
  screenTopFraction: 0.018913,
  screenWidthFraction: 0.890476,
  screenHeightFraction: 0.959811,
  screenRadiusFraction: 0.124252,
  statusBarSrc: "/status-bar/iPhone 16 and 16 Plus Status Bar Black.png",
  statusBarHeightFraction: 0.068966,
};

interface IPhone16Props {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone16({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone16Props) {
  return (
    <DeviceMockup
      device={IPHONE_16}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
