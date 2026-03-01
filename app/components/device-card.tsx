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
  <button className="absolute inset-0 w-full h-full bg-[#f2f2f2] hover:opacity-70 transition-opacity flex items-center justify-center cursor-pointer">
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
  const [canvasWidth, setCanvasWidth] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

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
      <MockupCanvas ref={canvasRef} position={position}>
        {canvasWidth > 0 && (
          <div
            style={{ transition: "transform 0.3s ease-out" }}
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
                className="relative flex items-center justify-center cursor-pointer"
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
              className="cursor-pointer text-[11px] font-medium py-1 rounded-md transition-colors"
              style={{
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
              className="cursor-pointer text-[11px] font-medium py-1 rounded-md transition-colors"
              style={{
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
    </div>
  );
}
