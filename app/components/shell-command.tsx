"use client";

import { useState } from "react";

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

export default function ShellCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Split "npx mockify add iphone16-pro" into tokens for highlighting
  const tokens = command.split(" ");

  return (
    <div
      className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-sm"
      style={{ backgroundColor: "#f5f5f7", color: "#6e6e73", border: "1px solid #e5e5e5" }}
    >
      <span style={{ color: "#a1a1aa" }}>$</span>
      {tokens[0] && <span style={{ color: "#8250df" }}>{tokens[0]}</span>}
      {tokens[1] && <span style={{ color: "#1d1d1f" }}>{tokens[1]}</span>}
      {tokens[2] && <span style={{ color: "#1a7f37" }}>{tokens[2]}</span>}
      {tokens[3] && <span style={{ color: "#953800" }}>{tokens[3]}</span>}

      <button
        onClick={handleCopy}
        className="ml-1 cursor-pointer touch-hitbox"
        style={{
          color: copied ? "#1a7f37" : "#a1a1aa",
          transition: "color 150ms ease",
        }}
        title="Copy to clipboard"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}
