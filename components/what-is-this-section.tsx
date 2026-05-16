"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Heart, MessageCircle, Palette, Shield } from "lucide-react"
import Link from "next/link"

const stickyNotes = [
  {
    icon: MessageCircle,
    title: "No judgment.",
    subtitle: "Just real conversations.",
    color: "bg-lavender",
    rotation: "-rotate-2",
    tapeColor: "bg-pastel-yellow/70",
  },
  {
    icon: Heart,
    title: "Your story matters here.",
    subtitle: "",
    color: "bg-soft-pink",
    rotation: "rotate-1",
    tapeColor: "bg-baby-blue/70",
  },
  {
    icon: Palette,
    title: "Express any way you want.",
    subtitle: "",
    color: "bg-pastel-yellow",
    rotation: "-rotate-1",
    tapeColor: "bg-soft-pink/70",
  },
  {
    icon: Shield,
    title: "Feel safe, seen & supported.",
    subtitle: "",
    color: "bg-sage-green",
    rotation: "rotate-2",
    tapeColor: "bg-lavender/70",
  },
]

export function WhatIsThisSection() {
  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="inline-block bg-lavender/50 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide">
            What is this?
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-6">
              This is not just
              <br />
              an event.
              <br />
              It&apos;s a{" "}
              <span className="relative inline-block">
                <span className="relative z-10">15-day</span>
                <span className="absolute inset-0 bg-orange-highlight/30 -skew-x-3 rounded" />
              </span>
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">expression lab.</span>
                <span className="absolute inset-0 bg-orange-highlight/30 -skew-x-3 rounded" />
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              A space where college youth explore identity, express without filters, 
              create from real experiences, feel seen, heard, and held. Through theatre, 
              poetry, music, storytelling and movement.
            </p>

            <Link
              href="#experience"
              className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-all hover:scale-105"
            >
              Know More
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right - Sticky Notes */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {stickyNotes.map((note, index) => (
                <motion.div
                  key={note.title}
                  initial={{ opacity: 0, y: 30, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 0, y: -5 }}
                  className={`relative ${note.color} p-5 md:p-6 rounded-lg shadow-sticky-note ${note.rotation} cursor-pointer`}
                >
                  {/* Tape */}
                  <div
                    className={`absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 ${note.tapeColor} rounded-sm transform -rotate-2`}
                  />

                  <note.icon className="w-8 h-8 mb-3 text-foreground/70" />
                  <p className="font-medium text-foreground leading-snug">
                    {note.title}
                  </p>
                  {note.subtitle && (
                    <p className="text-sm text-foreground/70 mt-1">
                      {note.subtitle}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Handwritten note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <p className="font-handwritten text-xl md:text-2xl text-muted-foreground italic">
                come as you are.
                <br />
                leave a little more you.
              </p>
              <Heart className="inline-block mt-2 w-5 h-5 text-soft-pink fill-soft-pink" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
