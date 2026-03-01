import IPhone16 from "./components/devices/iphone-16";
import IPhone16Plus from "./components/devices/iphone-16-plus";
import IPhone16Pro from "./components/devices/iphone-16-pro";
import IPhone16ProMax from "./components/devices/iphone-16-pro-max";
import IPhone17 from "./components/devices/iphone-17";
import IPhone17Pro from "./components/devices/iphone-17-pro";
import IPhone17ProMax from "./components/devices/iphone-17-pro-max";
import IPhoneAir from "./components/devices/iphone-air";

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#adadad]"
    style={{ width: 32, height: 32 }}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const ScreenPlaceholder = () => (
  <button className="absolute inset-0 w-full h-full bg-[#f2f2f2] hover:opacity-70 transition-opacity flex items-center justify-center cursor-pointer">
    <PlusIcon />
  </button>
);

const devices = [
  { name: "iPhone 16", Component: IPhone16 },
  { name: "iPhone 16 Plus", Component: IPhone16Plus },
  { name: "iPhone 16 Pro", Component: IPhone16Pro },
  { name: "iPhone 16 Pro Max", Component: IPhone16ProMax },
  { name: "iPhone 17", Component: IPhone17 },
  { name: "iPhone 17 Pro", Component: IPhone17Pro },
  { name: "iPhone 17 Pro Max", Component: IPhone17ProMax },
  { name: "iPhone Air", Component: IPhoneAir },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e8e8ed] font-sans">
      <main className="mx-auto max-w-7xl px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Mockify
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            iPhone device mockups
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-3 lg:grid-cols-4">
          {devices.map(({ name, Component }) => (
            <div key={name} className="flex flex-col items-center gap-4">
              <Component width={200}>
                <ScreenPlaceholder />
              </Component>
              <span className="text-xs font-medium text-zinc-500">{name}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
