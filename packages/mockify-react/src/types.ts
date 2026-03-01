/** A single color variant for a device. */
export interface DeviceColorVariant {
  /** Human-readable color name, e.g. "Natural Titanium" */
  name: string;
  /** Path to the frame PNG for this color (relative to basePath) */
  frameSrc: string;
  /** CSS hex color for the UI swatch */
  swatch: string;
}

/** Configuration for a device model. Contains all frame geometry and color variants. */
export interface DeviceConfig {
  /** Display name, e.g. "iPhone 16 Pro" */
  name: string;
  /** Default frame PNG path (relative to basePath) */
  frameSrc: string;
  /** Native width of the frame PNG in pixels */
  framePngWidth: number;
  /** Native height of the frame PNG in pixels */
  framePngHeight: number;
  /** Screen left offset as a fraction of frame width (0–1) */
  screenLeftFraction: number;
  /** Screen top offset as a fraction of frame height (0–1) */
  screenTopFraction: number;
  /** Screen width as a fraction of frame width (0–1) */
  screenWidthFraction: number;
  /** Screen height as a fraction of frame height (0–1) */
  screenHeightFraction: number;
  /** Screen corner radius as a fraction of frame width (0–1) */
  screenRadiusFraction: number;
  /** Status bar PNG path (relative to basePath) */
  statusBarSrc: string;
  /** Status bar height as a fraction of screen height (0–1) */
  statusBarHeightFraction: number;
  /** Available color variants. Empty array = single-color device. */
  colors: DeviceColorVariant[];
  /** Default color name. Must match one of colors[].name. */
  defaultColor?: string;
}

/** Props for the DeviceMockup component. */
export interface DeviceMockupProps {
  /** Device configuration object */
  device: DeviceConfig;
  /** Content to render inside the phone screen */
  children?: React.ReactNode;
  /** Rendered width in pixels. @default 320 */
  width?: number;
  /** Screen background color when no children are provided. @default "#f2f2f2" */
  screenColor?: string;
  /** Show the status bar overlay. @default true */
  showStatusBar?: boolean;
  /** Additional CSS class for the outer wrapper */
  className?: string;
  /** Inline styles for the outer wrapper */
  style?: React.CSSProperties;
  /** Color variant name. Falls back to defaultColor, then frameSrc. */
  color?: string;
  /**
   * Base path for device frame and status bar assets.
   * @default "/mockify"
   * @example "/mockify" resolves to "/mockify/devices/iPhone 16 Pro - Natural Titanium.png"
   */
  basePath?: string;
}
