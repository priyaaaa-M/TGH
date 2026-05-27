"use client"

import { motion } from "framer-motion"
import { Heart, Mic, BookOpen, Music, Users, MessageSquare, Lightbulb } from "lucide-react"
import { useRegisterModal } from "@/components/register-modal-provider"

const activities = [
  { icon: "🎭", label: "Theatre" },
  { icon: "📖", label: "Storytelling" },
  { icon: "🎵", label: "Music" },
  { icon: "✍️", label: "Poetry" },
  { icon: "🤝", label: "Collaboration" },
  { icon: "💬", label: "Conversations" },
  { icon: "💡", label: "Creativity Labs" },
]

const steps = [
  {
    number: "01",
    title: "Join the Experience",
    description:
      "Register and step into a space built entirely for your voice. No auditions. No filters. Just you, showing up.",
    color: "bg-lavender",
    tapeColor: "rgba(230,170,220,0.65)",
    tapeAngle: -3,
    rotation: -1.5,
    icon: Heart,
  },
  {
    number: "02",
    title: "Participate & Create",
    description:
      "Dive into theatre, storytelling, poetry, music, collaborative expression, conversations, and creativity labs — across 15 days.",
    color: "bg-peach",
    tapeColor: "rgba(255,190,150,0.65)",
    tapeAngle: 4,
    rotation: 1,
    icon: Mic,
  },
  {
    number: "03",
    title: "Connect & Be Seen",
    description:
      "Express, perform, witness, and belong. Build real connections with a community that holds space for exactly who you are.",
    color: "bg-sage-green",
    tapeColor: "rgba(130,200,180,0.65)",
    tapeAngle: -2,
    rotation: -0.5,
    icon: Users,
  },
]

export function HowItWorksSection() {
  const { openRegisterModal } = useRegisterModal()

  return (
    <section id="how-it-works" className="relative py-16 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />

      {/* Floating doodle accents */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-8 right-12 font-handwritten text-lavender/40 text-3xl select-none pointer-events-none hidden md:block"
      >✦</motion.div>
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute bottom-16 left-8 text-soft-pink/30 pointer-events-none hidden md:block"
      >
        <Heart className="w-5 h-5 fill-current" />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block bg-pastel-yellow/60 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide mb-5">
            How it works
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4">
            Three steps to{" "}
            <span className="font-handwritten text-peach italic font-normal text-4xl md:text-6xl">
              your space.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Simple, intentional, and designed entirely around you.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 mb-14 md:mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative"
            >
              {/* Arrow between cards — desktop only */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/3 -right-6 z-10">
                  <svg viewBox="0 0 40 20" className="w-10 h-5 text-foreground/25" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M2 10 Q16 4 32 10" />
                    <path d="M26 6 L32 10 L26 14" />
                  </svg>
                </div>
              )}

              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.03, rotate: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative ${step.color} p-6 md:p-8 rounded-2xl shadow-sticky-note`}
                style={{ transform: `rotate(${step.rotation}deg)` }}
              >
                {/* Tape */}
                <div
                  className="absolute -top-2.5 left-1/2 w-14 h-5 rounded-[2px] shadow-sm"
                  style={{
                    background: step.tapeColor,
                    transform: `translateX(-50%) rotate(${step.tapeAngle}deg)`,
                  }}
                />

                {/* Step number */}
                <span className="inline-block font-handwritten text-4xl text-foreground/20 font-bold leading-none mb-4">
                  {step.number}
                </span>

                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-foreground/75 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Activities pill cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-5">
            What you&apos;ll explore
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto mb-10">
            {activities.map((activity, i) => (
              <motion.span
                key={activity.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                whileHover={{ scale: 1.08 }}
                className="inline-flex items-center gap-1.5 bg-white/70 border border-border px-4 py-2 rounded-full text-sm font-medium text-foreground/80 shadow-sm cursor-default"
              >
                <span>{activity.icon}</span>
                {activity.label}
              </motion.span>
            ))}
          </div>

          <button
            onClick={openRegisterModal}
            className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-7 py-3.5 rounded-full font-medium text-sm hover:bg-foreground/90 transition-all hover:scale-105 shadow-soft"
          >
            Join the Experience
            <Heart className="w-4 h-4 fill-current" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
