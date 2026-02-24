export default function BlogCallout({ items }) {
  return (
    <div className="mx-4 sm:mx-8 rounded-xl border border-secondary/20 bg-secondary/5 px-6 py-4">
      <ul className="list-disc list-inside space-y-2 text-primary/80">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
