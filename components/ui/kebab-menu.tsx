"use client"

import { useState, useRef, useEffect } from "react"
import { MoreVertical } from "lucide-react"

export function KebabMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="More options"
        className="flex items-center justify-center w-8 h-8 rounded-full
          bg-white/60 backdrop-blur-sm border border-black/10
          hover:bg-white hover:scale-110 transition-all duration-200 shadow-sm"
      >
        <MoreVertical className="w-4 h-4 text-foreground/70" />
      </button>

      {open && (
        <div className="absolute left-0 top-10 z-50 min-w-[130px]
          bg-white/95 backdrop-blur-md rounded-xl shadow-xl
          border border-black/10 p-1.5 animate-fade-in"
        >
          {["Edit", "Delete", "Report"].map((action) => (
            <button
              key={action}
              onClick={() => setOpen(false)}
              className="w-full text-left px-3 py-1.5 text-sm rounded-lg
                text-foreground/80 hover:bg-gray-100 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
