export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /**
     * Pull-to-reveal effect: the outer wrapper uses a dark background.
     * On overscroll (iOS / macOS bounce), the dark color peeks through
     * above the lighter content area.
     */
    <div className="min-h-screen" style={{ backgroundColor: "#1d1d1f" }}>
      {children}
    </div>
  );
}
