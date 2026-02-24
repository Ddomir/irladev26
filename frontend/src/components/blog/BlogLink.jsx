export default function BlogLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-dotted text-secondary hover:text-accent transition-colors"
    >
      {children}
    </a>
  )
}
