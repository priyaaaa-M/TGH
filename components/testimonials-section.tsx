"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Quote } from "lucide-react"

const testimonials = [
  {
    quote: "I felt heard here for the first time.",
    name: "Anonymous",
    role: "Participant",
    color: "bg-lavender/40",
    tapeColor: "rgba(230,170,220,0.65)",
    tapeAngle: -3,
    rotation: -1.5,
    emoji: "💜",
  },
  {
    quote: "This didn't feel like an event. It felt like belonging.",
    name: "Anonymous",
    role: "Participant",
    color: "bg-soft-pink/35",
    tapeColor: "rgba(255,193,204,0.65)",
    tapeAngle: 4,
    rotation: 1.5,
    emoji: "🌸",
  },
  {
    quote: "I came nervous. I left feeling seen.",
    name: "Anonymous",
    role: "Participant",
    color: "bg-pastel-yellow/50",
    tapeColor: "rgba(255,216,107,0.65)",
    tapeAngle: -2,
    rotation: -0.5,
    emoji: "✨",
  },
  {
    quote: "I didn't feel judged here. Not once.",
    name: "Anonymous",
    role: "Participant",
    color: "bg-peach/40",
    tapeColor: "rgba(255,179,138,0.65)",
    tapeAngle: 3,
    rotation: 1,
    emoji: "🌼",
  },
  {
    quote: "For once, I could just be myself — all of myself.",
    name: "Anonymous",
    role: "Participant",
    color: "bg-sage-green/35",
    tapeColor: "rgba(183,211,176,0.65)",
    tapeAngle: -4,
    rotation: -2,
    emoji: "🌿",
  },
  {
    quote: "Something about this space made me speak up for the first time.",
    name: "Anonymous",
    role: "Participant",
    color: "bg-baby-blue/35",
    tapeColor: "rgba(168,213,255,0.65)",
    tapeAngle: 2,
    rotation: 0.5,
    emoji: "💙",
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-16 md:py-28 px-4 sm:px-6 lg:px-8 bg-white/30 overflow-hidden">
      {/* Decorative doodles */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-8 right-12 text-lavender/25 text-3xl select-none pointer-events-none hidden md:block"
      >
        ✦
      </motion.div>
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 left-10 text-soft-pink/25 pointer-events-none hidden md:block"
      >
        <Heart className="w-6 h-6 fill-current" />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block bg-lavender/50 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide mb-5">
            Real Feelings
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4">
            Words from the{" "}
            <span className="font-handwritten text-soft-pink italic font-normal text-4xl md:text-6xl">
              community.
            </span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg leading-relaxed">
            These are real feelings from real people who showed up as themselves.
          </p>
        </motion.div>

        {/* Testimonial cards — scrapbook grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.03, rotate: 0, y: -6 }}
              className={`relative ${t.color} rounded-2xl p-6 md:p-7 shadow-sticky-note cursor-default`}
              style={{ transform: `rotate(${t.rotation}deg)` }}
            >
              {/* Tape */}
              <div
                className="absolute -top-2.5 left-1/2 w-14 h-5 rounded-[2px] shadow-sm"
                style={{
                  background: t.tapeColor,
                  transform: `translateX(-50%) rotate(${t.tapeAngle}deg)`,
                }}
              />

              {/* Big quote mark */}
              <span className="text-5xl font-serif text-foreground/10 leading-none select-none block mb-2">
                &ldquo;
              </span>

              {/* Quote text */}
              <p className="font-handwritten text-xl md:text-2xl text-foreground/90 italic leading-snug mb-5">
                {t.quote}
              </p>

              {/* Attribution row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center text-xs">
                    {t.emoji}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground/70">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{t.role}</p>
                  </div>
                </div>
                <Heart className="w-4 h-4 text-foreground/30 fill-foreground/20" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 font-handwritten text-xl text-muted-foreground italic"
        >
          Every voice matters here. Including yours.
          <Heart className="inline-block ml-2 w-4 h-4 text-soft-pink fill-soft-pink" />
        </motion.p>
      </div>
    </section>
  )
}
