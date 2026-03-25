"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { track } from "@vercel/analytics";
import { toast } from "sonner";
import html2canvas from "html2canvas";
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

/** Load an image from a URL and return it as an HTMLImageElement */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/** Draw a rounded rectangle path on a canvas context */
function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
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

  // Export
  const [exportOpen, setExportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  // Canvas sizing
  const [canvasWidth, setCanvasWidth] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Reset color when device changes
  useEffect(() => {
    setSelectedColor(config.defaultColor);
  }, [config]);

  // Reset position to center when zoom returns to 1x
  useEffect(() => {
    if (zoom === 1) setPosition("center");
  }, [zoom]);

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

  // Close export dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        exportRef.current &&
        !exportRef.current.contains(e.target as Node)
      ) {
        setExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Export handler
  const handleExport = useCallback(
    async (format: "png" | "jpg") => {
      const node = canvasRef.current;
      if (!node) return;

      setExporting(true);
      try {
        // When transparent bg is selected: PNG gets true transparency,
        // JPG (no alpha) gets white fallback.
        const isTransparent = canvasBg == null;
        const bgColor = isTransparent
          ? format === "png"
            ? null          // null = transparent in html2canvas
            : "#ffffff"     // JPG can't do transparency
          : canvasBg;

        // Hide the checkered pattern layer so it doesn't render into the export
        const bgLayer = node.querySelector("[data-canvas-bg]") as HTMLElement | null;
        if (bgLayer && isTransparent) {
          bgLayer.style.visibility = "hidden";
        }

        let canvas: HTMLCanvasElement;
        try {
          canvas = await html2canvas(node, {
            scale: 4,
            useCORS: true,
            allowTaint: true,
            backgroundColor: bgColor,
            logging: false,
          });
        } finally {
          // Always restore the checkered pattern
          if (bgLayer && isTransparent) {
            bgLayer.style.visibility = "";
          }
        }

        const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
        const dataUrl = canvas.toDataURL(mimeType, format === "jpg" ? 1.0 : undefined);

        const link = document.createElement("a");
        link.download = `mockify-${current.name.toLowerCase().replace(/\s+/g, "-")}.${format}`;
        link.href = dataUrl;
        link.click();

        track("export_mockup", { format, device: current.name });
        toast.success(`Exported as ${format.toUpperCase()}`);
      } catch {
        toast.error("Export failed", {
          description: "Could not generate the image. Please try again.",
        });
      } finally {
        setExporting(false);
        setExportOpen(false);
      }
    },
    [current.name, canvasBg]
  );

  // Video export handler
  const handleVideoExport = useCallback(async () => {
    const node = canvasRef.current;
    if (!node || !screenContent || screenContent.type !== "video") return;

    const videoEl = node.querySelector("video") as HTMLVideoElement | null;
    if (!videoEl) return;

    setExporting(true);
    try {
      const scale = 4;
      const canvasSize = node.offsetWidth * scale;

      // Create offscreen canvas
      const offscreen = document.createElement("canvas");
      offscreen.width = canvasSize;
      offscreen.height = canvasSize;
      const ctx = offscreen.getContext("2d")!;

      // Resolve frame source
      const resolvedColor = selectedColor ?? config.defaultColor;
      const colorVariant = resolvedColor
        ? config.colors.find((c) => c.name === resolvedColor)
        : undefined;
      const frameSrc = colorVariant?.frameSrc ?? config.frameSrc;

      // Pre-load device frame image
      const frameImg = await loadImage(frameSrc);

      // Compute device layout (matching DOM layout)
      const padding = canvasSize * 0.08;
      const deviceW = canvasSize * BASE_DEVICE_RATIO * zoom;
      const deviceH = deviceW * (config.framePngHeight / config.framePngWidth);

      const deviceX = (canvasSize - deviceW) / 2;
      let deviceY: number;
      if (position === "top") {
        deviceY = padding;
      } else if (position === "bottom") {
        deviceY = canvasSize - padding - deviceH;
      } else {
        deviceY = (canvasSize - deviceH) / 2;
      }

      // Screen area within device
      const screenX = deviceX + deviceW * config.screenLeftFraction;
      const screenY = deviceY + deviceH * config.screenTopFraction;
      const screenW = deviceW * config.screenWidthFraction;
      const screenH = deviceH * config.screenHeightFraction;
      const screenRadius = deviceW * config.screenRadiusFraction;

      // Pick a supported mimeType
      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : "video/webm";

      // Set up MediaRecorder on the offscreen canvas stream
      const stream = offscreen.captureStream(60);
      const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 16_000_000, // 16 Mbps
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size) chunks.push(e.data);
      };

      // Save video state and prepare for export
      const wasLooping = videoEl.loop;
      const wasPaused = videoEl.paused;
      videoEl.loop = false;
      videoEl.currentTime = 0;

      await new Promise<void>((resolve) => {
        videoEl.onseeked = () => resolve();
      });

      recorder.start();
      await videoEl.play();

      // Draw loop
      const drawFrame = () => {
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        // Background
        if (canvasBg) {
          ctx.fillStyle = canvasBg;
          ctx.fillRect(0, 0, canvasSize, canvasSize);
        }

        // Video frame in screen area (clipped to rounded rect)
        ctx.save();
        roundedRect(ctx, screenX, screenY, screenW, screenH, screenRadius);
        ctx.clip();
        ctx.drawImage(videoEl, screenX, screenY, screenW, screenH);
        ctx.restore();

        // Device frame overlay
        ctx.drawImage(frameImg, deviceX, deviceY, deviceW, deviceH);

        if (!videoEl.ended && !videoEl.paused) {
          requestAnimationFrame(drawFrame);
        } else {
          recorder.stop();
        }
      };

      requestAnimationFrame(drawFrame);

      // Wait for recording to finish
      await new Promise<void>((resolve) => {
        recorder.onstop = () => resolve();
      });

      // Restore video state
      videoEl.loop = wasLooping;
      if (!wasPaused) {
        videoEl.currentTime = 0;
        videoEl.play();
      }

      // Download
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `mockify-${current.name.toLowerCase().replace(/\s+/g, "-")}.webm`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      track("export_mockup", { format: "webm", device: current.name });
      toast.success("Exported as WebM video");
    } catch {
      toast.error("Video export failed", {
        description: "Could not generate the video. Please try again.",
      });
    } finally {
      setExporting(false);
      setExportOpen(false);
    }
  }, [config, current.name, canvasBg, zoom, position, screenContent, selectedColor]);

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
        className="fixed top-16 right-6 z-40 rounded-2xl flex flex-col"
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
                  className="absolute top-full left-0 mt-1 w-full rounded-xl"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e5e5",
                    boxShadow:
                      "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                    maxHeight: 320,
                    overflowX: "hidden",
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
                          track("select_device", { device: d.name });
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
        <div
          className="px-4 py-3"
          style={{
            opacity: zoom === 1 ? 0.4 : 1,
            pointerEvents: zoom === 1 ? "none" : "auto",
            transition: "opacity 150ms ease",
          }}
        >
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
                    backgroundColor: isActive ? "#f0f0f0" : "#f5f5f7",
                    color: isActive ? "#1d1d1f" : "#6e6e73",
                    border: isActive ? "1px solid #d0d0d0" : "1px solid #e5e5e5",
                    fontWeight: isActive ? 600 : 400,
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
                      backgroundColor: isActive ? "#f0f0f0" : "#f5f5f7",
                      color: isActive ? "#1d1d1f" : "#6e6e73",
                      border: isActive
                        ? "1px solid #d0d0d0"
                        : "1px solid #e5e5e5",
                      fontWeight: isActive ? 600 : 400,
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
              backgroundColor: "#f0f0f0",
              color: "#1d1d1f",
              border: "1px solid #d0d0d0",
              transition: "background-color 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e8e8e8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
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

        {/* Export */}
        <div
          className="w-full"
          style={{ height: 1, backgroundColor: "#f0f0f0" }}
        />
        <div className="px-4 py-3" ref={exportRef}>
          <div className="relative">
            <button
              onClick={() => setExportOpen(!exportOpen)}
              disabled={exporting}
              className="w-full flex items-center justify-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-xs font-medium"
              style={{
                backgroundColor: "#1d1d1f",
                color: "#ffffff",
                border: "1px solid #1d1d1f",
                transition: "opacity 150ms ease",
                opacity: exporting ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!exporting) e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = exporting ? "0.6" : "1";
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {exporting ? "Exporting..." : "Export"}
            </button>

            <AnimatePresence>
              {exportOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 4 }}
                  transition={{
                    type: "spring",
                    duration: 0.2,
                    bounce: 0,
                  }}
                  className="absolute bottom-full left-0 mb-1 w-full rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e5e5",
                    boxShadow:
                      "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                    zIndex: 50,
                    transformOrigin: "bottom left",
                  }}
                >
                  {(
                    [
                      { format: "png", label: "PNG", desc: "Lossless, transparent" },
                      { format: "jpg", label: "JPG", desc: "Compressed, smaller" },
                    ] as const
                  ).map(({ format, label, desc }) => (
                    <button
                      key={format}
                      onClick={() => handleExport(format)}
                      className="w-full text-left px-3 py-2.5 cursor-pointer"
                      style={{
                        transition: "background-color 150ms ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#fafafa";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <span
                        className="block text-xs font-medium"
                        style={{ color: "#1d1d1f" }}
                      >
                        {label}
                      </span>
                      <span
                        className="block text-[10px]"
                        style={{ color: "#6e6e73" }}
                      >
                        {desc}
                      </span>
                    </button>
                  ))}

                  {/* Video export — only shown when screen content is a video */}
                  {screenContent?.type === "video" && (
                    <>
                      <div
                        className="w-full"
                        style={{ height: 1, backgroundColor: "#f0f0f0" }}
                      />
                      <button
                        onClick={handleVideoExport}
                        className="w-full text-left px-3 py-2.5 cursor-pointer"
                        style={{
                          transition: "background-color 150ms ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#fafafa";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <span
                          className="block text-xs font-medium"
                          style={{ color: "#1d1d1f" }}
                        >
                          WebM Video
                        </span>
                        <span
                          className="block text-[10px]"
                          style={{ color: "#6e6e73" }}
                        >
                          Full video with device frame
                        </span>
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
