"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import Link from "next/link";
import DeviceMockup from "./components/device-mockup";
import { IPHONE_17_PRO } from "./components/devices/iphone-17-pro";
import { IPHONE_AIR } from "./components/devices/iphone-air";
import { IPHONE_16 } from "./components/devices/iphone-16";
import { IPHONE_15_PRO } from "./components/devices/iphone-15-pro";
import { IPHONE_16_PRO_MAX } from "./components/devices/iphone-16-pro-max";

/* ── Fade-up section wrapper ── */
function FadeSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Icons ── */
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const DeviceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const PaletteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="10.5" r="2.5" />
    <circle cx="8.5" cy="7.5" r="2.5" />
    <circle cx="6.5" cy="12.5" r="2.5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const PackageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

/* ── Feature data ── */
const FEATURES = [
  {
    icon: <DeviceIcon />,
    title: "20+ iPhone Models",
    desc: "Every iPhone from 13 to 17 Air. All models, all sizes — Mini to Pro Max.",
  },
  {
    icon: <PaletteIcon />,
    title: "89 Color Variants",
    desc: "Every official Apple color. Natural Titanium, Ultramarine, Sky Blue — all real.",
  },
  {
    icon: <CodeIcon />,
    title: "Copy-Paste Code",
    desc: "One-click code generation. Get React components with exact device configs.",
  },
  {
    icon: <PackageIcon />,
    title: "npm Package",
    desc: "Install @mockify/react in your project. Works with any React framework.",
  },
  {
    icon: <ZapIcon />,
    title: "Pixel-Perfect Frames",
    desc: "Official Apple Design Resource PNGs. Not recreations — the real thing.",
  },
  {
    icon: <DownloadIcon />,
    title: "Export Anything",
    desc: "Upload screenshots, swap devices, change colors. Download or copy code.",
  },
];

/* ── Showcase devices for hero ── */
const HERO_DEVICES = [
  { config: IPHONE_17_PRO, color: "Silver", label: "iPhone 17 Pro" },
  { config: IPHONE_AIR, color: "Sky Blue", label: "iPhone Air" },
  { config: IPHONE_16, color: "Ultramarine", label: "iPhone 16" },
];

/* ── Code snippet ── */
const CODE_EXAMPLE = `import { DeviceMockup, iPhone17Pro } from '@mockify/react'

export default function App() {
  return (
    <DeviceMockup
      device={iPhone17Pro}
      color="Silver"
      width={380}
    >
      <img src="/your-screenshot.png" alt="App" />
    </DeviceMockup>
  )
}`;

/* ── Generation data for gallery ── */
const GENERATIONS = [
  { label: "17 Series", year: "2025", devices: ["iPhone 17", "iPhone 17 Pro", "iPhone 17 Pro Max", "iPhone Air"] },
  { label: "16 Series", year: "2024", devices: ["iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max"] },
  { label: "15 Series", year: "2023", devices: ["iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max"] },
  { label: "14 Series", year: "2022", devices: ["iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max"] },
  { label: "13 Series", year: "2021", devices: ["iPhone 13", "iPhone 13 Mini", "iPhone 13 Pro", "iPhone 13 Pro Max"] },
];

/* ── Plan features ── */
const FREE_FEATURES = [
  "All 20+ iPhone models",
  "89 official color variants",
  "Upload screenshots",
  "Canvas background controls",
  "Zoom & position controls",
  "One-click code generation",
];

