"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Star, Heart, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const FORM_URL = "https://docs.google.com/forms/d/1ZSUlQS2k2gWhYY2oZmEOwRshBHK-Ml_tfNpdBm17cJk/edit?utm"

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-24 md:pt-32 overflow-hidden">
      {/* Floating Doodles */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-8 md:left-16 text-pastel-yellow z-20"
      >
        <Star className="w-6 h-6 fill-current" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-48 left-4 md:left-12 text-soft-pink z-20"
      >
        <Heart className="w-5 h-5 fill-current" />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-8 text-lavender z-20"
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>

      {/* Hero Content - Text on left, flowing over illustration */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          {/* Handwritten note */}
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: -3 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="font-handwritten text-xl md:text-2xl text-muted-foreground italic">
              no edits.<br />no apologies.<br />just you.
            </span>
            <Heart className="inline-block ml-2 w-4 h-4 text-soft-pink fill-soft-pink" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] mb-6"
          >
            You don&apos;t have to{" "}
            <span className="relative inline-block">
              <span className="font-handwritten text-lavender italic font-normal">
                perform
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 8C50 2 150 2 198 8"
                  stroke="#E3D6FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            here.
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed"
          >
            A safe creative space for Gen Z voices, stories, expression, music, 
            theatre, thoughts and truth.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <button
              onClick={() => window.open(FORM_URL, "_blank")}
              className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-all hover:scale-105"
            >
              Join the Space
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.open(FORM_URL, "_blank")}
              className="inline-flex items-center gap-2 bg-transparent border-2 border-foreground px-6 py-3 rounded-full font-medium hover:bg-foreground/5 transition-all hover:scale-105"
            >
              Explore Stories
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Avatar Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="flex -space-x-3">
              {[
                "bg-lavender",
                "bg-peach",
                "bg-sage-green",
                "bg-baby-blue",
              ].map((color, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full ${color} border-2 border-[#F8F4EE] flex items-center justify-center text-xs font-medium`}
                >
                  {["S", "A", "M", "K"][i]}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">2k+</span>
              <span className="text-sm text-muted-foreground">
                Young voices already inside
              </span>
              <Heart className="w-4 h-4 text-soft-pink fill-soft-pink ml-1" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-width Flowing Illustration - Behind and beside content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="absolute inset-0 top-20 pointer-events-none"
      >
        {/* The illustration flows across the entire viewport */}
        <div className="absolute right-0 top-0 w-full lg:w-3/4 h-full">
          <Image
            src="/hero-silhouettes.jpg"
            alt="Artistic watercolor illustration of diverse young people expressing themselves through music, dance, art, and conversation"
            fill
            className="object-contain object-right-top lg:object-right opacity-90"
            priority
          />
        </div>
      </motion.div>

      {/* Floating stickers that overlay everything */}
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [6, 8, 6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-8 md:right-16 bg-soft-pink/90 px-4 py-2 rounded-md shadow-md transform rotate-6 z-20"
      >
        <span className="font-handwritten text-sm text-foreground">be real.</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -4, 0], rotate: [-4, -6, -4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-48 right-24 md:right-32 bg-baby-blue/90 px-4 py-2 rounded-md shadow-md transform -rotate-4 z-20"
      >
        <span className="font-handwritten text-sm text-foreground">be bold.</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0], rotate: [3, 5, 3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-64 right-12 md:right-20 bg-peach/90 px-4 py-2 rounded-md shadow-md transform rotate-3 z-20"
      >
        <span className="font-handwritten text-base font-bold text-foreground">be you.</span>
      </motion.div>
      
      {/* UNFILTERED sticker */}
      <motion.div
        animate={{ rotate: [0, 2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 right-8 md:right-16 bg-pastel-yellow px-4 py-2 rounded-lg shadow-soft transform -rotate-3 z-20"
      >
        <span className="font-handwritten text-xl font-bold text-foreground">
          UNFILTERED
        </span>
        <Heart className="inline-block ml-1 w-4 h-4 text-soft-pink fill-soft-pink" />
      </motion.div>

      {/* Decorative corner star */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-8 text-pastel-yellow opacity-60 z-10"
      >
        <Star className="w-8 h-8" />
      </motion.div>
    </section>
  )
}
