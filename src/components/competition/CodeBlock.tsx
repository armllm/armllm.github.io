import { useState } from 'react'

interface Tab {
  label: string
  code: string
}

interface CodeBlockProps {
  tabs: Tab[]
  /** Optional filename shown in the title bar. */
  filename?: string
}

/** A small tabbed code viewer with a copy-to-clipboard button. */
export default function CodeBlock({ tabs, filename }: CodeBlockProps) {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tabs[active].code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard may be unavailable (e.g. insecure context); fail quietly.
    }
  }

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0b1020] shadow-lg shadow-black/30">
      <div className="flex items-center justify-between bg-white/[0.04] border-b border-white/10 px-3 py-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.length > 1 ? (
            tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActive(i)}
                className={
                  'px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ' +
                  (i === active ? 'bg-accent/20 text-accent' : 'text-white/55 hover:text-white/80')
                }
              >
                {tab.label}
              </button>
            ))
          ) : (
            <span className="px-2 text-white/50 text-xs font-mono">{filename || tabs[0].label}</span>
          )}
        </div>
        <button
          onClick={copy}
          className="px-3 py-1.5 rounded-md text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-[#c9d1e9] whitespace-pre">{tabs[active].code}</code>
      </pre>
    </div>
  )
}
