"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, ArrowRight, Sparkles } from "lucide-react"

export function ReflectionsCtaSection() {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-lavender/10 overflow-hidden border-y border-foreground/5">
      {/* Decorative scrap tape or doodle */}
      <div className="absolute top-4 left-6 md:left-12 w-20 h-5 bg-peach/30 backdrop-blur-sm -rotate-6 hidden sm:block rounded-[2px]" />
      <div className="absolute bottom-6 right-8 md:right-16 text-2xl select-none opacity-40 pointer-events-none hidden md:block">
        ✦
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span className="inline-flex items-center gap-1 bg-soft-pink/40 border border-soft-pink/50 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground/80">
            <Heart className="w-3 h-3 text-orange-highlight fill-orange-highlight" /> Voices From Our Community
          </span>
          
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
            Share Your Reflection
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/75 font-handwritten max-w-lg mx-auto pt-2 leading-relaxed">
            Your journey at The Girlfriend Hour is unique. Let us know how it felt, what you discovered, and the story you carry forward.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="pt-4"
        >
          <Link 
            href="/reflections" 
            className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-soft group"
          >
            <span>Write Your Reflection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
