"use client";

import { useState } from "react";
import DeviceMockup, { type DeviceConfig } from "./device-mockup";

const ZOOM_LEVELS = [0.5, 0.75, 0.9, 1, 1.25, 1.5, 1.75, 2] as const;
const BASE_WIDTH = 200;

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
  if (z === 1) return "1x";
  if (z === 0.5) return "0.5x";
  if (z === 0.75) return "0.75x";
  if (z === 0.9) return "0.9x";
  if (z === 1.25) return "1.25x";
  if (z === 1.5) return "1.5x";
  if (z === 1.75) return "1.75x";
  if (z === 2) return "2x";
  return `${z}x`;
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

  const hasColors = config.colors.length > 0;
  const deviceWidth = BASE_WIDTH * zoom;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Device container — scales with zoom */}
      <div
        className="flex items-center justify-center"
        style={{
          width: BASE_WIDTH * 2 + 16,
          height: (BASE_WIDTH * 2 + 16) * (config.framePngHeight / config.framePngWidth),
          overflow: "hidden",
        }}
      >
        <DeviceMockup device={config} width={deviceWidth} color={selectedColor}>
          <ScreenPlaceholder />
        </DeviceMockup>
      </div>

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
    </div>
  );
}
