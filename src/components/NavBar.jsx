const NAV_LINKS = [
  { label: 'Search', page: 'search' },
  { label: 'My Library', page: 'library' },
  { label: 'Shopping List', page: 'list' },
]

export default function NavBar({ activePage, onNavigate }) {
  return (
    <nav className="bg-neutral-50 border-b border-neutral-200 px-space-xl py-space-md flex items-center justify-between gap-space-xl">
      <span className="text-h4 text-primary font-semibold whitespace-nowrap shrink-0">
        Clean Shopper
      </span>

      <div className="flex items-center gap-space-xl">
        {NAV_LINKS.map(({ label, page }) => {
          const isActive = activePage === page
          return (
            <button
              key={page}
              onClick={() => onNavigate?.(page)}
              className={`text-body whitespace-nowrap transition-colors ${
                isActive
                  ? 'text-primary font-semibold border-b-2 border-primary pb-[2px]'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {label}
            </button>
          )
        })}
        <button
          onClick={() => onNavigate?.('signin')}
          className="text-body whitespace-nowrap font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          Sign in
        </button>
      </div>
    </nav>
  )
}
