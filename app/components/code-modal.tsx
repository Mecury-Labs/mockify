"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { codeToHtml } from "shiki";

/* ── Icons ── */

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Helpers ── */

/** "iPhone 16 Pro" → "iPhone16Pro" */
function toCamelConfig(name: string): string {
  return name
    .replace(/iPhone\s+/, "iPhone")
    .replace(/\s+(\w)/g, (_, c: string) => c.toUpperCase());
}

/* ── Tab definitions ── */

type TabId = "install" | "setup" | "usage";

interface TabDef {
  id: TabId;
  label: string;
  step: string;
  lang: string;
  getCode: (deviceName: string, color?: string) => string;
}

const TABS: TabDef[] = [
  {
    id: "install",
    label: "Install",
    step: "1",
    lang: "bash",
    getCode: () => `npm install @mockify/react`,
  },
  {
    id: "usage",
    label: "Usage",
    step: "2",
    lang: "tsx",
    getCode: (deviceName: string, color?: string) => {
      const configName = toCamelConfig(deviceName);
      return `import { DeviceMockup, ${configName} } from "@mockify/react";

export default function MyComponent() {
  return (
    <DeviceMockup
      device={${configName}}
      width={320}${color ? `\n      color="${color}"` : ""}
    >
      <img
        src="/my-screenshot.png"
        alt="App screenshot"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </DeviceMockup>
  );
}`;
    },
  },
];

/** Fixed height for the code area — prevents modal resize on tab switch */
const CODE_AREA_HEIGHT = 340;

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
  const [activeTab, setActiveTab] = useState<TabId>("usage");
  const [htmlCache, setHtmlCache] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const currentTab = TABS.find((t) => t.id === activeTab)!;
  const code = currentTab.getCode(deviceName, color);
  const cacheKey = `${activeTab}:${code}`;

  // Highlight code with shiki
  useEffect(() => {
    if (!open) return;
    if (htmlCache[cacheKey]) return;

    let cancelled = false;
    codeToHtml(code, {
      lang: currentTab.lang,
      theme: "github-light-default",
    }).then((result) => {
      if (!cancelled) {
        setHtmlCache((prev) => ({ ...prev, [cacheKey]: result }));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [code, cacheKey, open, currentTab.lang, htmlCache]);

  // Reset tab when modal opens
  useEffect(() => {
    if (open) {
      setActiveTab("usage");
      setCopied(false);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  const html = htmlCache[cacheKey];

  // Compute tab indicator position via index
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);

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
            style={{
              backgroundColor: "rgba(0,0,0,0.18)",
              backdropFilter: "blur(8px)",
            }}
            onClick={(e) => {
              if (e.target === overlayRef.current) onClose();
            }}
          >
            {/* Modal — fixed layout, no height changes */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="w-full"
              style={{ maxWidth: 600 }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e5e5",
                  boxShadow:
                    "0 24px 48px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.04)",
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{ borderBottom: "1px solid #f0f0f0" }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[13px] font-semibold"
                      style={{ color: "#1d1d1f" }}
                    >
                      Get started
                    </span>
                    <span
                      className="text-[11px] font-medium rounded-full px-2 py-0.5"
                      style={{
                        color: "#6e6e73",
                        backgroundColor: "#f5f5f7",
                      }}
                    >
                      {deviceName}
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center cursor-pointer rounded-lg p-1.5"
                    style={{
                      color: "#a1a1aa",
                      backgroundColor: "transparent",
                      transition: "all 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f5f5f7";
                      e.currentTarget.style.color = "#6e6e73";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#a1a1aa";
                    }}
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Tabs — shared element pill */}
                <div
                  className="flex items-center px-5 py-2.5 gap-1"
                  style={{ borderBottom: "1px solid #f0f0f0" }}
                >
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setCopied(false);
                        }}
                        className="relative flex items-center gap-1.5 cursor-pointer text-[11px] font-medium px-3 py-1.5 rounded-lg"
                        style={{
                          color: isActive ? "#1d1d1f" : "#a1a1aa",
                          backgroundColor: "transparent",
                          border: "none",
                          transition: "color 200ms ease",
                          zIndex: 1,
                        }}
                      >
                        {/* Shared element pill background */}
                        {isActive && (
                          <motion.div
                            layoutId="code-modal-tab-pill"
                            className="absolute inset-0 rounded-lg"
                            style={{ backgroundColor: "#f0f0f0", zIndex: -1 }}
                            transition={{
                              type: "spring",
                              duration: 0.35,
                              bounce: 0.15,
                            }}
                          />
                        )}
                        <span
                          className="relative flex items-center justify-center rounded-full text-[10px] font-semibold"
                          style={{
                            width: 18,
                            height: 18,
                            backgroundColor: isActive
                              ? "#1d1d1f"
                              : "#e5e5e5",
                            color: isActive ? "#ffffff" : "#a1a1aa",
                            transition:
                              "background-color 200ms ease, color 200ms ease",
                          }}
                        >
                          {tab.step}
                        </span>
                        <span className="relative">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Code area — fixed height, content crossfades */}
                <div
                  className="relative"
                  style={{
                    backgroundColor: "#fafafa",
                    height: CODE_AREA_HEIGHT,
                  }}
                >
                  {/* Copy button — stays fixed in top right */}
                  <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 z-10 flex items-center gap-1 cursor-pointer rounded-lg px-2.5 py-1.5 text-[11px] font-medium"
                    style={{
                      color: copied ? "#34C759" : "#6e6e73",
                      backgroundColor: copied ? "#f0faf4" : "#ffffff",
                      border: copied
                        ? "1px solid #bbf0d0"
                        : "1px solid #e5e5e5",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                      transition: "all 150ms ease",
                    }}
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    {copied ? "Copied!" : "Copy"}
                  </button>

                  {/* Content crossfade */}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12, ease: "easeOut" }}
                      className="absolute inset-0 overflow-auto px-5 py-4"
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
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div
                  className="px-5 py-3 flex items-center justify-between"
                  style={{
                    borderTop: "1px solid #f0f0f0",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <span
                    className="text-[11px]"
                    style={{ color: "#a1a1aa" }}
                  >
                    {activeTab === "install" &&
                      "Install the package from npm"}
                    {activeTab === "usage" &&
                      "Import and use in any React component"}
                  </span>
                  {activeTab !== "usage" && (
                    <button
                      onClick={() => {
                        const idx = TABS.findIndex(
                          (t) => t.id === activeTab
                        );
                        if (idx < TABS.length - 1) {
                          setActiveTab(TABS[idx + 1].id);
                          setCopied(false);
                        }
                      }}
                      className="text-[11px] font-medium cursor-pointer"
                      style={{
                        color: "#1d1d1f",
                        backgroundColor: "transparent",
                        border: "none",
                        transition: "opacity 150ms ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.6";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      Next step &rarr;
                    </button>
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
