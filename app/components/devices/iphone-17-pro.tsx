import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone 17 Pro device configuration.
 *
 * Frame PNG: 1071 x 2190 (native)
 * Proportions derived from mockup.60fps.design + PNG pixel analysis
 */
export const IPHONE_17_PRO: DeviceConfig = {
  name: "iPhone 17 Pro",
  frameSrc: "/devices/iPhone 17 Pro.png",
  framePngWidth: 1071,
  framePngHeight: 2190,
  screenLeftFraction: 0.054155,
  screenTopFraction: 0.025114,
  screenWidthFraction: 0.891690,
  screenHeightFraction: 0.949315,
  screenRadiusFraction: 0.124133,
  statusBarSrc: "/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png",
  statusBarHeightFraction: 0.073693,
  colors: [],
};

interface IPhone17ProProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone17Pro({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone17ProProps) {
  return (
    <DeviceMockup
      device={IPHONE_17_PRO}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
      color={color}
    >
      {children}
    </DeviceMockup>
  );
}