const PRO_FEATURES = [
  "Everything in Free",
  "Export as PNG, SVG & MP4",
  "Video trimming & looping",
  "Batch export multiple devices",
  "Custom watermark & branding",
  "Priority support & updates",
];

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [activeGen, setActiveGen] = useState(0);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#fafafa" }}>

      {/* ═══════════════════════════════════════════ */}
      {/* HERO SECTION                                */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ paddingTop: 120, paddingBottom: 80 }}>
        {/* Subtle gradient backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,0,0,0.02) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6">
          {/* Badge */}
          <motion.div
            className="flex justify-center mb-6"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-medium"
              style={{
                backgroundColor: "rgba(0,0,0,0.04)",
                color: "#6e6e73",
                letterSpacing: "0.02em",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#34C759" }}
              />
              Built with Apple Design Resources
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-center font-semibold tracking-tight"
            style={{
              fontSize: "clamp(36px, 5.5vw, 64px)",
              lineHeight: 1.08,
              color: "#1d1d1f",
              letterSpacing: "-0.035em",
            }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.08 }}
          >
            Device mockups that
            <br />
            <span style={{ color: "#6e6e73" }}>look real.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-center mx-auto mt-5"
            style={{
              maxWidth: 520,
              fontSize: "clamp(15px, 1.8vw, 18px)",
              lineHeight: 1.55,
              color: "#86868b",
              letterSpacing: "-0.01em",
            }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.16 }}
          >
            Ultra-realistic iPhone mockups using official Apple frame PNGs. 
            20 models, 89 colors, pixel-perfect.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.24 }}
          >
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 rounded-full font-semibold"
              style={{
                padding: "12px 28px",
                fontSize: 14,
                backgroundColor: "#1d1d1f",
                color: "#ffffff",
                textDecoration: "none",
                transition: "opacity 150ms ease, transform 150ms ease",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Open Playground
              <ArrowRightIcon />
            </Link>
            <a
              href="#pro"
              className="inline-flex items-center gap-2 rounded-full font-medium"
              style={{
                padding: "12px 24px",
                fontSize: 14,
                backgroundColor: "transparent",
                color: "#1d1d1f",
                border: "1px solid #d2d2d7",
                textDecoration: "none",
                transition: "background-color 150ms ease, border-color 150ms ease",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.03)";
                e.currentTarget.style.borderColor = "#c0c0c5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "#d2d2d7";
              }}
            >
              View Pro
            </a>
          </motion.div>

          {/* Micro proof */}
          <motion.p
            className="text-center mt-4"
            style={{ fontSize: 12, color: "#a1a1a6" }}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Free to use. No account required.
          </motion.p>

          {/* Hero device showcase — 3 phones arranged in a row */}
          <motion.div
            className="flex items-end justify-center gap-4 sm:gap-6 md:gap-8 mt-14 mx-auto"
            style={{ maxWidth: 720, perspective: "1200px" }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
          >
            {/* Left device — iPhone 16, slightly smaller, rotated */}
            <motion.div
              style={{ transform: "rotate(-4deg)", transformOrigin: "bottom center" }}
              initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.45 }}
            >
              <DeviceMockup
                device={IPHONE_16}
                width={160}
                color="Ultramarine"
                showStatusBar
              />
            </motion.div>

            {/* Center device — iPhone 17 Pro, hero size */}
            <motion.div
              style={{ zIndex: 10 }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.35 }}
            >
              <DeviceMockup
                device={IPHONE_17_PRO}
                width={220}
                color="Silver"
                showStatusBar
              />
            </motion.div>

            {/* Right device — iPhone Air, slightly smaller, rotated */}
            <motion.div
              style={{ transform: "rotate(4deg)", transformOrigin: "bottom center" }}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.45 }}
            >
              <DeviceMockup
                device={IPHONE_AIR}
                width={160}
                color="Sky Blue"
                showStatusBar
              />
            </motion.div>
          </motion.div>

          {/* Device labels */}
          <motion.div
            className="flex items-center justify-center gap-8 sm:gap-14 mt-6"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {HERO_DEVICES.map((d) => (
              <span
                key={d.label}
                className="text-[11px] font-medium"
                style={{ color: "#a1a1a6", letterSpacing: "0.01em" }}
              >
                {d.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SOCIAL PROOF BAR                            */}
      {/* ═══════════════════════════════════════════ */}
      <FadeSection>
        <div
          className="py-10"
          style={{ borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}
        >
          <div className="mx-auto max-w-5xl px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              { num: "20+", label: "iPhone models" },
              { num: "89", label: "Color variants" },
              { num: "5", label: "Generations" },
              { num: "100%", label: "Apple frames" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2.5">
                <span
                  className="text-xl font-semibold"
                  style={{ color: "#1d1d1f", letterSpacing: "-0.02em" }}
                >
                  {stat.num}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "#86868b" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ═══════════════════════════════════════════ */}
      {/* FEATURES GRID                               */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeSection className="text-center mb-16">
            <span
              className="inline-block text-[11px] font-medium uppercase tracking-widest mb-3"
              style={{ color: "#a1a1a6" }}
            >
              Features
            </span>
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{ color: "#1d1d1f", letterSpacing: "-0.03em" }}
            >
              Everything you need.
              <br />
              <span style={{ color: "#86868b" }}>Nothing you don&apos;t.</span>
            </h2>
          </FadeSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <FadeSection key={f.title} delay={i * 0.06}>
                <div
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #f0f0f0",
                    transition: "border-color 200ms ease, box-shadow 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#e0e0e0";
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#f0f0f0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: "#f5f5f7",
                      color: "#1d1d1f",
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3
                    className="text-sm font-semibold mb-1.5"
                    style={{ color: "#1d1d1f", letterSpacing: "-0.01em" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: "#86868b" }}
                  >
                    {f.desc}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* DEVICE GENERATIONS                          */}
      {/* ═══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <FadeSection className="text-center mb-14">
            <span
              className="inline-block text-[11px] font-medium uppercase tracking-widest mb-3"
              style={{ color: "#a1a1a6" }}
            >
              Coverage
            </span>
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{ color: "#1d1d1f", letterSpacing: "-0.03em" }}
            >
              Five generations.
              <br />
              <span style={{ color: "#86868b" }}>Every model.</span>
            </h2>
          </FadeSection>

          <FadeSection>
            {/* Generation tabs */}
            <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
              {GENERATIONS.map((gen, i) => (
                <button
                  key={gen.label}
                  onClick={() => setActiveGen(i)}
                  className="cursor-pointer rounded-full px-4 py-2 text-xs font-medium"
                  style={{
                    backgroundColor: activeGen === i ? "#1d1d1f" : "#f5f5f7",
                    color: activeGen === i ? "#ffffff" : "#6e6e73",
                    border: activeGen === i ? "1px solid #1d1d1f" : "1px solid #e5e5e5",
                    transition: "all 200ms ease",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {gen.label}
                </button>
              ))}
            </div>

            {/* Device list */}
            <motion.div
              key={activeGen}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {GENERATIONS[activeGen].devices.map((name) => (
                <div
                  key={name}
                  className="rounded-xl py-4 px-3 text-center"
                  style={{
                    backgroundColor: "#f9f9fb",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <span
                    className="text-xs font-medium"
                    style={{ color: "#1d1d1f", letterSpacing: "-0.01em" }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </motion.div>

            <p
              className="text-center mt-6 text-xs"
              style={{ color: "#a1a1a6" }}
            >
              {GENERATIONS[activeGen].year} — {GENERATIONS[activeGen].devices.length} models with full color variant support
            </p>
          </FadeSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CODE SECTION                                */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — text */}
            <FadeSection>
              <span
                className="inline-block text-[11px] font-medium uppercase tracking-widest mb-3"
                style={{ color: "#a1a1a6" }}
              >
                For Developers
              </span>
              <h2
                className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
                style={{ color: "#1d1d1f", letterSpacing: "-0.03em" }}
              >
                Drop in.
                <br />
                <span style={{ color: "#86868b" }}>Ship it.</span>
              </h2>
              <p
                className="mb-6"
                style={{ fontSize: 15, lineHeight: 1.6, color: "#86868b", maxWidth: 440 }}
              >
                Install the npm package, import a device, and render a pixel-perfect 
                mockup in your React app. Works with Next.js, Remix, Vite — anything React.
              </p>

              <div className="flex flex-col gap-2.5 mb-8">
                {[
                  "Zero config — works out of the box",
                  "TypeScript types included",
                  "CDN-hosted assets, no setup",
                  "Tree-shakeable exports",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckIcon />
                    <span className="text-[13px]" style={{ color: "#1d1d1f" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Install command */}
              <div
                className="inline-flex items-center gap-3 rounded-xl px-5 py-3"
                style={{
                  backgroundColor: "#1d1d1f",
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                <span style={{ color: "#86868b", fontSize: 13 }}>$</span>
                <span style={{ color: "#f5f5f7", fontSize: 13 }}>
                  npm install @mockify/react
                </span>
              </div>
            </FadeSection>

            {/* Right — code block */}
            <FadeSection delay={0.1}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "#1d1d1f",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                {/* Title bar */}
                <div
                  className="flex items-center gap-2 px-5 py-3.5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
                  </div>
                  <span
                    className="ml-3 text-[11px] font-medium"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    App.tsx
                  </span>
                </div>

                {/* Code */}
                <pre
                  className="px-5 py-5 overflow-x-auto"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 12.5,
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  <code>{CODE_EXAMPLE}</code>
                </pre>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SHOWCASE — device mockup in context          */}
      {/* ═══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <FadeSection className="text-center mb-16">
            <span
              className="inline-block text-[11px] font-medium uppercase tracking-widest mb-3"
              style={{ color: "#a1a1a6" }}
            >
              Showcase
            </span>
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{ color: "#1d1d1f", letterSpacing: "-0.03em" }}
            >
              Real frames.
              <br />
              <span style={{ color: "#86868b" }}>Real colors.</span>
            </h2>
            <p
              className="mt-4 mx-auto"
              style={{ maxWidth: 480, fontSize: 15, lineHeight: 1.55, color: "#86868b" }}
            >
              Sourced directly from Apple&apos;s official Design Resources. 
              Not recreated, not traced — the actual PNGs Apple ships to developers.
            </p>
          </FadeSection>

          {/* 5-device showcase spread */}
          <FadeSection>
            <div className="flex items-end justify-center gap-3 sm:gap-5 md:gap-8">
              <motion.div
                style={{ transform: "rotate(-6deg)", transformOrigin: "bottom center", opacity: 0.7 }}
              >
                <DeviceMockup device={IPHONE_15_PRO} width={120} color="Natural Titanium" showStatusBar />
              </motion.div>
              <motion.div
                style={{ transform: "rotate(-3deg)", transformOrigin: "bottom center" }}
              >
                <DeviceMockup device={IPHONE_16} width={150} color="Teal" showStatusBar />
              </motion.div>
              <motion.div style={{ zIndex: 10 }}>
                <DeviceMockup device={IPHONE_16_PRO_MAX} width={200} color="Natural Titanium" showStatusBar />
              </motion.div>
              <motion.div
                style={{ transform: "rotate(3deg)", transformOrigin: "bottom center" }}
              >
                <DeviceMockup device={IPHONE_AIR} width={150} color="Light Gold" showStatusBar />
              </motion.div>
              <motion.div
                style={{ transform: "rotate(6deg)", transformOrigin: "bottom center", opacity: 0.7 }}
              >
                <DeviceMockup device={IPHONE_17_PRO} width={120} color="Cosmic Orange" showStatusBar />
              </motion.div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PRO SECTION                                 */}
      {/* ═══════════════════════════════════════════ */}
      <section id="pro" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeSection className="text-center mb-14">
            <span
              className="inline-block text-[11px] font-medium uppercase tracking-widest mb-3"
              style={{ color: "#a1a1a6" }}
            >
              Pricing
            </span>
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{ color: "#1d1d1f", letterSpacing: "-0.03em" }}
            >
              Simple pricing.
              <br />
              <span style={{ color: "#86868b" }}>Pay once, use forever.</span>
            </h2>
            <p
              className="mt-4 mx-auto"
              style={{ maxWidth: 460, fontSize: 15, lineHeight: 1.55, color: "#86868b" }}
            >
              Start free with the essentials. Unlock exports, video tools, and more with a one-time purchase.
            </p>
          </FadeSection>

          {/* Two-card pricing grid */}
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-5" style={{ maxWidth: 720 }}>

            {/* ── Free Card ── */}
            <FadeSection>
              <div
                className="rounded-3xl p-7 sm:p-8 relative h-full flex flex-col"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e5e5",
                }}
              >
                <div className="mb-6">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#86868b", letterSpacing: "0.06em" }}
                  >
                    Free
                  </span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span
                      className="text-4xl font-semibold"
                      style={{ color: "#1d1d1f", letterSpacing: "-0.04em" }}
                    >
                      $0
                    </span>
                  </div>
                  <p
                    className="mt-1.5"
                    style={{ fontSize: 13, color: "#a1a1a6" }}
                  >
                    Forever free. No limits.
                  </p>
                </div>

                <div className="flex flex-col gap-3 mb-8 flex-1">
                  {FREE_FEATURES.map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <CheckIcon />
                      <span className="text-[13px]" style={{ color: "#1d1d1f" }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/playground"
                  className="flex items-center justify-center gap-2 w-full rounded-xl font-semibold"
                  style={{
                    padding: "13px 24px",
                    fontSize: 14,
                    backgroundColor: "#f5f5f7",
                    color: "#1d1d1f",
                    textDecoration: "none",
                    border: "1px solid #e5e5e5",
                    transition: "background-color 150ms ease, border-color 150ms ease",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ebebed";
                    e.currentTarget.style.borderColor = "#d5d5d5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f5f5f7";
                    e.currentTarget.style.borderColor = "#e5e5e5";
                  }}
                >
                  Get Started
                  <ArrowRightIcon />
                </Link>
              </div>
            </FadeSection>

            {/* ── Pro Card ── */}
            <FadeSection delay={0.08}>
              <div
                className="rounded-3xl p-7 sm:p-8 relative h-full flex flex-col"
                style={{
                  backgroundColor: "#1d1d1f",
                  border: "1px solid #3a3a3c",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                {/* Accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                  }}
                />

                {/* Popular badge */}
                <div
                  className="absolute -top-3 left-1/2 rounded-full px-3 py-1"
                  style={{
                    transform: "translateX(-50%)",
                    backgroundColor: "#ffffff",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#1d1d1f",
                    letterSpacing: "0.02em",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  Most Popular
                </div>

                <div className="mb-6">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}
                  >
                    Pro
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span
                      className="text-4xl font-semibold"
                      style={{ color: "#f5f5f7", letterSpacing: "-0.04em" }}
                    >
                      $25
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      one-time
                    </span>
                  </div>
                  <p
                    className="mt-1.5"
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}
                  >
                    Lifetime access. No subscriptions.
                  </p>
                </div>

                <div className="flex flex-col gap-3 mb-8 flex-1">
                  {PRO_FEATURES.map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5f5f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[13px]" style={{ color: "#f5f5f7" }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className="flex items-center justify-center gap-2 w-full rounded-xl font-semibold cursor-pointer"
                  style={{
                    padding: "13px 24px",
                    fontSize: 14,
                    backgroundColor: "#ffffff",
                    color: "#1d1d1f",
                    border: "none",
                    transition: "opacity 150ms ease",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  Get Lifetime Access
                  <ArrowRightIcon />
                </button>

                <p
                  className="text-center mt-3.5"
                  style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}
                >
                  One payment. Yours forever.
                </p>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FINAL CTA                                   */}
      {/* ═══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32"
        style={{
          backgroundColor: "#1d1d1f",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 text-center">
          <FadeSection>
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
              style={{ color: "#f5f5f7", letterSpacing: "-0.03em" }}
            >
              Ready to mock up?
            </h2>
            <p
              className="mx-auto mb-8"
              style={{ maxWidth: 400, fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.5)" }}
            >
              Open the playground and start building beautiful device mockups in seconds.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 rounded-full font-semibold"
                style={{
                  padding: "12px 28px",
                  fontSize: 14,
                  backgroundColor: "#ffffff",
                  color: "#1d1d1f",
                  textDecoration: "none",
                  transition: "opacity 150ms ease",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                Open Playground
                <ArrowRightIcon />
              </Link>
              <a
                href="https://github.com/Mecury-Labs/mockify"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full font-medium"
                style={{
                  padding: "12px 24px",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  textDecoration: "none",
                  transition: "background-color 150ms ease, border-color 150ms ease",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                GitHub
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FOOTER                                      */}
      {/* ═══════════════════════════════════════════ */}
      <footer
        className="py-8"
        style={{
          backgroundColor: "#1d1d1f",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <span
            className="text-[11px]"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Mockify — by Mercury Labs
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Mecury-Labs/mockify"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px]"
              style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 150ms ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
            >
              GitHub
            </a>
            <a
              href="/playground"
              className="text-[11px]"
              style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 150ms ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
            >
              Playground
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
