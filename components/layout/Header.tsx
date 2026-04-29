import { Search, HelpCircle, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-canvas/80 backdrop-blur-xl border-b border-line">
      <div className="flex items-center justify-between gap-6 h-[72px] px-10 max-w-[1400px] mx-auto w-full">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="group relative flex items-center h-11 rounded-[12px] border border-line bg-surface/60 transition-all duration-200 ease-smooth focus-within:bg-canvas focus-within:border-gold focus-within:shadow-focus">
            <Search
              className="ml-4 w-[18px] h-[18px] text-ink-muted group-focus-within:text-gold transition-colors"
              strokeWidth={1.75}
            />
            <input
              type="text"
              placeholder="Rechercher un bien, client ou zone…"
              className="flex-1 bg-transparent px-3.5 text-[14px] text-ink placeholder:text-ink-soft outline-none"
            />
            <kbd className="mr-3 hidden md:flex items-center gap-1 rounded-md border border-line bg-canvas px-1.5 py-0.5 text-[10px] font-medium text-ink-soft">
              ⌘ K
            </kbd>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Aide"
            className="flex items-center justify-center w-10 h-10 rounded-full text-ink-muted hover:bg-surface hover:text-ink transition-colors"
          >
            <HelpCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex items-center justify-center w-10 h-10 rounded-full text-ink-muted hover:bg-surface hover:text-ink transition-colors"
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.5} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-gold ring-2 ring-canvas" />
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-line">
            <div className="text-right hidden md:block">
              <div className="text-[13px] font-medium text-ink leading-tight">
                Achref Othmani
              </div>
              <div className="text-[11px] text-ink-muted leading-tight">
                Agent senior
              </div>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-deep flex items-center justify-center text-white text-[13px] font-medium ring-2 ring-canvas shadow-card">
                AO
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-canvas" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
