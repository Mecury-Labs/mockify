import DeviceMockup, { type DeviceConfig } from "../device-mockup";

export const IPHONE_15_PLUS: DeviceConfig = {
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
  colors: [
    { name: "Black", frameSrc: "/devices/iPhone 15 Plus - Black.png", swatch: "#3E3C39" },
    { name: "Blue", frameSrc: "/devices/iPhone 15 Plus - Blue.png", swatch: "#D6E3EE" },
    { name: "Green", frameSrc: "/devices/iPhone 15 Plus - Green.png", swatch: "#D0E4CE" },
    { name: "Pink", frameSrc: "/devices/iPhone 15 Plus - Pink.png", swatch: "#F4D4D0" },
    { name: "Yellow", frameSrc: "/devices/iPhone 15 Plus - Yellow.png", swatch: "#F4E8B8" },
  ],
  defaultColor: "Black",
};

interface IPhone15PlusProps {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
  color?: string;
}

export default function IPhone15Plus({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
  color,
}: IPhone15PlusProps) {
  return (
    <DeviceMockup
      device={IPHONE_15_PLUS}
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
