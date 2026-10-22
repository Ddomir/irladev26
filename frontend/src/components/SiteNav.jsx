import resumePDF from '../assets/Dominic_Irla.pdf'

const TABS = [
  { href: '/', label: 'About', match: (p) => p === '/' },
  { href: '/case-studies', label: 'Case Studies', match: (p) => p.startsWith('/case-studies') || p === '/coeconnect' },
]

export default function SiteNav({ path }) {
  return (
    <header className="relative z-20 px-6 md:px-10 pt-6">
      <nav className="flex items-center justify-between gap-4" aria-label="Main">
        <a href="/" className="font-mrdafoe text-3xl leading-none text-primary hover:text-accent transition-colors" aria-label="Dominic Irla, home">
          Irla
        </a>
        <div className="flex items-center gap-1 sm:gap-2 text-sm font-semibold">
          {TABS.map((t) => {
            const active = t.match(path)
            return (
              <a
                key={t.href}
                href={t.href}
                aria-current={active ? 'page' : undefined}
                className={`px-3 py-2 border-b-2 transition-colors ${active ? 'text-primary border-accent' : 'text-secondary border-transparent hover:text-primary'}`}
              >
                {t.label}
              </a>
            )
          })}
          <a
            href={resumePDF}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 border-b-2 border-transparent text-secondary hover:text-primary transition-colors"
          >
            Resume ↗
          </a>
        </div>
      </nav>
    </header>
  )
}
