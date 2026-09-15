export default function Footer() {
  return (
    <footer className="border-t border-indigo-900/30 bg-[#0a0818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-white font-outfit">
            <span role="img" aria-label="shuttlecock">
              🏸
            </span>
            <span className="text-amber-400">Inspirit Vision</span>
            <span className="text-indigo-300/50 text-sm font-normal">2026</span>
          </div>

          <p className="text-indigo-400/40 text-sm">
            Women's Doubles Badminton Tournament
          </p>
        </div>
      </div>
    </footer>
  );
}
