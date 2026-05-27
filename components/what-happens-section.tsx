"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import Image from "next/image"

const expressions = [
  { emoji: "🎭", label: "Theatre", color: "bg-lavender/60" },
  { emoji: "✍️", label: "Poetry", color: "bg-soft-pink/50" },
  { emoji: "📖", label: "Storytelling", color: "bg-peach/60" },
  { emoji: "🎵", label: "Music", color: "bg-pastel-yellow/60" },
  { emoji: "🌿", label: "Movement", color: "bg-sage-green/50" },
  { emoji: "💬", label: "Conversations", color: "bg-baby-blue/50" },
  { emoji: "🤝", label: "Collaborative Creativity", color: "bg-lavender/40" },
]

const feelings = [
  "feel",
  "express",
  "connect",
  "and belong.",
]

export function WhatHappensSection() {
  return (
    <section id="what-happens" className="relative py-16 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Soft bg blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lavender/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-soft-pink/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT: text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-block bg-peach/50 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide">
                What happens here?
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-6">
              At The Girlfriend Hour,{" "}
              <span className="font-handwritten text-lavender italic font-normal text-4xl md:text-5xl">
                expression
              </span>
              {" "}is the whole point.
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Participants explore creativity through theatre, poetry, storytelling, music, movement, conversations, and collaborative creative experiences.
            </p>

            {/* Expression chips */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {expressions.map((item, i) => (
                <motion.span
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.07, y: -2 }}
                  className={`inline-flex items-center gap-1.5 ${item.color} px-3.5 py-1.5 rounded-full text-sm font-medium text-foreground/85 cursor-default select-none`}
                >
                  <span>{item.emoji}</span>
                  {item.label}
                </motion.span>
              ))}
            </div>

            {/* The core promise */}
            <div className="relative">
              <div className="absolute -top-2.5 left-6 w-16 h-5 bg-pastel-yellow/70 rounded-[2px] -rotate-2 shadow-sm" />
              <div className="bg-white/80 border border-border/60 rounded-2xl p-6 shadow-sm">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  No pressure to perform perfectly. This is a space to:
                </p>
                <div className="space-y-1">
                  {feelings.map((word, i) => (
                    <motion.p
                      key={word}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="font-handwritten text-2xl md:text-3xl text-foreground/90 italic leading-snug"
                    >
                      {word}
                    </motion.p>
                  ))}
                </div>
                <Heart className="mt-3 w-5 h-5 text-soft-pink fill-soft-pink animate-pulse-soft" />
              </div>
            </div>
          </motion.div>

          {/* RIGHT: image collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Main large image */}
            <motion.div
              whileHover={{ scale: 1.02, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative rounded-2xl overflow-hidden shadow-soft"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pastel-yellow/80 rounded-[3px] -rotate-1 z-10 shadow-sm" />
              <div className="relative aspect-[4/3]">
                <Image
                  src="/IMG_fol/img_3.png"
                  alt="Participants in a candid group storytelling and music session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <p className="absolute bottom-3 left-4 font-handwritten text-white/90 text-base drop-shadow-sm">
                real people. real moments. 🌸
              </p>
            </motion.div>

            {/* Small floating second image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ rotate: 0, scale: 1.04 }}
              className="absolute -bottom-6 -left-6 w-36 md:w-44 rounded-xl overflow-hidden shadow-lg border-4 border-white"
              style={{ transform: "rotate(4deg)" }}
            >
              <div className="relative aspect-square">
                <Image
                  src="/IMG_fol/img_5.png"
                  alt="Community workshop moment"
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>
            </motion.div>

            {/* Decorative handwritten annotation */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-4 bg-soft-pink/90 px-3 py-1.5 rounded-lg shadow-md rotate-3 hidden md:block"
            >
              <span className="font-handwritten text-sm text-foreground font-bold">unfiltered. ✦</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
