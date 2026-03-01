import IPhoneMockup from "./components/iphone-mockup";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e8e8ed] font-sans">
      <main className="flex flex-col items-center gap-12 py-20 px-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Mockify
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            iPhone 16 device mockup
          </p>
        </div>

        <IPhoneMockup scale={1.3} frameColor="black">
          {/* Example screen content — a minimal iOS-style home screen */}
          <div className="flex h-full w-full flex-col bg-[#f2f2f7]">
            {/* Spacer for status bar area */}
            <div className="h-[15%]" />

            {/* Content */}
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8">
              <div className="grid grid-cols-4 gap-3 w-full max-w-[240px]">
                {[
                  { color: "#007AFF", label: "Mail" },
                  { color: "#34C759", label: "Phone" },
                  { color: "#FF9500", label: "Notes" },
                  { color: "#AF52DE", label: "Photos" },
                  { color: "#FF2D55", label: "Music" },
                  { color: "#5AC8FA", label: "Maps" },
                  { color: "#FF3B30", label: "Clock" },
                  { color: "#30D158", label: "Health" },
                ].map((app) => (
                  <div
                    key={app.label}
                    className="flex flex-col items-center gap-1"
                  >
                    <div
                      className="rounded-[22%] aspect-square w-full"
                      style={{
                        background: app.color,
                        boxShadow: `0 1px 3px ${app.color}33`,
                      }}
                    />
                    <span className="text-[7px] text-zinc-600 leading-none">
                      {app.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </IPhoneMockup>
      </main>
    </div>
  );
}
