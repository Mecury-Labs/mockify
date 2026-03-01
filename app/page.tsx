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

        <IPhoneMockup width={340}>
          <button className="absolute inset-0 w-full h-full bg-[#f2f2f2] hover:opacity-70 transition-opacity flex items-center justify-center cursor-pointer">
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
          </button>
        </IPhoneMockup>
      </main>
    </div>
  );
}
