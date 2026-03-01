# Mockify

Ultra-realistic iPhone device mockups for React. Built with official Apple Design Resources — not recreations.

[![npm](https://img.shields.io/npm/v/@mockifydev/react)](https://www.npmjs.com/package/@mockifydev/react)
[![license](https://img.shields.io/npm/l/@mockifydev/react)](https://github.com/Mecury-Labs/mockify/blob/main/LICENSE)

---

## Why Mockify?

Every mockup tool uses fake device frames. Mockify uses the **real ones** — official Apple Design Resources PNGs with pixel-perfect proportions. One component, zero design skills needed.

- **20 iPhone models** — iPhone 13 through iPhone 17, including Air
- **76 color variants** — every finish Apple actually ships
- **One component** — `<DeviceMockup />` handles everything
- **CDN by default** — works out of the box, no asset setup
- **Fraction-based scaling** — renders crisp at any size
- **Zero dependencies** — just React

---

## Quick Start

### Install

```bash
npm install @mockifydev/react
```

### Use

```tsx
import { DeviceMockup, iPhone17Pro } from "@mockifydev/react";

export default function App() {
  return (
    <DeviceMockup device={iPhone17Pro} color="Cosmic Orange" width={380}>
      <img
        src="/screenshot.png"
        alt="App screenshot"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </DeviceMockup>
  );
}
```

That's it. The frame PNG loads from a CDN, the screen content fills the device screen, and everything scales proportionally.

---

## Devices

### iPhone 17 Series

| Config | Colors |
|--------|--------|
| `iPhone17` | Black, White, Lavender, Mist Blue, Sage |
| `iPhone17Pro` | Silver, Cosmic Orange, Deep Blue |
| `iPhone17ProMax` | Silver, Cosmic Orange, Deep Blue |
| `iPhoneAir` | Sky Blue, Cloud White, Light Gold, Space Black |

### iPhone 16 Series

| Config | Colors |
|--------|--------|
| `iPhone16` | Black, White, Teal, Pink, Ultramarine |
| `iPhone16Plus` | Black, White, Teal, Pink, Ultramarine |
| `iPhone16Pro` | Natural Titanium, Black Titanium, White Titanium, Desert Titanium |
| `iPhone16ProMax` | Natural Titanium, Black Titanium, White Titanium, Desert Titanium |

### iPhone 15 Series

| Config | Colors |
|--------|--------|
| `iPhone15` | Black, Blue, Green, Pink, Yellow |
| `iPhone15Plus` | Black, Blue, Green, Pink, Yellow |
| `iPhone15Pro` | Natural Titanium, Blue Titanium, White Titanium, Black Titanium |
| `iPhone15ProMax` | Natural Titanium, Blue Titanium, White Titanium, Black Titanium |

### iPhone 14 Series

| Config | Colors |
|--------|--------|
| `iPhone14` | Midnight, Starlight, Blue, Purple, Red |
| `iPhone14Plus` | Midnight, Starlight, Blue, Purple, Red |
| `iPhone14Pro` | Space Black, Silver, Gold, Deep Purple |
| `iPhone14ProMax` | Space Black, Silver, Gold, Deep Purple |

### iPhone 13 Series

| Config | Colors |
|--------|--------|
| `iPhone13` | Midnight, Starlight |
| `iPhone13Mini` | Midnight, Starlight |
| `iPhone13Pro` | Graphite, Silver |
| `iPhone13ProMax` | Graphite, Silver |

---

## API Reference

### `<DeviceMockup />`

The core component. Renders a device frame around your content.

```tsx
import { DeviceMockup, iPhone16Pro } from "@mockifydev/react";
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `device` | `DeviceConfig` | *required* | Device configuration object |
| `children` | `ReactNode` | — | Content to render inside the screen |
| `width` | `number` | `320` | Rendered width in pixels. Height scales automatically. |
| `color` | `string` | Device default | Color variant name (e.g. `"Cosmic Orange"`) |
| `screenColor` | `string` | `"#f2f2f2"` | Background color when no children provided |
| `showStatusBar` | `boolean` | `true` | Show the iOS status bar overlay |
| `basePath` | `string` | unpkg CDN | Base URL for frame assets |
| `className` | `string` | `""` | CSS class for the outer wrapper |
| `style` | `CSSProperties` | — | Inline styles for the outer wrapper |

### `DeviceConfig`

Each device export (e.g. `iPhone17Pro`) is a `DeviceConfig` object:

```typescript
interface DeviceConfig {
  name: string;                    // "iPhone 17 Pro"
  frameSrc: string;                // Default frame PNG path
  framePngWidth: number;           // Native PNG width
  framePngHeight: number;          // Native PNG height
  screenLeftFraction: number;      // Screen position (0–1)
  screenTopFraction: number;
  screenWidthFraction: number;
  screenHeightFraction: number;
  screenRadiusFraction: number;    // Corner radius
  statusBarSrc: string;            // Status bar PNG path
  statusBarHeightFraction: number;
  colors: DeviceColorVariant[];    // Available color variants
  defaultColor?: string;           // Default color name
}
```

### `allDevices`

An array of all 20 `DeviceConfig` objects, useful for building device pickers:

```tsx
import { allDevices } from "@mockifydev/react";

allDevices.map((device) => <option key={device.name}>{device.name}</option>);
```

---

## Examples

### Basic Screenshot

```tsx
<DeviceMockup device={iPhone16} width={300}>
  <img src="/app-screenshot.png" alt="App" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
</DeviceMockup>
```

### With Color Variant

```tsx
<DeviceMockup device={iPhone17Pro} color="Deep Blue" width={380}>
  <img src="/screenshot.png" alt="App" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
</DeviceMockup>
```

### Live Content

```tsx
<DeviceMockup device={iPhoneAir} color="Sky Blue" width={360}>
  <iframe
    src="https://your-app.com"
    style={{ width: "100%", height: "100%", border: "none" }}
  />
</DeviceMockup>
```

### No Status Bar

```tsx
<DeviceMockup device={iPhone15Pro} showStatusBar={false} width={320}>
  {children}
</DeviceMockup>
```

### Custom Background

```tsx
<DeviceMockup device={iPhone14} screenColor="#000000" width={320} />
```

---

## Self-Hosting Assets

By default, frame PNGs load from the unpkg CDN. To self-host:

```bash
npx @mockifydev/react init
```

This copies all device frame and status bar PNGs to `public/mockify/`. Then set the `basePath` prop:

```tsx
<DeviceMockup device={iPhone17Pro} basePath="/mockify" width={380}>
  {children}
</DeviceMockup>
```

You can customize the destination:

```bash
npx @mockifydev/react init --dest public/assets/mockify
```

---

## How It Works

Mockify uses a 3-layer compositing approach:

```
Layer 3 (z:20)  →  Device frame PNG (pointer-events: none)
Layer 2 (z:10)  →  Status bar PNG overlay
Layer 1 (z:10)  →  Screen content (your children)
```

1. **Screen content** is positioned inside a `<div>` that aligns exactly with the transparent area in the frame PNG. Rounded corners and `overflow: hidden` clip the content to the screen shape.

2. **Status bar** is a real iOS status bar PNG rendered on top of the screen content.

3. **Device frame** is a transparent PNG with only the physical body (titanium/aluminum, bezels, buttons, Dynamic Island). The screen area is transparent, so your content shows through.

All positioning uses **fractions** of the frame dimensions, so mockups scale to any render width while maintaining pixel-perfect alignment.

---

## Project Structure

```
mockify/
├── app/                          # Next.js playground app
│   ├── components/
│   │   ├── device-mockup.tsx     # Playground renderer
│   │   ├── devices/              # 20 device config files
│   │   ├── mockup-editor.tsx     # Interactive editor UI
│   │   └── code-modal.tsx        # Code generation modal
│   └── page.tsx
├── packages/
│   └── mockify-react/            # npm package (@mockifydev/react)
│       ├── src/
│       │   ├── index.ts          # Package exports
│       │   ├── device-mockup.tsx # Core component
│       │   ├── types.ts          # TypeScript interfaces
│       │   └── devices/          # All device configs
│       ├── assets/               # Frame PNGs (bundled in package)
│       └── bin/cli.mjs           # npx init CLI
└── public/
    ├── devices/                  # Frame PNGs for playground
    └── status-bar/               # Status bar PNGs
```

---

## Development

```bash
# Clone
git clone https://github.com/Mecury-Labs/mockify.git
cd mockify

# Install
pnpm install

# Run the playground
pnpm dev

# Build the npm package
cd packages/mockify-react
pnpm build
```

---

## Contributing

Contributions are welcome. If you'd like to add a new device, see [docs/device-mockups.md](docs/device-mockups.md) for the full guide on measuring frame proportions and creating device configs.

---

## License

MIT

---

Built by [Mecury Labs](https://github.com/Mecury-Labs)
