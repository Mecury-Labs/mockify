import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 16 Plus device configuration.
 *
 * Frame PNG: 1167 x 2357 (native)
 * Proportions reverse-engineered from mockup.60fps.design
 */
const IPHONE_16_PLUS: DeviceConfig = {
  name: "iPhone 16 Plus",
  frameSrc: "/devices/iPhone 16 Plus.png",
  framePngWidth: 1167,
  framePngHeight: 2357,
  screenLeftFraction: 0.052632,
  screenTopFraction: 0.018913,
  screenWidthFraction: 0.894737,
  screenHeightFraction: 0.959811,
  screenRadiusFraction: 0.124557,
  statusBarSrc: "/status-bar/iPhone 16 Status Bar Black.png",
  statusBarHeightFraction: 0.064039,
};

interface IPhone16PlusProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone16Plus({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone16PlusProps) {
  return (
    <DeviceMockup
      device={IPHONE_16_PLUS}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
