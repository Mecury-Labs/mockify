import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 17 device configuration.
 *
 * Frame PNG: 1071 x 2190 (native)
 * Proportions derived from mockup.60fps.design + PNG pixel analysis
 */
const IPHONE_17: DeviceConfig = {
  name: "iPhone 17",
  frameSrc: "/devices/iPhone 17.png",
  framePngWidth: 1071,
  framePngHeight: 2190,
  screenLeftFraction: 0.054155,
  screenTopFraction: 0.025114,
  screenWidthFraction: 0.890756,
  screenHeightFraction: 0.949315,
  screenRadiusFraction: 0.124003,
  statusBarSrc: "/status-bar/iPhone 16 and 16 Plus Status Bar Black.png",
  statusBarHeightFraction: 0.068708,
};

interface IPhone17Props {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhone17({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhone17Props) {
  return (
    <DeviceMockup
      device={IPHONE_17}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
