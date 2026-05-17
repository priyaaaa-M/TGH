"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Star, Heart, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const FORM_URL = "https://docs.google.com/forms/d/1ZSUlQS2k2gWhYY2oZmEOwRshBHK-Ml_tfNpdBm17cJk/edit?utm"

export function HeroSection() {
  return (
    <section className="relative min-h-[85dvh] lg:min-h-screen pt-20 md:pt-32 pb-8 md:pb-12 overflow-hidden flex flex-col justify-between lg:block">
      {/* Floating Doodles */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-4 md:top-32 md:left-16 text-pastel-yellow z-0 opacity-50 md:opacity-100"
      >
        <Star className="w-5 h-5 md:w-6 md:h-6 fill-current" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-40 left-2 md:top-48 md:left-12 text-soft-pink z-0 opacity-50 md:opacity-100"
      >
        <Heart className="w-4 h-4 md:w-5 md:h-5 fill-current" />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute bottom-40 left-8 text-lavender z-0"
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>

      {/* Hero Content - Stacks vertically on mobile, left aligned on desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
          {/* Handwritten note */}
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: -3 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block mb-4 md:mb-6"
          >
            <span className="font-handwritten text-lg md:text-xl lg:text-2xl text-muted-foreground italic">
              no edits.<br className="hidden md:block" /> no apologies.<br className="hidden md:block" /> just you.
            </span>
            <Heart className="inline-block ml-2 w-3 h-3 md:w-4 md:h-4 text-soft-pink fill-soft-pink" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[2.75rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl font-serif font-bold mb-3 md:mb-6"
          >
            You don&apos;t have to{" "}
            <span className="relative inline-block mt-1">
              <span className="font-handwritten text-lavender italic font-normal text-[3.5rem] leading-none sm:text-6xl lg:text-8xl drop-shadow-[0_0_15px_rgba(227,214,255,0.8)] relative z-10">
                perform
              </span>
              <svg
                className="absolute -bottom-1 md:-bottom-2 left-0 w-full"
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
            className="text-[0.95rem] sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-6 md:mb-8 leading-snug lg:leading-relaxed"
          >
            A safe creative space for Gen Z voices, stories, expression, music, 
            theatre, thoughts and truth.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-row items-center justify-center lg:justify-start gap-3 md:gap-4 mb-6"
          >
            <button
              onClick={() => window.open(FORM_URL, "_blank")}
              className="inline-flex justify-center items-center gap-2 bg-foreground text-primary-foreground px-5 py-2.5 lg:px-6 lg:py-3 rounded-[1.25rem] text-sm lg:text-base font-medium hover:bg-foreground/90 transition-all hover:scale-105 shadow-soft"
            >
              Join the Space
              <ArrowUpRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </button>
            <Link href="/explore" passHref>
              <button className="inline-flex justify-center items-center gap-2 bg-white/50 backdrop-blur-sm border border-foreground/20 text-foreground px-5 py-2.5 lg:px-6 lg:py-3 rounded-[1.25rem] text-sm lg:text-base font-medium hover:bg-foreground/5 transition-all hover:scale-105 shadow-sm">
                Explore Stories
                <ArrowUpRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              </button>
            </Link>
          </motion.div>

          {/* Avatar Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
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
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${color} border-2 border-[#F8F4EE] flex items-center justify-center text-[10px] md:text-xs font-medium`}
                >
                  {["S", "A", "M", "K"][i]}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs md:text-sm font-medium">2k+</span>
              <span className="text-xs md:text-sm text-muted-foreground">
                Young voices inside
              </span>
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-soft-pink fill-soft-pink ml-1" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Flowing Illustration - Blended and faded for a scrapbook feel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="relative lg:absolute lg:inset-0 lg:top-10 pointer-events-none mt-[-2rem] sm:mt-0 w-full h-[50vh] sm:h-[45vh] lg:h-auto z-0 overflow-hidden lg:overflow-visible"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F4EE] via-transparent to-transparent z-10 lg:hidden h-20" />
        <div 
          className="absolute right-0 top-0 w-[110%] -right-[5%] lg:w-[85%] h-full mix-blend-multiply"
          style={{
            WebkitMaskImage: "radial-gradient(ellipse 75% 85% at 65% 50%, black 30%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 75% 85% at 65% 50%, black 30%, transparent 100%)"
          }}
        >
          <Image
            src="/profile_pic/hero-bg.png"
            alt="Artistic watercolor illustration of diverse young people expressing themselves through music, dance, art, and conversation"
            fill
            className="object-cover object-[60%_30%] sm:object-contain sm:object-center lg:object-right opacity-80"
            priority
          />
        </div>
      </motion.div>

      {/* Floating stickers that overlay everything */}
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [6, 8, 6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-32 right-8 lg:right-16 bg-soft-pink/90 px-4 py-2 rounded-md shadow-md transform rotate-6 z-20"
      >
        <span className="font-handwritten text-sm text-foreground">be real.</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -4, 0], rotate: [-4, -6, -4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[28%] right-4 sm:top-32 lg:top-48 sm:right-32 bg-baby-blue/90 px-2.5 py-1 sm:px-4 sm:py-2 rounded shadow-sm transform -rotate-4 z-20"
      >
        <span className="font-handwritten text-[0.65rem] sm:text-sm text-foreground">be bold.</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0], rotate: [3, 5, 3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden lg:block absolute top-64 right-12 lg:right-20 bg-peach/90 px-4 py-2 rounded-md shadow-md transform rotate-3 z-20"
      >
        <span className="font-handwritten text-base font-bold text-foreground">be you.</span>
      </motion.div>
      
      {/* UNFILTERED sticker */}
      <motion.div
        animate={{ rotate: [0, 2, 0], y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-4 sm:bottom-1/4 sm:left-auto sm:right-16 bg-pastel-yellow px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-sticky-note transform -rotate-2 z-20"
      >
        <span className="font-handwritten text-sm sm:text-xl font-bold text-foreground tracking-wide">
          UNFILTERED
        </span>
        <Heart className="inline-block ml-1 w-2.5 h-2.5 sm:w-4 sm:h-4 text-soft-pink fill-soft-pink" />
      </motion.div>

      {/* Decorative corner star */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="hidden md:block absolute top-40 right-8 text-pastel-yellow opacity-60 z-10"
      >
        <Star className="w-8 h-8" />
      </motion.div>
    </section>
  )
}
