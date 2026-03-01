#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readdirSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = resolve(__dirname, "..", "assets");

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const GREEN = "\x1b[32m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";

function log(msg) {
  console.log(msg);
}

function success(msg) {
  log(`${GREEN}${"  \u2713"}${RESET} ${msg}`);
}

function warn(msg) {
  log(`${YELLOW}${"  !"}${RESET} ${msg}`);
}

function error(msg) {
  log(`${RED}${"  \u2717"}${RESET} ${msg}`);
}

function printHelp() {
  log("");
  log(`${BOLD}  @mockify/react${RESET} ${DIM}— iPhone device mockups for React${RESET}`);
  log("");
  log(`  ${BOLD}Usage:${RESET}`);
  log(`    npx mockify init ${DIM}[--dest <path>]${RESET}`);
  log("");
  log(`  ${BOLD}Commands:${RESET}`);
  log(`    init    Copy device frame PNGs to your public directory`);
  log("");
  log(`  ${BOLD}Options:${RESET}`);
  log(`    --dest  Destination path ${DIM}(default: public/mockify)${RESET}`);
  log(`    --help  Show this help message`);
  log("");
  log(`  ${BOLD}Example:${RESET}`);
  log(`    ${DIM}$${RESET} npx mockify init`);
  log(`    ${DIM}$${RESET} npx mockify init --dest public/assets/mockify`);
  log("");
}

function countFiles(dir) {
  let count = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      count += countFiles(join(dir, entry.name));
    } else {
      count++;
    }
  }
  return count;
}

function init(dest) {
  log("");
  log(`${BOLD}  @mockify/react${RESET} ${DIM}init${RESET}`);
  log("");

  // Check assets exist
  if (!existsSync(ASSETS_DIR)) {
    error("Assets directory not found in package. Try reinstalling @mockify/react.");
    process.exit(1);
  }

  const devicesSource = join(ASSETS_DIR, "devices");
  const statusBarSource = join(ASSETS_DIR, "status-bar");

  if (!existsSync(devicesSource)) {
    error("Device frame PNGs not found. Package may be corrupted.");
    process.exit(1);
  }

  const destPath = resolve(process.cwd(), dest);
  const devicesDir = join(destPath, "devices");
  const statusBarDir = join(destPath, "status-bar");

  // Check if already initialized
  if (existsSync(devicesDir)) {
    const existing = countFiles(devicesDir);
    warn(`${destPath} already exists (${existing} files)`);
    log(`${DIM}    Overwriting...${RESET}`);
  }

  // Copy device frames
  mkdirSync(devicesDir, { recursive: true });
  cpSync(devicesSource, devicesDir, { recursive: true });
  const deviceCount = countFiles(devicesDir);
  success(`Copied ${BOLD}${deviceCount}${RESET} device frame PNGs`);

  // Copy status bar overlays
  if (existsSync(statusBarSource)) {
    mkdirSync(statusBarDir, { recursive: true });
    cpSync(statusBarSource, statusBarDir, { recursive: true });
    const statusCount = countFiles(statusBarDir);
    success(`Copied ${BOLD}${statusCount}${RESET} status bar PNGs`);
  }

  log("");
  log(`  ${GREEN}${BOLD}Done!${RESET} Assets copied to ${CYAN}${dest}${RESET}`);
  log("");
  log(`  ${BOLD}Quick start:${RESET}`);
  log("");
  log(`  ${DIM}import { DeviceMockup, iPhone16Pro } from "@mockify/react";${RESET}`);
  log("");
  log(`  ${DIM}<DeviceMockup device={iPhone16Pro} width={320}>${RESET}`);
  log(`  ${DIM}  <img src="/screenshot.png" ... />${RESET}`);
  log(`  ${DIM}</DeviceMockup>${RESET}`);
  log("");

  if (dest !== "public/mockify") {
    log(`  ${YELLOW}Note:${RESET} Set ${BOLD}basePath="${dest.replace(/^public/, "")}"${RESET} on DeviceMockup`);
    log("");
  }
}

// Parse args
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === "--help" || command === "-h") {
  printHelp();
  process.exit(0);
}

if (command === "init") {
  const destIdx = args.indexOf("--dest");
  const dest = destIdx !== -1 && args[destIdx + 1] ? args[destIdx + 1] : "public/mockify";
  init(dest);
} else {
  error(`Unknown command: ${command}`);
  printHelp();
  process.exit(1);
}
