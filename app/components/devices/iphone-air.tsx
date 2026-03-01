import DeviceMockup, { type DeviceConfig } from "../device-mockup";

/**
 * iPhone Air device configuration.
 *
 * Frame PNG: 1380 x 2880 (Apple Design Resources)
 */
export const IPHONE_AIR: DeviceConfig = {
  name: "iPhone Air",
  frameSrc: "/devices/iPhone Air - Sky Blue.png",
  framePngWidth: 1380,
  framePngHeight: 2880,
  screenLeftFraction: 0.044928,
  screenTopFraction: 0.025694,
  screenWidthFraction: 0.909420,
  screenHeightFraction: 0.948264,
  screenRadiusFraction: 0.143478,
  statusBarSrc: "/status-bar/iPhone 16 and 16 Plus Status Bar Black.png",
  statusBarHeightFraction: 0.068964,
  colors: [
    { name: "Sky Blue", frameSrc: "/devices/iPhone Air - Sky Blue.png", swatch: "#A8C8D8" },
    { name: "Cloud White", frameSrc: "/devices/iPhone Air - Cloud White.png", swatch: "#F5F5F0" },
    { name: "Light Gold", frameSrc: "/devices/iPhone Air - Light Gold.png", swatch: "#E8D8C0" },
    { name: "Space Black", frameSrc: "/devices/iPhone Air - Space Black.png", swatch: "#3B3B3D" },
  ],
  defaultColor: "Sky Blue",
};

interface IPhoneAirProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhoneAir({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhoneAirProps) {
  return (
    <DeviceMockup
      device={IPHONE_AIR}
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
