export default function BlogList({ items }) {
  return (
    <div className="mx-4 sm:mx-8 rounded-xl border border-secondary/20 bg-secondary/5 px-6 py-4">
      <ul className="list-disc list-inside space-y-1.5 text-primary/80">
        {items.map((item, i) => (
          <li key={i} className="hover:scale-101 transition-transform">{item}</li>
        ))}
      </ul>
    </div>
  )
}
