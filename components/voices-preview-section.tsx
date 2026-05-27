"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mic, ArrowRight } from "lucide-react"

export function VoicesPreviewSection() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-lavender/20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <span className="inline-block bg-peach/40 border border-peach/50 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground/80 -rotate-1">
            Community Echoes
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
            Listen to the unspoken
            <span className="font-handwritten text-sage-green font-normal block mt-2 text-4xl md:text-6xl -rotate-2">
              voices.
            </span>
          </h2>
          <p className="text-lg text-foreground/70 font-medium max-w-xl mx-auto pt-4">
            A dedicated space for radical honesty. Hear anonymous voice notes, participate in quick polls, and share your own truth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/voices" className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform shadow-soft group">
            <Mic className="w-5 h-5 group-hover:animate-pulse" />
            Enter the Voices Room
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
