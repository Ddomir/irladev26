export default function BlogLayout({ title, description, date, image, children }) {
  return (
    <article className="pt-24 pb-20 px-6 max-w-3xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        {date && (
          <p className="text-secondary text-xs font-medium uppercase tracking-widest mb-3">{date}</p>
        )}
        <h1 className="text-primary text-4xl font-semibold mb-4">{title}</h1>
        {description && (
          <p className="text-primary/60 text-lg">{description}</p>
        )}
        {image && (
          <img src={image} alt={title} className="w-full rounded-2xl mt-8 object-cover" />
        )}
      </header>

      {/* Content */}
      <div className="space-y-16 text-primary/80 text-base leading-relaxed">
        {children}
      </div>
    </article>
  )
}
