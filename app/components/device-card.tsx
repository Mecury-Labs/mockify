"use client";

import { useState } from "react";
import DeviceMockup, { type DeviceConfig } from "./device-mockup";

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

interface DeviceCardProps {
  name: string;
  config: DeviceConfig;
}

export default function DeviceCard({ name, config }: DeviceCardProps) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    config.defaultColor
  );

  const hasColors = config.colors.length > 0;

  return (
    <div className="flex flex-col items-center gap-3">
      <DeviceMockup device={config} width={200} color={selectedColor}>
        <ScreenPlaceholder />
      </DeviceMockup>

      <span className="text-xs font-medium text-zinc-500">{name}</span>

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
                {/* Active ring */}
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: "1.5px solid #999",
                    }}
                  />
                )}
                {/* Color swatch */}
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
    </div>
  );
}
