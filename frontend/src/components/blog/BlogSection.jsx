export default function BlogSection({ title, children }) {
  return (
    <div>
      <h2 className="text-primary text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
