"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import DeviceMockup, { type DeviceConfig } from "./device-mockup";
import MockupCanvas, { type CanvasPosition } from "./mockup-canvas";
import CodeModal from "./code-modal";

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

/** Tolerance for aspect ratio comparison (5%) */
const ASPECT_RATIO_TOLERANCE = 0.05;

/** Compute the screen aspect ratio for a device config */
function getScreenAspectRatio(config: DeviceConfig): number {
  const w = config.screenWidthFraction * config.framePngWidth;
  const h = config.screenHeightFraction * config.framePngHeight;
  return w / h;
}

/** Measure dimensions of an image file */
function measureImage(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

/** Measure dimensions of a video file */
function measureVideo(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      resolve({ width: video.videoWidth, height: video.videoHeight });
      URL.revokeObjectURL(url);
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load video"));
    };
    video.src = url;
  });
}

interface ScreenContent {
  type: "image" | "video";
  url: string;
}

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

  // Zoom
  const [zoom, setZoom] = useState(1);

  // Canvas position
  const [position, setPosition] = useState<CanvasPosition>("center");

  // Canvas background
  const [canvasBg, setCanvasBg] = useState<string | null>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  // Screen content
  const [screenContent, setScreenContent] = useState<ScreenContent | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Code modal
  const [codeModalOpen, setCodeModalOpen] = useState(false);

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

  // Handle file selection
  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Reset input so the same file can be re-selected
      e.target.value = "";

      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");

      if (!isVideo && !isImage) {
        toast.error("Unsupported file type", {
          description: "Please select an image or video file.",
        });
        return;
      }

      try {
        const dims = isVideo
          ? await measureVideo(file)
          : await measureImage(file);

        const fileAspect = dims.width / dims.height;
        const screenAspect = getScreenAspectRatio(config);
        const diff = Math.abs(fileAspect - screenAspect) / screenAspect;

        if (diff > ASPECT_RATIO_TOLERANCE) {
          const expected = `${Math.round(screenAspect * 1000) / 1000}`;
          const got = `${Math.round(fileAspect * 1000) / 1000}`;
          toast.error("Aspect ratio mismatch", {
            description: `${current.name} screen expects ~${expected} ratio but your file is ${got} (${dims.width}x${dims.height}). Use a ${Math.round(config.screenWidthFraction * config.framePngWidth)}x${Math.round(config.screenHeightFraction * config.framePngHeight)} screenshot.`,
          });
          return;
        }

        // Revoke previous URL if any
        if (screenContent) {
          URL.revokeObjectURL(screenContent.url);
        }

        const url = URL.createObjectURL(file);
        setScreenContent({ type: isVideo ? "video" : "image", url });
      } catch {
        toast.error("Failed to load file", {
          description: "The file could not be read. Please try another.",
        });
      }
    },
    [config, current.name, screenContent]
  );

  // Clear screen content when device changes
  useEffect(() => {
    if (screenContent) {
      URL.revokeObjectURL(screenContent.url);
      setScreenContent(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceIndex]);

  const shouldReduceMotion = useReducedMotion();
  const deviceWidth = canvasWidth * BASE_DEVICE_RATIO * zoom;
  const hasColors = config.colors.length > 0;

  // Key only changes on device model swap (not color — color is just a frame PNG change)
  const deviceKey = current.name;

  return (
    <>
      {/* Centered canvas */}
      <div className="mx-auto w-full max-w-xl">
        <MockupCanvas
          ref={canvasRef}
          position={position}
          backgroundColor={canvasBg}
        >
          {canvasWidth > 0 && (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={deviceKey}
                initial={shouldReduceMotion ? false : { opacity: 0, filter: "blur(2px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(2px)" }}
                transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.div
                  layout
                  transition={{
                    layout: {
                      type: "spring",
                      duration: 0.3,
                      bounce: 0.05,
                    },
                  }}
                >
                  <DeviceMockup
                    device={config}
                    width={deviceWidth}
                    color={selectedColor}
                    showStatusBar={!screenContent}
                  >
                    {screenContent ? (
                      <div
                        className="absolute inset-0 w-full h-full cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {screenContent.type === "image" ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={screenContent.url}
                            alt="Screen content"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={screenContent.url}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        )}
                      </div>
                    ) : (
                      <button
                        className="absolute inset-0 w-full h-full bg-[#f2f2f2] hover:opacity-70 flex items-center justify-center cursor-pointer"
                        style={{ transition: "opacity 150ms ease" }}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <PlusIcon />
                      </button>
                    )}
                  </DeviceMockup>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </MockupCanvas>
      </div>

      {/* Hidden file input for screen content */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="sr-only"
        onChange={handleFileSelect}
      />

      {/* Fixed sidebar panel on the right */}
      <div
        className="fixed top-6 right-6 z-40 rounded-2xl flex flex-col"
        style={{
          width: 260,
          backgroundColor: "#ffffff",
          border: "1px solid #e5e5e5",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        {/* Device selector */}
        <div className="px-4 py-3" ref={dropdownRef}>
          <span
            className="block text-[10px] font-medium uppercase tracking-wider mb-2"
            style={{ color: "#a1a1aa" }}
          >
            Device
          </span>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium"
              style={{
                backgroundColor: "#f5f5f7",
                color: "#1d1d1f",
                transition: "background-color 150ms ease",
              }}
            >
              {current.name}
              <ChevronIcon open={dropdownOpen} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{
                    type: "spring",
                    duration: 0.2,
                    bounce: 0,
                  }}
                  className="absolute top-full left-0 mt-1 w-full rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e5e5",
                    boxShadow:
                      "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                    maxHeight: 280,
                    overflowY: "auto",
                    zIndex: 50,
                    transformOrigin: "top left",
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
                          backgroundColor: isActive
                            ? "#f5f5f7"
                            : "transparent",
                          color: isActive ? "#1d1d1f" : "#6e6e73",
                          fontWeight: isActive ? 600 : 400,
                          transition: "background-color 150ms ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive)
                            e.currentTarget.style.backgroundColor = "#fafafa";
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Device color */}
        {hasColors && (
          <>
            <div
              className="w-full"
              style={{ height: 1, backgroundColor: "#f0f0f0" }}
            />
            <div className="px-4 py-3">
              <span
                className="block text-[10px] font-medium uppercase tracking-wider mb-2"
                style={{ color: "#a1a1aa" }}
              >
                Color
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {config.colors.map((variant) => {
                  const isActive = selectedColor === variant.name;
                  return (
                    <button
                      key={variant.name}
                      title={variant.name}
                      onClick={() => setSelectedColor(variant.name)}
                      className="relative flex items-center justify-center cursor-pointer touch-hitbox"
                      style={{ width: 20, height: 20 }}
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
                          width: 14,
                          height: 14,
                          backgroundColor: variant.swatch,
                          border: "0.5px solid rgba(0,0,0,0.12)",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Canvas background */}
        <div
          className="w-full"
          style={{ height: 1, backgroundColor: "#f0f0f0" }}
        />
        <div className="px-4 py-3">
          <span
            className="block text-[10px] font-medium uppercase tracking-wider mb-2"
            style={{ color: "#a1a1aa" }}
          >
            Background
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {CANVAS_BG_PRESETS.map((preset) => {
              const isActive = canvasBg === preset.value;
              const isTransparent = preset.value === null;
              return (
                <button
                  key={preset.label}
                  title={preset.label}
                  onClick={() => setCanvasBg(preset.value)}
                  className="relative flex items-center justify-center cursor-pointer touch-hitbox"
                  style={{ width: 20, height: 20 }}
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
                      width: 14,
                      height: 14,
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
              style={{ width: 20, height: 20 }}
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
                  width: 14,
                  height: 14,
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

        {/* Position */}
        <div
          className="w-full"
          style={{ height: 1, backgroundColor: "#f0f0f0" }}
        />
        <div className="px-4 py-3">
          <span
            className="block text-[10px] font-medium uppercase tracking-wider mb-2"
            style={{ color: "#a1a1aa" }}
          >
            Position
          </span>
          <div className="grid grid-cols-3 gap-1">
            {(
              [
                { value: "top", label: "Top", icon: "\u2191" },
                { value: "center", label: "Center", icon: "\u00B7" },
                { value: "bottom", label: "Bottom", icon: "\u2193" },
              ] as const
            ).map(({ value, label, icon }) => {
              const isActive = position === value;
              return (
                <button
                  key={value}
                  onClick={() => setPosition(value)}
                  className="cursor-pointer text-[11px] font-medium py-1 rounded-md"
                  style={{
                    transition:
                      "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
                    backgroundColor: isActive ? "#1d1d1f" : "#f5f5f7",
                    color: isActive ? "#ffffff" : "#6e6e73",
                    border: isActive ? "1px solid #1d1d1f" : "1px solid #e5e5e5",
                  }}
                >
                  {icon} {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Zoom */}
        <div
          className="w-full"
          style={{ height: 1, backgroundColor: "#f0f0f0" }}
        />
        <div className="px-4 py-3">
          <span
            className="block text-[10px] font-medium uppercase tracking-wider mb-2"
            style={{ color: "#a1a1aa" }}
          >
            Zoom
          </span>
          <div className="grid grid-cols-4 gap-1">
            {([0.5, 0.75, 0.9, 1, 1.25, 1.5, 1.75, 2] as const).map(
              (level) => {
                const isActive = zoom === level;
                return (
                  <button
                    key={level}
                    onClick={() => setZoom(level)}
                    className="cursor-pointer text-[11px] font-medium py-1 rounded-md"
                    style={{
                      transition:
                        "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
                      backgroundColor: isActive ? "#1d1d1f" : "#f5f5f7",
                      color: isActive ? "#ffffff" : "#6e6e73",
                      border: isActive
                        ? "1px solid #1d1d1f"
                        : "1px solid #e5e5e5",
                    }}
                  >
                    {level === 1 ? "1x" : `${level}x`}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* View Code */}
        <div
          className="w-full"
          style={{ height: 1, backgroundColor: "#f0f0f0" }}
        />
        <div className="px-4 py-3">
          <button
            onClick={() => setCodeModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-xs font-medium"
            style={{
              backgroundColor: "#1d1d1f",
              color: "#ffffff",
              transition: "opacity 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
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
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            View Code
          </button>
        </div>
      </div>

      {/* Code modal */}
      <CodeModal
        open={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
        deviceName={current.name}
        color={selectedColor}
      />
    </>
  );
}
