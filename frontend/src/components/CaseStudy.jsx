import resumePDF from '../assets/Dominic_Irla.pdf'
import { CASE_STUDIES } from '../data/caseStudies'

// Shared building blocks for the case study pages, so all three read the same.

export function CaseHeader({ eyebrow, title, intro, facts }) {
  return (
    <header className="px-6 md:px-10 pt-10 md:pt-14 pb-16 max-w-5xl mx-auto flex flex-col gap-6">
      <a href="/case-studies" className="text-secondary hover:text-primary transition-colors text-xs font-semibold tracking-widest uppercase w-fit">
        ← Case studies
      </a>
      <span className="text-secondary text-xs font-semibold tracking-widest uppercase">{eyebrow}</span>
      <h1 className="font-literata text-5xl md:text-8xl leading-none text-balance">{title}</h1>
      <p className="text-lg md:text-xl max-w-3xl leading-relaxed">{intro}</p>
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/15 rounded-2xl overflow-hidden mt-4">
        {facts.map((f) => (
          <div key={f.label} className="bg-[#070d4d] p-5 flex flex-col gap-1">
            <dt className="text-secondary text-xs font-semibold tracking-widest uppercase">{f.label}</dt>
            <dd className="text-sm leading-relaxed">{f.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  )
}

export function CaseBody({ children }) {
  return <div className="px-6 md:px-10 max-w-5xl mx-auto flex flex-col gap-24 pb-24">{children}</div>
}

export function SectionTitle({ eyebrow, children }) {
  return (
    <div className="flex flex-col gap-2 mb-8">
      {eyebrow && <span className="text-secondary text-xs font-semibold tracking-widest uppercase">{eyebrow}</span>}
      <h2 className="font-literata text-primary text-3xl md:text-4xl text-balance">{children}</h2>
    </div>
  )
}

export function Lead({ children }) {
  return <p className="max-w-3xl leading-relaxed mb-8">{children}</p>
}

export function Shot({ src, alt, caption, width, height, className = '' }) {
  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <a href={src} target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden shadow-2xl ring-1 ring-primary/20 bg-white">
        <img src={src} alt={alt} width={width} height={height} loading="lazy" className="w-full h-auto block" />
      </a>
      {caption && <figcaption className="text-secondary text-sm leading-relaxed">{caption}</figcaption>}
    </figure>
  )
}

export function ProblemColumns({ items }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 text-base leading-relaxed">
      {items.map((p) => (
        <p key={p.lead}><span className="text-accent font-semibold">{p.lead}</span> {p.body}</p>
      ))}
    </div>
  )
}

export function CardGrid({ items }) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {items.map((p) => (
        <div key={p.title} className="rounded-2xl border border-primary/15 p-6 flex flex-col gap-2">
          <h3 className="text-xl font-semibold">{p.title}</h3>
          <p className="text-sm leading-relaxed text-primary/90">{p.body}</p>
        </div>
      ))}
    </div>
  )
}

export function DecisionGrid({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
      {items.map((d) => (
        <div key={d.title} className="flex flex-col gap-2 border-t border-primary/15 pt-5">
          <h3 className="text-lg font-semibold">{d.title}</h3>
          <p className="text-sm leading-relaxed text-primary/90">{d.body}</p>
        </div>
      ))}
    </div>
  )
}

export function LessonGrid({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {items.map((l) => (
        <div key={l.title} className="rounded-2xl bg-[#070d4d] p-6 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-accent">{l.title}</h3>
          <p className="text-sm leading-relaxed text-primary/90">{l.body}</p>
        </div>
      ))}
    </div>
  )
}

export function BulletList({ items }) {
  return (
    <ul className="flex flex-col gap-3 max-w-3xl">
      {items.map((n) => (
        <li key={n} className="flex gap-3 leading-relaxed">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
          {n}
        </li>
      ))}
    </ul>
  )
}

// Numbered because the order is the point: each step happens after the last.
export function FlowSteps({ steps }) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-4 gap-3">
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-2xl border border-primary/15 p-5 flex flex-col gap-2">
          <span className="text-accent font-literata text-2xl leading-none">{i + 1}</span>
          <h3 className="font-semibold">{s.title}</h3>
          <p className="text-sm leading-relaxed text-primary/90">{s.body}</p>
        </li>
      ))}
    </ol>
  )
}

export function Stats({ items }) {
  return (
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((s) => (
        <div key={s.label} className="flex flex-col gap-1 border-l-2 border-accent pl-4">
          <dt className="order-2 text-sm text-primary/80 leading-snug">{s.label}</dt>
          <dd className="order-1 font-literata text-4xl md:text-5xl text-primary tabular-nums">{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function MoreCaseStudies({ current }) {
  const others = CASE_STUDIES.filter((c) => c.slug !== current)
  return (
    <section>
      <SectionTitle eyebrow="More case studies">Keep reading</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-5">
        {others.map((c) => (
          <a key={c.slug} href={c.path} className="group rounded-2xl border border-primary/15 hover:border-primary/40 transition-colors overflow-hidden flex flex-col">
            <img src={c.image} alt="" loading="lazy" className="w-full h-40 object-cover object-[0%_0%] bg-white" />
            <div className="p-5 flex flex-col gap-1">
              <span className="text-secondary text-xs font-semibold tracking-widest uppercase">{c.org}</span>
              <span className="text-xl font-semibold group-hover:text-accent transition-colors">{c.title} →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export function CaseFooter({ note }) {
  return (
    <footer className="border-t border-primary/15 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
      <p className="text-secondary max-w-xl">{note}</p>
      <div className="flex gap-5 font-semibold">
        <a href={resumePDF} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">Resume →</a>
        <a href="/" className="text-primary hover:text-accent transition-colors">More about me →</a>
      </div>
    </footer>
  )
}
