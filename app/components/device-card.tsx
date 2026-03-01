"use client";

import { useEffect, useRef, useState } from "react";
import DeviceMockup, { type DeviceConfig } from "./device-mockup";
import MockupCanvas, { type CanvasPosition } from "./mockup-canvas";

const ZOOM_LEVELS = [0.5, 0.75, 0.9, 1, 1.25, 1.5, 1.75, 2] as const;

const POSITIONS: { value: CanvasPosition; label: string; icon: string }[] = [
  { value: "top", label: "Top", icon: "\u2191" },
  { value: "center", label: "Center", icon: "\u00B7" },
  { value: "bottom", label: "Bottom", icon: "\u2193" },
];

/** Preset canvas background colors (null = transparent/checkered) */
const CANVAS_BG_PRESETS: { value: string | null; swatch: string; label: string }[] = [
  { value: null, swatch: "transparent", label: "Transparent" },
  { value: "#ffffff", swatch: "#ffffff", label: "White" },
  { value: "#000000", swatch: "#000000", label: "Black" },
  { value: "#0A84FF", swatch: "#0A84FF", label: "Blue" },
  { value: "#FF3B30", swatch: "#FF3B30", label: "Red" },
  { value: "#FF9500", swatch: "#FF9500", label: "Orange" },
  { value: "#34C759", swatch: "#34C759", label: "Green" },
  { value: "#AF52DE", swatch: "#AF52DE", label: "Purple" },
];

/** At 1x zoom the device width is 47% of the canvas width */
const BASE_DEVICE_RATIO = 0.47;

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#adadad]"
    style={{ width: 32, height: 32 }}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const ScreenPlaceholder = () => (
  <button
    className="absolute inset-0 w-full h-full bg-[#f2f2f2] hover:opacity-70 flex items-center justify-center cursor-pointer"
    style={{ transition: "opacity 150ms ease" }}
  >
    <PlusIcon />
  </button>
);

function formatZoom(z: number) {
  return z === 1 ? "1x" : `${z}x`;
}

interface DeviceCardProps {
  name: string;
  config: DeviceConfig;
}

export default function DeviceCard({ name, config }: DeviceCardProps) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    config.defaultColor
  );
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState<CanvasPosition>("center");
  const [canvasBg, setCanvasBg] = useState<string | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const hasColors = config.colors.length > 0;

  // Observe canvas width to compute device pixel size
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCanvasWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    // Initial measurement
    setCanvasWidth(el.offsetWidth);

    return () => ro.disconnect();
  }, []);

  const deviceWidth = canvasWidth * BASE_DEVICE_RATIO * zoom;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Canvas with device inside */}
      <MockupCanvas ref={canvasRef} position={position} backgroundColor={canvasBg}>
        {canvasWidth > 0 && (
          <div
            style={{
              transition: "transform 250ms cubic-bezier(0.77, 0, 0.175, 1)",
              willChange: "transform",
            }}
          >
            <DeviceMockup
              device={config}
              width={deviceWidth}
              color={selectedColor}
            >
              <ScreenPlaceholder />
            </DeviceMockup>
          </div>
        )}
      </MockupCanvas>

      <span className="text-xs font-medium text-zinc-500">{name}</span>

      {/* Color picker */}
      {hasColors && (
        <div className="flex items-center gap-1.5">
          {config.colors.map((variant) => {
            const isActive = selectedColor === variant.name;
            return (
              <button
                key={variant.name}
                title={variant.name}
                onClick={() => setSelectedColor(variant.name)}
                className="relative flex items-center justify-center cursor-pointer touch-hitbox"
                style={{
                  width: 18,
                  height: 18,
                }}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: "1.5px solid #999",
                    }}
                  />
                )}
                <span
                  className="rounded-full"
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: variant.swatch,
                    border: "0.5px solid rgba(0,0,0,0.12)",
                  }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Zoom controls */}
      <div className="grid grid-cols-4 gap-1 w-full max-w-[200px]">
        {ZOOM_LEVELS.map((level) => {
          const isActive = zoom === level;
          return (
            <button
              key={level}
              onClick={() => setZoom(level)}
              className="cursor-pointer text-[11px] font-medium py-1 rounded-md"
              style={{
                transition: "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
                backgroundColor: isActive ? "#1d1d1f" : "#ffffff",
                color: isActive ? "#ffffff" : "#6e6e73",
                border: isActive ? "none" : "1px solid #d2d2d7",
              }}
            >
              {formatZoom(level)}
            </button>
          );
        })}
      </div>

      {/* Position controls */}
      <div className="grid grid-cols-3 gap-1 w-full max-w-[200px]">
        {POSITIONS.map(({ value, label, icon }) => {
          const isActive = position === value;
          return (
            <button
              key={value}
              onClick={() => setPosition(value)}
              className="cursor-pointer text-[11px] font-medium py-1 rounded-md"
              style={{
                transition: "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
                backgroundColor: isActive ? "#1d1d1f" : "#ffffff",
                color: isActive ? "#ffffff" : "#6e6e73",
                border: isActive ? "none" : "1px solid #d2d2d7",
              }}
            >
              {icon} {label}
            </button>
          );
        })}
      </div>

      {/* Canvas background color */}
      <div className="flex items-center gap-1.5">
        {CANVAS_BG_PRESETS.map((preset) => {
          const isActive = canvasBg === preset.value;
          const isTransparent = preset.value === null;
          return (
            <button
              key={preset.label}
              title={preset.label}
              onClick={() => setCanvasBg(preset.value)}
              className="relative flex items-center justify-center cursor-pointer touch-hitbox"
              style={{ width: 18, height: 18 }}
            >
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1.5px solid #999" }}
                />
              )}
              <span
                className="rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: isTransparent ? undefined : preset.swatch,
                  border: "0.5px solid rgba(0,0,0,0.12)",
                  ...(isTransparent
                    ? {
                        backgroundImage: [
                          "linear-gradient(45deg, #ccc 25%, transparent 25%)",
                          "linear-gradient(-45deg, #ccc 25%, transparent 25%)",
                          "linear-gradient(45deg, transparent 75%, #ccc 75%)",
                          "linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                        ].join(", "),
                        backgroundSize: "6px 6px",
                        backgroundPosition:
                          "0px 0px, 0px 3px, 3px -3px, -3px 0px",
                      }
                    : {}),
                }}
              />
            </button>
          );
        })}

        {/* Custom color picker */}
        <button
          title="Custom color"
          onClick={() => colorInputRef.current?.click()}
          className="relative flex items-center justify-center cursor-pointer touch-hitbox"
          style={{ width: 18, height: 18 }}
        >
          {/* Show ring if current bg is a custom color (not in presets) */}
          {canvasBg !== null &&
            !CANVAS_BG_PRESETS.some((p) => p.value === canvasBg) && (
              <span
                className="absolute inset-0 rounded-full"
                style={{ border: "1.5px solid #999" }}
              />
            )}
          <span
            className="rounded-full"
            style={{
              width: 12,
              height: 12,
              background:
                "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
              border: "0.5px solid rgba(0,0,0,0.12)",
            }}
          />
        </button>
        <input
          ref={colorInputRef}
          type="color"
          className="sr-only"
          value={canvasBg ?? "#ffffff"}
          onChange={(e) => setCanvasBg(e.target.value)}
        />
      </div>
    </div>
  );
}
