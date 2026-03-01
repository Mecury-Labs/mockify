import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone Air device configuration.
 *
 * Frame PNG: 1095 x 2285 (native)
 * Proportions derived from mockup.60fps.design + PNG pixel analysis
 */
const IPHONE_AIR: DeviceConfig = {
  name: "iPhone Air",
  frameSrc: "/devices/iPhone Air.png",
  framePngWidth: 1095,
  framePngHeight: 2285,
  screenLeftFraction: 0.043836,
  screenTopFraction: 0.025383,
  screenWidthFraction: 0.912329,
  screenHeightFraction: 0.949234,
  screenRadiusFraction: 0.127302,
  statusBarSrc: "/status-bar/iPhone 16 and 16 Plus Status Bar Black.png",
  statusBarHeightFraction: 0.068964,
};

interface IPhoneAirProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhoneAir({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: IPhoneAirProps) {
  return (
    <DeviceMockup
      device={IPHONE_AIR}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
