import IPhoneMockup from "./components/iphone-mockup";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 font-sans">
      <main className="flex flex-col items-center gap-10 py-20 px-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Mockify
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            iPhone 16 device mockup
          </p>
        </div>

        <IPhoneMockup scale={1.2}>
          {/* Example screen content */}
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6">
            <div className="h-10 w-10 rounded-xl bg-zinc-900 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </div>
            <p className="text-xs font-medium text-zinc-400">
              Drop your content here
            </p>
          </div>
        </IPhoneMockup>
      </main>
    </div>
  );
}
