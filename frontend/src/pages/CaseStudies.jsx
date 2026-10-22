import { usePageTitle } from '../hooks/usePageTitle'
import { CASE_STUDIES } from '../data/caseStudies'

export default function CaseStudies() {
  usePageTitle('Case studies — Dominic Irla')

  return (
    <div className="relative text-primary px-6 md:px-10 pb-24">
      <header className="max-w-5xl mx-auto pt-10 md:pt-14 pb-14 flex flex-col gap-5">
        <span className="text-secondary text-xs font-semibold tracking-widest uppercase">Case studies</span>
        <h1 className="font-literata text-5xl md:text-7xl leading-none text-balance">Things I’ve built that people rely on</h1>
        <p className="text-lg max-w-2xl leading-relaxed">
          Three systems in production, each with the problem it solved, how it works, and the decisions behind it.
        </p>
      </header>

      <ol className="max-w-5xl mx-auto flex flex-col gap-14">
        {CASE_STUDIES.map((c, i) => (
          <li key={c.slug}>
            <a
              href={c.path}
              className={`group grid md:grid-cols-2 gap-6 md:gap-10 items-center ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-primary/20 bg-white aspect-[16/10]">
                <img
                  src={c.image}
                  alt={c.imageAlt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover object-[0%_0%] transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-secondary text-xs font-semibold tracking-widest uppercase">{c.org}</span>
                <h2 className="font-literata text-3xl md:text-4xl group-hover:text-accent transition-colors">{c.title}</h2>
                <p className="leading-relaxed text-primary/90">{c.summary}</p>
                <ul className="flex flex-wrap gap-2 mt-1" aria-label="Built with">
                  {c.tags.map((t) => (
                    <li key={t} className="text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/25 text-primary/90">{t}</li>
                  ))}
                </ul>
                <span className="mt-2 text-accent text-sm font-semibold">Read the case study →</span>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
