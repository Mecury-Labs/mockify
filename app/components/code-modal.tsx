"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { codeToHtml } from "shiki";

/* ── Icons ── */

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CopyIcon = () => (
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
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Helpers ── */

/** Convert a device name like "iPhone 16 Pro" to a config import name like "IPHONE_16_PRO" */
function toConfigName(name: string): string {
  return name.toUpperCase().replace(/\s+/g, "_");
}

/** Convert a device name to a file name like "iphone-16-pro" */
function toFileName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

/** Generate the usage code example */
function generateCode(deviceName: string, color?: string): string {
  const configName = toConfigName(deviceName);
  const fileName = toFileName(deviceName);

  return `import DeviceMockup from "@/components/device-mockup";
import { ${configName} } from "@/components/devices/${fileName}";

export default function MyComponent() {
  return (
    <DeviceMockup
      device={${configName}}
      width={320}${color ? `\n      color="${color}"` : ""}
      showStatusBar={false}
    >
      {/* Image preview */}
      <img
        src="/my-screenshot.png"
        alt="App screenshot"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Or video preview */}
      {/* <video
        src="/my-recording.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      /> */}
    </DeviceMockup>
  );
}`;
}

/* ── Component ── */

interface CodeModalProps {
  open: boolean;
  onClose: () => void;
  deviceName: string;
  color?: string;
}

export default function CodeModal({
  open,
  onClose,
  deviceName,
  color,
}: CodeModalProps) {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);
  const code = generateCode(deviceName, color);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Highlight code with shiki
  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    codeToHtml(code, {
      lang: "tsx",
      theme: "github-light-default",
    }).then((result) => {
      if (!cancelled) setHtml(result);
    });

    return () => {
      cancelled = true;
    };
  }, [code, open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(0,0,0,0.2)", backdropFilter: "blur(8px)" }}
            onClick={(e) => {
              if (e.target === overlayRef.current) onClose();
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="w-full"
              style={{ maxWidth: 640 }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e5e5",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{ borderBottom: "1px solid #f0f0f0" }}
                >
                  <span
                    className="text-xs font-medium"
                    style={{ color: "#6e6e73" }}
                  >
                    Usage — {deviceName}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 cursor-pointer rounded-md px-2 py-1 text-xs"
                      style={{
                        color: copied ? "#34C759" : "#6e6e73",
                        backgroundColor: "transparent",
                        border: "1px solid #e5e5e5",
                        transition: "color 150ms ease",
                      }}
                    >
                      {copied ? <CheckIcon /> : <CopyIcon />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                    <button
                      onClick={onClose}
                      className="flex items-center justify-center cursor-pointer rounded-md p-1"
                      style={{
                        color: "#6e6e73",
                        backgroundColor: "transparent",
                        border: "1px solid #e5e5e5",
                        transition: "color 150ms ease",
                      }}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                </div>

                {/* Code */}
                <div
                  className="overflow-auto px-5 py-4"
                  style={{ maxHeight: 480, backgroundColor: "#fafafa" }}
                >
                  {html ? (
                    <div
                      className="text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  ) : (
                    <div
                      className="text-xs font-mono"
                      style={{ color: "#a1a1aa" }}
                    >
                      Loading...
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
