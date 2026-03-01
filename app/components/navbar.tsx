"use client";

import { useEffect, useState } from "react";

/* ── Mockify Logo ──
 * A refined device frame with dynamic island, screen gradient,
 * and a soft inner glow for depth.
 */
const MockifyLogo = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="screenGrad" x1="16" y1="5" x2="16" y2="27" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fafafa" />
        <stop offset="100%" stopColor="#e8e8ed" />
      </linearGradient>
      <linearGradient id="frameGrad" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2c2c2e" />
        <stop offset="100%" stopColor="#1a1a1c" />
      </linearGradient>
    </defs>
    {/* Device frame */}
    <rect x="6" y="2" width="20" height="28" rx="6" fill="url(#frameGrad)" />
    {/* Frame highlight edge */}
    <rect x="6.5" y="2.5" width="19" height="27" rx="5.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
    {/* Screen */}
    <rect x="8" y="4.5" width="16" height="23" rx="4" fill="url(#screenGrad)" />
    {/* Dynamic island */}
    <rect x="13" y="6" width="6" height="2.5" rx="1.25" fill="#1d1d1f" />
    {/* Content lines */}
    <rect x="10.5" y="11.5" width="7" height="1.2" rx="0.6" fill="#c7c7cc" />
    <rect x="10.5" y="14" width="4.5" height="1.2" rx="0.6" fill="#d1d1d6" />
    {/* Action button dot */}
    <circle cx="16" cy="19.5" r="1.8" fill="none" stroke="#c7c7cc" strokeWidth="0.8" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const StarIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-5 left-1/2 z-50"
      style={{
        transform: "translateX(-50%)",
        transition: "top 300ms cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      <div
        className="flex items-center justify-between rounded-full"
        style={{
          minWidth: 440,
          padding: "10px 10px 10px 20px",
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.82)"
            : "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          border: scrolled
            ? "1px solid rgba(0, 0, 0, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.04)",
          boxShadow: scrolled
            ? "0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04), inset 0 0.5px 0 rgba(255,255,255,0.6)"
            : "0 2px 10px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02), inset 0 0.5px 0 rgba(255,255,255,0.8)",
          transition:
            "background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
        }}
      >
        {/* Logo + wordmark */}
        <a
          href="/"
          className="flex items-center gap-2.5"
          style={{ textDecoration: "none" }}
        >
          <MockifyLogo />
          <span
            className="text-[13px] font-semibold tracking-tight"
            style={{ color: "#1d1d1f", letterSpacing: "-0.01em" }}
          >
            Mockify
          </span>
          <span
            className="text-[10px] font-medium rounded-full px-1.5 py-0.5"
            style={{
              color: "#6e6e73",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              letterSpacing: "0.02em",
            }}
          >
            Beta
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Playground link */}
          <a
            href="/playground"
            className="hidden sm:flex items-center rounded-full cursor-pointer"
            style={{
              padding: "7px 14px",
              color: "#6e6e73",
              fontSize: "12px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "color 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#1d1d1f";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6e6e73";
            }}
          >
            Playground
          </a>

          {/* GitHub button */}
          <a
            href="https://github.com/Mecury-Labs/mockify"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full cursor-pointer"
            style={{
              padding: "7px 14px 7px 12px",
              color: "#1d1d1f",
              backgroundColor: "#f0f0f0",
              border: "1px solid #e0e0e0",
              transition: "all 150ms ease",
              fontSize: "12px",
              fontWeight: 500,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e8e8e8";
              e.currentTarget.style.borderColor = "#d4d4d4";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
              e.currentTarget.style.borderColor = "#e0e0e0";
            }}
          >
            <GitHubIcon />
            <span className="hidden sm:inline">Star</span>
            <StarIcon />
          </a>

          {/* Try Pro button */}
          <a
            href="/#pro"
            className="flex items-center gap-1.5 rounded-full cursor-pointer"
            style={{
              padding: "7px 16px",
              color: "#ffffff",
              backgroundColor: "#1d1d1f",
              transition: "opacity 150ms ease",
              fontSize: "12px",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Try Pro
          </a>
        </div>
      </div>
    </nav>
  );
}
