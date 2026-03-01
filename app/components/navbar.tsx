"use client";

/* ── Mockify Logo ──
 * A stylized device frame with a dynamic island pill at top
 * and a subtle screen shine, representing device mockups.
 */
const MockifyLogo = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Device frame — rounded rect */}
    <rect
      x="6"
      y="2"
      width="20"
      height="28"
      rx="6"
      fill="#1d1d1f"
    />
    {/* Screen area */}
    <rect
      x="8"
      y="4.5"
      width="16"
      height="23"
      rx="4"
      fill="#f5f5f7"
    />
    {/* Dynamic island pill */}
    <rect
      x="13"
      y="6"
      width="6"
      height="2.5"
      rx="1.25"
      fill="#1d1d1f"
    />
    {/* Screen shine accent */}
    <rect
      x="10"
      y="11"
      width="8"
      height="1.5"
      rx="0.75"
      fill="#d1d1d6"
    />
    <rect
      x="10"
      y="14"
      width="5"
      height="1.5"
      rx="0.75"
      fill="#e0e0e5"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const StarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function Navbar() {
  return (
    <nav
      className="fixed top-4 left-1/2 z-50"
      style={{ transform: "translateX(-50%)" }}
    >
      <div
        className="flex items-center gap-3 rounded-2xl px-4 py-2.5"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px) saturate(180%)",
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          boxShadow:
            "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)",
        }}
      >
        {/* Logo + wordmark */}
        <a href="/" className="flex items-center gap-2">
          <MockifyLogo />
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: "#1d1d1f" }}
          >
            Mockify
          </span>
        </a>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 18,
            backgroundColor: "rgba(0, 0, 0, 0.08)",
          }}
        />

        {/* GitHub button */}
        <a
          href="https://github.com/Mecury-Labs/mockify"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium cursor-pointer"
          style={{
            color: "#1d1d1f",
            backgroundColor: "transparent",
            transition: "background-color 150ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <GitHubIcon />
          <span className="hidden sm:inline">Star on GitHub</span>
          <StarIcon />
        </a>
      </div>
    </nav>
  );
}
