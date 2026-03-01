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
import DeviceCard from "../components/device-card";
import type { DeviceConfig } from "../components/device-mockup";

const deviceGroups: {
  label: string;
  devices: { name: string; config: DeviceConfig }[];
}[] = [
  {
    label: "iPhone 17",
    devices: [
      { name: "iPhone 17", config: IPHONE_17 },
      { name: "iPhone 17 Pro", config: IPHONE_17_PRO },
      { name: "iPhone 17 Pro Max", config: IPHONE_17_PRO_MAX },
      { name: "iPhone Air", config: IPHONE_AIR },
    ],
  },
  {
    label: "iPhone 16",
    devices: [
      { name: "iPhone 16", config: IPHONE_16 },
      { name: "iPhone 16 Plus", config: IPHONE_16_PLUS },
      { name: "iPhone 16 Pro", config: IPHONE_16_PRO },
      { name: "iPhone 16 Pro Max", config: IPHONE_16_PRO_MAX },
    ],
  },
  {
    label: "iPhone 15",
    devices: [
      { name: "iPhone 15", config: IPHONE_15 },
      { name: "iPhone 15 Plus", config: IPHONE_15_PLUS },
      { name: "iPhone 15 Pro", config: IPHONE_15_PRO },
      { name: "iPhone 15 Pro Max", config: IPHONE_15_PRO_MAX },
    ],
  },
  {
    label: "iPhone 14",
    devices: [
      { name: "iPhone 14", config: IPHONE_14 },
      { name: "iPhone 14 Plus", config: IPHONE_14_PLUS },
      { name: "iPhone 14 Pro", config: IPHONE_14_PRO },
      { name: "iPhone 14 Pro Max", config: IPHONE_14_PRO_MAX },
    ],
  },
  {
    label: "iPhone 13",
    devices: [
      { name: "iPhone 13", config: IPHONE_13 },
      { name: "iPhone 13 Mini", config: IPHONE_13_MINI },
      { name: "iPhone 13 Pro", config: IPHONE_13_PRO },
      { name: "iPhone 13 Pro Max", config: IPHONE_13_PRO_MAX },
    ],
  },
];

export default function Examples() {
  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#f5f5f7" }}>
      <main className="mx-auto max-w-7xl px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Mockify
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            iPhone device mockups — all models
          </p>

          <div
            className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-sm"
            style={{ backgroundColor: "#1d1d1f", color: "#a1a1aa" }}
          >
            <span style={{ color: "#6e6e73" }}>$</span>
            <span style={{ color: "#c084fc" }}>npx</span>
            <span style={{ color: "#e5e5e5" }}>mockify</span>
            <span style={{ color: "#34d399" }}>add</span>
            <span style={{ color: "#fbbf24" }}>iphone16-pro</span>
          </div>
        </div>

        <div className="flex flex-col gap-20">
          {deviceGroups.map((group) => (
            <section key={group.label}>
              <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-8">
                {group.label}
              </h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {group.devices.map(({ name, config }) => (
                  <DeviceCard
                    key={name}
                    name={name}
                    config={config}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
