"use client"

import { motion } from "framer-motion"

const pills = [
  "📍 Offline Experience",
  "👭 Open for Women & Young Adults",
  "📝 Registrations Open",
  "✨ Storytelling • Theatre • Poetry • Creative Expression",
]

export function InfoPillsStrip() {
  return (
    <div className="bg-[#F8F4EE] py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          {pills.map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="inline-flex items-center gap-1.5 bg-white/70 border border-foreground/10 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-foreground/75 whitespace-nowrap"
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
