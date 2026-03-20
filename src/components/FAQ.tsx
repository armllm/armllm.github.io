import { useState } from 'react'
import clsx from 'clsx'
import { FAQCategory } from '../data/faq2026'

interface FAQProps {
  categories: FAQCategory[]
}

export default function FAQ({ categories }: FAQProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title)
  }

  const toggleItem = (key: string) => {
    const newOpen = new Set(openItems)
    if (newOpen.has(key)) {
      newOpen.delete(key)
    } else {
      newOpen.add(key)
    }
    setOpenItems(newOpen)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {categories.map((category) => (
        <div
          key={category.title}
          className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => toggleCategory(category.title)}
            className="w-full px-6 py-5 flex items-center justify-between text-left"
          >
            <span className="text-accent font-bold text-lg">{category.title}</span>
            <span className="text-white/70 font-bold text-xl">
              {openCategory === category.title ? '−' : '+'}
            </span>
          </button>
          
          <div
            className={clsx(
              'transition-all duration-300 overflow-hidden',
              openCategory === category.title ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="px-6 pb-5 space-y-3">
              {category.items.map((item, idx) => {
                const itemKey = `${category.title}-${idx}`
                const isOpen = openItems.has(itemKey)
                
                return (
                  <div
                    key={itemKey}
                    className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-0.5"
                  >
                    <button
                      onClick={() => toggleItem(itemKey)}
                      className="w-full px-5 py-4 text-left font-semibold text-white/95"
                    >
                      {item.question}
                    </button>
                    <div
                      className={clsx(
                        'transition-all duration-300 overflow-hidden',
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <div
                        className="px-5 pb-4 text-white/85"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
