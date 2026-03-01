import { IPHONE_13 } from "../components/devices/iphone-13";
import { IPHONE_13_MINI } from "../components/devices/iphone-13-mini";
import { IPHONE_13_PRO } from "../components/devices/iphone-13-pro";
import { IPHONE_13_PRO_MAX } from "../components/devices/iphone-13-pro-max";
import { IPHONE_14 } from "../components/devices/iphone-14";
import { IPHONE_14_PLUS } from "../components/devices/iphone-14-plus";
import { IPHONE_14_PRO } from "../components/devices/iphone-14-pro";
import { IPHONE_14_PRO_MAX } from "../components/devices/iphone-14-pro-max";
import { IPHONE_15 } from "../components/devices/iphone-15";
import { IPHONE_15_PLUS } from "../components/devices/iphone-15-plus";
import { IPHONE_15_PRO } from "../components/devices/iphone-15-pro";
import { IPHONE_15_PRO_MAX } from "../components/devices/iphone-15-pro-max";
import { IPHONE_16 } from "../components/devices/iphone-16";
import { IPHONE_16_PLUS } from "../components/devices/iphone-16-plus";
import { IPHONE_16_PRO } from "../components/devices/iphone-16-pro";
import { IPHONE_16_PRO_MAX } from "../components/devices/iphone-16-pro-max";
import { IPHONE_17 } from "../components/devices/iphone-17";
import { IPHONE_17_PRO } from "../components/devices/iphone-17-pro";
import { IPHONE_17_PRO_MAX } from "../components/devices/iphone-17-pro-max";
import { IPHONE_AIR } from "../components/devices/iphone-air";
import MockupEditor, { type DeviceEntry } from "../components/mockup-editor";
import ShellCommand from "../components/shell-command";

const ALL_DEVICES: DeviceEntry[] = [
  { name: "iPhone 17", config: IPHONE_17 },
  { name: "iPhone 17 Pro", config: IPHONE_17_PRO },
  { name: "iPhone 17 Pro Max", config: IPHONE_17_PRO_MAX },
  { name: "iPhone Air", config: IPHONE_AIR },
  { name: "iPhone 16", config: IPHONE_16 },
  { name: "iPhone 16 Plus", config: IPHONE_16_PLUS },
  { name: "iPhone 16 Pro", config: IPHONE_16_PRO },
  { name: "iPhone 16 Pro Max", config: IPHONE_16_PRO_MAX },
  { name: "iPhone 15", config: IPHONE_15 },
  { name: "iPhone 15 Plus", config: IPHONE_15_PLUS },
  { name: "iPhone 15 Pro", config: IPHONE_15_PRO },
  { name: "iPhone 15 Pro Max", config: IPHONE_15_PRO_MAX },
  { name: "iPhone 14", config: IPHONE_14 },
  { name: "iPhone 14 Plus", config: IPHONE_14_PLUS },
  { name: "iPhone 14 Pro", config: IPHONE_14_PRO },
  { name: "iPhone 14 Pro Max", config: IPHONE_14_PRO_MAX },
  { name: "iPhone 13", config: IPHONE_13 },
  { name: "iPhone 13 Mini", config: IPHONE_13_MINI },
  { name: "iPhone 13 Pro", config: IPHONE_13_PRO },
  { name: "iPhone 13 Pro Max", config: IPHONE_13_PRO_MAX },
];

export default function Playground() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#f5f5f7" }}
    >
      <main className="mx-auto max-w-5xl px-6 pt-24 pb-16">
        <div className="text-center mb-12">
          <p className="text-sm text-zinc-500">
            iPhone device mockups — all models
          </p>
          <ShellCommand command="npm install @mockify/react" />
        </div>

        <MockupEditor devices={ALL_DEVICES} />
      </main>
    </div>
  );
}
