# Device Mockup System

## Overview

Mockify renders ultra-realistic iPhone mockups by layering a real device frame PNG on top of user content. This is the same technique used by [mockup.60fps.design](https://mockup.60fps.design).

## Architecture

```
app/components/
  device-mockup.tsx              # Shared base renderer (all devices use this)
  devices/
    iphone-13.tsx                # One file per device model
    iphone-13-mini.tsx
    iphone-16-pro.tsx
    ...
public/
  devices/                       # Transparent device frame PNGs
    iPhone 16.png
    iPhone 15 Pro Max.png
    ...
  status-bar/                    # Status bar overlay PNGs
    iPhone 16 and 16 Plus Status Bar Black.png
    iPhone 16 Pro and 16 Max Status Bar Black.png
    Notch Status Bar Black.png
```

### Rendering Layers

The mockup renders 3 layers stacked with z-index:

```
Layer 3 (z:20) - Device frame PNG (pointer-events: none)
Layer 2 (z:10) - Status bar PNG overlay
Layer 1 (z:10) - Screen content div (user content goes here)
```

1. **Screen content area** (`z-index: 10`) - A `<div>` positioned to align exactly with the transparent hole in the frame PNG. Has rounded corners, `overflow: hidden`, and the user's `children` rendered inside.
2. **Status bar overlay** - A PNG image rendered on top of the screen content showing time, signal bars, wifi, and battery.
3. **Device frame PNG** (`z-index: 20`) - A transparent PNG with only the device's physical frame (titanium/aluminum body, bezel, side buttons, notch/Dynamic Island). The screen area is transparent so content shows through. `pointer-events: none` so clicks pass through to the screen.

### DeviceConfig Interface

Every device is defined by a `DeviceConfig` object:

```typescript
interface DeviceConfig {
  name: string;                    // e.g. "iPhone 16 Pro"
  frameSrc: string;                // "/devices/iPhone 16 Pro.png"
  framePngWidth: number;           // Native PNG width (e.g. 1071)
  framePngHeight: number;          // Native PNG height (e.g. 2190)
  screenLeftFraction: number;      // Screen left edge / frame width
  screenTopFraction: number;       // Screen top edge / frame height
  screenWidthFraction: number;     // Screen width / frame width
  screenHeightFraction: number;    // Screen height / frame height
  screenRadiusFraction: number;    // Corner radius / frame width
  statusBarSrc: string;            // Path to status bar PNG
  statusBarHeightFraction: number; // Status bar height / screen height
}
```

All dimensions are expressed as **fractions** of the frame PNG dimensions, so the mockup scales to any render size.

### Per-Device Component

Each device file is a thin wrapper that provides the config:

```typescript
import DeviceMockup, { type DeviceConfig } from "../device-mockup";

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

export default function IPhone16({ children, width = 320, ...props }) {
  return (
    <DeviceMockup device={IPHONE_16} width={width} {...props}>
      {children}
    </DeviceMockup>
  );
}
```

## How to Add a New Device

### Step 1: Get the device frame PNG

You need a transparent PNG of the device frame (just the body/bezel, screen area transparent).

**Sources:**
- **iPhone 16/17/Air:** Download from `https://mockup.60fps.design/devices/{Device Name}.png`
- **iPhone 13-15:** Download from Apple's Design Resources at `https://developer.apple.com/design/resources/` (Product Bezels section). These come as `.dmg` files containing PNGs in `PNG/{Device Name}/` folders.

Place the frame PNG in `public/devices/`.

### Step 2: Get the screen proportions

There are two methods depending on the frame source.

#### Method A: From 60fps.design (iPhone 16/17)

If you have the HTML from 60fps.design's inspector, extract the values from their markup:

```html
<!-- The screen content div -->
<div style="left: 118px; top: 8px; width: 187px; height: 406px; border-radius: 26.093px; ...">

<!-- The frame image -->
<img style="left: 106px; top: 0px; width: 210px; height: 423px; z-index: 20; ...">
```

Then calculate:

```python
# Frame rendered dimensions
frame_w, frame_h = 210, 423

# Screen position relative to frame
screen_left = 118 - 106  # screen left abs - frame left abs = 12
screen_top = 8 - 0       # screen top abs - frame top abs = 8
screen_w = 187
screen_h = 406
screen_radius = 26.093

# Convert to fractions
screenLeftFraction   = screen_left / frame_w    # 12/210 = 0.057143
screenTopFraction    = screen_top / frame_h     # 8/423  = 0.018913
screenWidthFraction  = screen_w / frame_w       # 187/210 = 0.890476
screenHeightFraction = screen_h / frame_h       # 406/423 = 0.959811
screenRadiusFraction = screen_radius / frame_w  # 26.093/210 = 0.124252
```

For the status bar, extract the height from the `<img>` style:

```python
status_bar_height = 28  # from the HTML
statusBarHeightFraction = status_bar_height / screen_h  # 28/406 = 0.068966
```

#### Method B: From Apple bezels (iPhone 13-15)

Apple's PNG frames have the screen area as fully transparent pixels (alpha=0). Use Python to measure:

```python
from PIL import Image
import numpy as np

img = Image.open("public/devices/iPhone 15.png")
arr = np.array(img)
alpha = arr[:, :, 3]
w, h = img.size

# Scan at 60% height for left/right edges (avoids notch)
scan_y = int(h * 0.6)
row = alpha[scan_y, :]

# Left: find first opaque pixel, then first transparent pixel + 2px margin
screen_left = 0
found = False
for x in range(w):
    if not found and row[x] > 200:
        found = True
    elif found and row[x] < 5:
        screen_left = x + 2  # safety margin
        break

# Right: same from the other side
screen_right = w - 1
found = False
for x in range(w - 1, -1, -1):
    if not found and row[x] > 200:
        found = True
    elif found and row[x] < 5:
        screen_right = x - 2
        break

# Top: scan at 15% from left (avoids the notch at center)
scan_x = int(w * 0.15)
col = alpha[:, scan_x]
screen_top = 0
found = False
for y in range(h):
    if not found and col[y] > 200:
        found = True
    elif found and col[y] < 5:
        screen_top = y + 2
        break

# Bottom: scan at center (no notch at bottom)
col_c = alpha[:, w // 2]
screen_bottom = h - 1
found = False
for y in range(h - 1, -1, -1):
    if not found and col_c[y] > 200:
        found = True
    elif found and col_c[y] < 5:
        screen_bottom = y - 2
        break

screen_w_px = screen_right - screen_left + 1
screen_h_px = screen_bottom - screen_top + 1

print(f"screenLeftFraction:   {screen_left / w}")
print(f"screenTopFraction:    {screen_top / h}")
print(f"screenWidthFraction:  {screen_w_px / w}")
print(f"screenHeightFraction: {screen_h_px / h}")
```

**Important: the +2px safety margin.** Apple's bezels have anti-aliased edges. Without the margin, the screen content can bleed through semi-transparent frame pixels at the edges. Always add 2px inward.

For the corner radius, use the known device specs:

```python
# Known corner radii (in CSS points):
# iPhone 13/14: 47.33pt (@3x = 142px device pixels)
# iPhone 13 Mini: 44pt (@3x = 132px)
# iPhone 13 Pro Max / 14 Plus: 53.33pt (@3x = 160px)
# iPhone 14 Pro+, 15, 16: 55pt (@3x = 165px)

radius_device_px = corner_radius_pts * 3  # @3x scale
png_scale = screen_w_px / device_native_screen_width  # e.g. 1170/1170 = 1.0
radius_png_px = radius_device_px * png_scale
screenRadiusFraction = radius_png_px / png_width
```

### Step 3: Choose the status bar

| Device type | Status bar asset |
|-------------|-----------------|
| Notch (iPhone 13, 13 Mini, 13 Pro, 13 Pro Max, 14, 14 Plus) | `/status-bar/Notch Status Bar Black.png` |
| Dynamic Island non-Pro (iPhone 15, 15 Plus, 16, 16 Plus, 17, Air) | `/status-bar/iPhone 16 and 16 Plus Status Bar Black.png` |
| Dynamic Island Pro (iPhone 14 Pro+, 15 Pro+, 16 Pro+, 17 Pro+) | `/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png` |

The `statusBarHeightFraction` is typically:
- Notch devices: `0.055`
- Dynamic Island (from 60fps): use the exact value from their HTML (`height / screen_h`)
- Dynamic Island (Apple bezels): `0.065`

### Step 4: Create the component file

Create `app/components/devices/iphone-{model}.tsx`:

```typescript
import DeviceMockup, { type DeviceConfig } from "../device-mockup";

const DEVICE: DeviceConfig = {
  name: "iPhone XX",
  frameSrc: "/devices/iPhone XX.png",
  framePngWidth: XXXX,
  framePngHeight: XXXX,
  screenLeftFraction: X.XXXXXX,
  screenTopFraction: X.XXXXXX,
  screenWidthFraction: X.XXXXXX,
  screenHeightFraction: X.XXXXXX,
  screenRadiusFraction: X.XXXXXX,
  statusBarSrc: "/status-bar/XXXX.png",
  statusBarHeightFraction: X.XXXXXX,
};

interface Props {
  children?: React.ReactNode;
  width?: number;
  screenColor?: string;
  showStatusBar?: boolean;
  className?: string;
}

export default function IPhoneXX({
  children,
  width = 320,
  screenColor = "#f2f2f2",
  showStatusBar = true,
  className = "",
}: Props) {
  return (
    <DeviceMockup
      device={DEVICE}
      width={width}
      screenColor={screenColor}
      showStatusBar={showStatusBar}
      className={className}
    >
      {children}
    </DeviceMockup>
  );
}
```

### Step 5: Use it

```tsx
import IPhoneXX from "./components/devices/iphone-xx";

<IPhoneXX width={340}>
  <div className="w-full h-full bg-white flex items-center justify-center">
    Your screen content
  </div>
</IPhoneXX>
```

The `width` prop controls the rendered device width in pixels. Height is calculated automatically from the frame aspect ratio.

## Common Pitfalls

### Screen content bleeds outside the frame
The screen proportions are wrong. Re-measure using the pixel analysis method with the 2px safety margin. Scan at 60% height (not center) for left/right to avoid the notch.

### Status bar looks clipped or misaligned
The status bar uses `width: calc(100% + 4px)` and `left: -2px` to slightly overshoot the screen width. This prevents hairline gaps at the edges. The `object-position: center 48%` vertically centers the status bar content. Don't change these values.

### Notch area shows screen content
For notch devices (iPhone 13, 14), the notch is part of the frame PNG (opaque). The screen content extends behind it but is hidden by the frame layer on top (`z-index: 20`). This is correct behavior.

### Frame looks blurry at small sizes
The frame PNGs are high-resolution (1000-1500px wide). When rendered at 200px, the browser downscales them. Use `unoptimized` on the Next.js `Image` component to prevent additional compression.

## Device Inventory

### iPhone 17 Series
| Device | Frame Source | Status Bar |
|--------|-------------|------------|
| iPhone 17 | 60fps.design | 16 and 16 Plus |
| iPhone 17 Pro | 60fps.design | 16 Pro and 16 Max |
| iPhone 17 Pro Max | 60fps.design | 16 Pro and 16 Max |
| iPhone Air | 60fps.design | 16 and 16 Plus |

### iPhone 16 Series
| Device | Frame Source | Status Bar |
|--------|-------------|------------|
| iPhone 16 | 60fps.design | 16 and 16 Plus |
| iPhone 16 Plus | 60fps.design | 16 and 16 Plus |
| iPhone 16 Pro | 60fps.design | 16 Pro and 16 Max |
| iPhone 16 Pro Max | 60fps.design | 16 Pro and 16 Max |

### iPhone 15 Series
| Device | Frame Source | Status Bar |
|--------|-------------|------------|
| iPhone 15 | Apple Design Resources | 16 and 16 Plus |
| iPhone 15 Plus | Apple Design Resources | 16 and 16 Plus |
| iPhone 15 Pro | Apple Design Resources | 16 Pro and 16 Max |
| iPhone 15 Pro Max | Apple Design Resources | 16 Pro and 16 Max |

### iPhone 14 Series
| Device | Frame Source | Status Bar |
|--------|-------------|------------|
| iPhone 14 | Apple Design Resources | Notch |
| iPhone 14 Plus | Apple Design Resources | Notch |
| iPhone 14 Pro | Apple Design Resources | 16 Pro and 16 Max |
| iPhone 14 Pro Max | Apple Design Resources | 16 Pro and 16 Max |

### iPhone 13 Series
| Device | Frame Source | Status Bar |
|--------|-------------|------------|
| iPhone 13 | Apple Design Resources | Notch |
| iPhone 13 Mini | Apple Design Resources | Notch |
| iPhone 13 Pro | Apple Design Resources | Notch |
| iPhone 13 Pro Max | Apple Design Resources | Notch |
