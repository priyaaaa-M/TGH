"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import Image from "next/image"

export function HowItFeelsSection() {
  const steps = [
    {
      color: "bg-peach",
      icon: (
        <svg viewBox="0 0 40 40" className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="20" cy="12" r="5" />
          <path d="M20 18 v10 M14 34 l6-6 6 6 M10 26 c4-2 8 0 10 2 c2-2 6-4 10-2" />
        </svg>
      ),
      text: ["You arrive", "curious."],
      rotate: -3,
    },
    {
      color: "bg-sage",
      icon: (
        <svg viewBox="0 0 40 40" className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="4" y="8" width="14" height="18" rx="2" />
          <rect x="22" y="14" width="14" height="18" rx="2" />
          <path d="M8 14 h6 M8 18 h4 M8 22 h5 M26 20 h6 M26 24 h4 M26 28 h5" />
        </svg>
      ),
      text: ["You talk.", "You listen."],
      rotate: 2,
    },
    {
      color: "bg-lavender",
      icon: (
        <svg viewBox="0 0 40 40" className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M10 32 L14 8" />
          <path d="M14 8 L16 8 L20 28 L22 28" />
          <path d="M26 32 L26 14 C26 10 32 10 32 14 L32 32" />
        </svg>
      ),
      text: ["You create.", "You reflect."],
      rotate: -1,
    },
    {
      color: "bg-soft-pink",
      icon: (
        <svg viewBox="0 0 40 40" className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M20 34 C6 22 4 14 12 9 C16 6 20 10 20 14 C20 10 24 6 28 9 C36 14 34 22 20 34 Z" />
        </svg>
      ),
      text: ["You express.", "You release."],
      rotate: 3,
    },
    {
      color: "bg-pastel-yellow",
      icon: (
        <svg viewBox="0 0 40 40" className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="14" r="4" />
          <circle cx="28" cy="14" r="4" />
          <circle cx="20" cy="26" r="4" />
          <path d="M15 17 L17 23 M25 17 L23 23" />
        </svg>
      ),
      text: ["You feel seen.", "You belong."],
      rotate: -2,
    },
  ]

  const HandDrawnArrow = ({ variant = 0 }: { variant?: number }) => {
    const paths = [
      "M4 12 Q20 6 36 14 Q48 18 56 12",
      "M4 14 Q16 20 32 10 Q46 4 56 14",
      "M4 10 Q24 18 40 8 Q50 4 56 12",
      "M4 16 Q18 8 34 16 Q48 20 56 10",
    ]
    return (
      <svg viewBox="0 0 60 24" className="w-10 h-5 md:w-14 md:h-6 text-foreground/40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d={paths[variant % paths.length]} />
        <path d="M50 6 L56 12 L50 18" />
      </svg>
    )
  }

  return (
    <section id="experience" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-visible">
      {/* Floating doodles */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-12 left-8 md:left-16 font-handwritten text-lavender/60 text-3xl select-none"
      >
        ~
      </motion.div>
      <motion.div
        animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className="absolute top-20 right-20 md:right-32"
      >
        <Heart className="w-4 h-4 text-soft-pink/50 fill-soft-pink/50" />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-24 left-12 font-handwritten text-sage/60 text-2xl select-none"
      >
        *
      </motion.div>
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        className="absolute top-32 left-1/4 font-handwritten text-peach/50 text-xl select-none"
      >
        &#9834;
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2">
            <div className="relative">
              <span className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-foreground">
                HOW IT FEELS
              </span>
              {/* Hand-drawn underline */}
              <svg className="absolute -bottom-1.5 left-0 w-full h-2" viewBox="0 0 100 8" fill="none" stroke="#D4B8E0" strokeWidth="2.5" strokeLinecap="round">
                <path d="M2 5 Q25 2 50 5 Q75 8 98 4" />
              </svg>
            </div>
            <span className="font-handwritten text-foreground/50 text-lg">&#9835;</span>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex flex-col xl:flex-row items-start gap-8 xl:gap-6">
          {/* Steps journey */}
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-y-6 gap-x-1 md:gap-x-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  {/* Step */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    style={{ rotate: `${step.rotate}deg` }}
                    className="flex flex-col items-center"
                  >
                    <div className={`${step.color} w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-soft text-foreground/70 transition-shadow hover:shadow-md`}>
                      {step.icon}
                    </div>
                    <div className="mt-2.5 text-center">
                      {step.text.map((line, i) => (
                        <p key={i} className="text-xs md:text-sm font-medium text-foreground/80 leading-tight">
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 + 0.1 }}
                      className="mx-0.5 md:mx-1 mt-[-24px]"
                      style={{ rotate: `${(index % 2 === 0 ? 1 : -1) * 3}deg` }}
                    >
                      <HandDrawnArrow variant={index} />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Polaroid */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 6 }}
            whileInView={{ opacity: 1, x: 0, rotate: 4 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ rotate: 1, scale: 1.03 }}
            className="relative flex-shrink-0 self-center xl:self-start xl:-mr-4 mt-4 xl:mt-0"
          >
            {/* Tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-5 bg-pastel-yellow/80 rounded-[2px] transform -rotate-2 shadow-sm z-10" />
            
            {/* Polaroid frame */}
            <div className="bg-white p-2.5 pb-10 rounded-[2px] shadow-lg w-40 md:w-48 transform rotate-4">
              {/* Photo */}
              <div className="relative aspect-[4/5] bg-cream overflow-hidden">
                <Image
                  src="/IMG_fol/img_1.png"
                  alt="Friends sharing a warm, candid moment together"
                  fill
                  className="object-cover"
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              
              {/* Caption area */}
              <div className="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between">
                <p className="font-handwritten text-sm md:text-base text-foreground/90">
                  This is <span className="font-bold uppercase tracking-wide">UNFILTERED.</span>
                </p>
                <Heart className="w-3.5 h-3.5 text-soft-pink fill-soft-pink flex-shrink-0 mb-0.5" />
              </div>
            </div>

            {/* Corner tape */}
            <div className="absolute -bottom-1.5 -right-1.5 w-8 h-4 bg-peach/60 rounded-[2px] transform rotate-[40deg] shadow-sm" />
            
            {/* Star doodle */}
            <motion.div
              animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-3 font-handwritten text-lavender/70 text-lg"
            >
              &#10022;
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
