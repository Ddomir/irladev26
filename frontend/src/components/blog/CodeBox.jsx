import { useState } from 'react'
import { Copy, Check, ChevronDown } from 'lucide-react'

export default function CodeBox({ language, code, output, scrollableOutput = false }) {
  const [copied, setCopied] = useState(false)
  const [outputOpen, setOutputOpen] = useState(true)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      console.error('Failed to copy', e)
    }
  }

  return (
    <div className="rounded-xl overflow-hidden border border-secondary/20 mb-4 mx-0 sm:mx-8 hover:scale-101 transition-transform">
      {/* Header */}
      <div className="bg-background/40 text-primary px-4 py-2 text-sm font-semibold flex justify-between items-center">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-accent hover:opacity-70 transition-opacity"
          title="Copy code"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span className="text-xs">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code */}
      <pre className="p-4 overflow-x-auto bg-primary/25 text-primary/90 text-sm font-mono leading-relaxed">
        <code className="whitespace-pre">{code}</code>
      </pre>

      {/* Output */}
      {output && (
        <div className="border-t border-secondary/20 bg-secondary/10">
          <button
            onClick={() => setOutputOpen(o => !o)}
            className="w-full px-4 py-2 flex items-center justify-between text-xs font-semibold text-secondary uppercase tracking-wider hover:text-primary transition-colors"
          >
            <span>Output</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${outputOpen ? 'rotate-180' : ''}`} />
          </button>
          {outputOpen && (
            <pre className={`px-4 pb-4 text-sm text-primary/70 font-mono ${scrollableOutput ? 'overflow-x-auto overflow-y-auto max-h-64 whitespace-pre' : 'whitespace-pre-wrap'}`}>
              {output.trimStart()}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}
