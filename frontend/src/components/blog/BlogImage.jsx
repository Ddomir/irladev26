export default function BlogImage({ src, alt, size = 'md' }) {
  const widths = { sm: 'w-2/10', md: 'w-3/5', lg: 'w-4/5', full: 'w-full' }
  return (
    <div className="flex justify-center my-4">
      <img
        src={src}
        alt={alt}
        className={`${widths[size] ?? widths.md} rounded-xl border border-secondary/20`}
      />
    </div>
  )
}
