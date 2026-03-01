"use client";

import { useEffect, useRef, useState } from "react";
import DeviceMockup, { type DeviceConfig } from "./device-mockup";
import MockupCanvas, { type CanvasPosition } from "./mockup-canvas";

/* ── Constants ── */

const CANVAS_BG_PRESETS: {
  value: string | null;
  swatch: string;
  label: string;
}[] = [
  { value: null, swatch: "transparent", label: "Transparent" },
  { value: "#ffffff", swatch: "#ffffff", label: "White" },
  { value: "#000000", swatch: "#000000", label: "Black" },
  { value: "#0A84FF", swatch: "#0A84FF", label: "Blue" },
  { value: "#FF3B30", swatch: "#FF3B30", label: "Red" },
  { value: "#FF9500", swatch: "#FF9500", label: "Orange" },
  { value: "#34C759", swatch: "#34C759", label: "Green" },
  { value: "#AF52DE", swatch: "#AF52DE", label: "Purple" },
];

const BASE_DEVICE_RATIO = 0.47;

/* ── Icons ── */

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#adadad]"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1)",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <polyline points="6 9 12 15 18 9" />
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

/* ── Types ── */

export interface DeviceEntry {
  name: string;
  config: DeviceConfig;
}

interface MockupEditorProps {
  devices: DeviceEntry[];
}

/* ── Component ── */

export default function MockupEditor({ devices }: MockupEditorProps) {
  // Device selection
  const [deviceIndex, setDeviceIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = devices[deviceIndex];
  const config = current.config;

  // Device color
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    config.defaultColor
  );

  // Canvas background
  const [canvasBg, setCanvasBg] = useState<string | null>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  // Canvas sizing
  const [canvasWidth, setCanvasWidth] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Reset color when device changes
  useEffect(() => {
    setSelectedColor(config.defaultColor);
  }, [config]);

  // Observe canvas width
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCanvasWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    setCanvasWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const deviceWidth = canvasWidth * BASE_DEVICE_RATIO;
  const hasColors = config.colors.length > 0;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      {/* Single canvas */}
      <MockupCanvas
        ref={canvasRef}
        position="center"
        backgroundColor={canvasBg}
      >
        {canvasWidth > 0 && (
          <div
            style={{
              transition:
                "transform 250ms cubic-bezier(0.77, 0, 0.175, 1)",
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

      {/* Floating toolbar */}
      <div
        className="w-full rounded-xl px-4 py-3 flex flex-wrap items-center gap-4 justify-center"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e5e5",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        {/* Device selector dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium"
            style={{
              backgroundColor: "#f5f5f7",
              color: "#1d1d1f",
              transition:
                "background-color 150ms ease",
            }}
          >
            {current.name}
            <ChevronIcon open={dropdownOpen} />
          </button>

          {dropdownOpen && (
            <div
              className="absolute bottom-full left-0 mb-2 w-56 rounded-xl overflow-hidden"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e5e5",
                boxShadow:
                  "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                maxHeight: 320,
                overflowY: "auto",
                zIndex: 50,
              }}
            >
              {devices.map((d, i) => {
                const isActive = i === deviceIndex;
                return (
                  <button
                    key={d.name}
                    onClick={() => {
                      setDeviceIndex(i);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs cursor-pointer"
                    style={{
                      backgroundColor: isActive ? "#f5f5f7" : "transparent",
                      color: isActive ? "#1d1d1f" : "#6e6e73",
                      fontWeight: isActive ? 600 : 400,
                      transition: "background-color 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.currentTarget.style.backgroundColor = "#fafafa");
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isActive
                        ? "#f5f5f7"
                        : "transparent";
                    }}
                  >
                    {d.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        {hasColors && (
          <div
            className="h-5"
            style={{ width: 1, backgroundColor: "#e5e5e5" }}
          />
        )}

        {/* Device color swatches */}
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
                      backgroundColor: variant.swatch,
                      border: "0.5px solid rgba(0,0,0,0.12)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Divider */}
        <div
          className="h-5"
          style={{ width: 1, backgroundColor: "#e5e5e5" }}
        />

        {/* Canvas background swatches */}
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
                    backgroundColor: isTransparent
                      ? undefined
                      : preset.swatch,
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

          {/* Custom bg color */}
          <button
            title="Custom color"
            onClick={() => bgInputRef.current?.click()}
            className="relative flex items-center justify-center cursor-pointer touch-hitbox"
            style={{ width: 18, height: 18 }}
          >
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
            ref={bgInputRef}
            type="color"
            className="sr-only"
            value={canvasBg ?? "#ffffff"}
            onChange={(e) => setCanvasBg(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
