import { useState } from 'react'
import { Maximize2, X } from 'lucide-react'

export default function BlogImage({ src, alt, size = 'lg', caption }) {
  const [open, setOpen] = useState(false)
  const widths = { sm: 'w-2/10', md: 'w-3/5', lg: 'w-4/5', full: 'w-full' }

  return (
    <>
      <div className="flex flex-col items-center my-4">
        <div className={`${widths[size] ?? widths.md} relative group`}>
          <img
            src={src}
            alt={alt}
            className="w-full rounded-xl border border-secondary/20 hover:scale-101 transition-transform"
          />
          <button
            onClick={() => setOpen(true)}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-background/70 text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            title="Fullscreen"
          >
            <Maximize2 size={14} />
          </button>
        </div>
        {caption && <span className="text-sm text-secondary mt-2">{caption}</span>}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg bg-background/70 text-primary hover:bg-background transition-colors"
          >
            <X size={18} />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full rounded-xl border border-secondary/20 object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
