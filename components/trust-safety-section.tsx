"use client"

import { motion } from "framer-motion"
import { Heart, Shield, Lock, Users, Sparkles } from "lucide-react"

const pillars = [
  {
    icon: Shield,
    emoji: "🛡️",
    title: "This is a safe space.",
    body: "No judgment. No comparison. No pressure to perform. You are welcome here exactly as you are — in all your complexity, vulnerability, and realness.",
    color: "bg-lavender/40",
    tapeColor: "rgba(230,170,220,0.6)",
    tapeAngle: -3,
    rotation: -1,
    accent: "text-lavender",
  },
  {
    icon: Lock,
    emoji: "🔒",
    title: "What stays here, stays here.",
    body: "Stories, feelings, and experiences shared within this space are held with deep care and confidentiality. We protect each other's truth.",
    color: "bg-soft-pink/30",
    tapeColor: "rgba(255,193,204,0.6)",
    tapeAngle: 4,
    rotation: 1.5,
    accent: "text-soft-pink",
  },
  {
    icon: Heart,
    emoji: "💛",
    title: "You are supported.",
    body: "Facilitators and emotional safety leads are always present. If you ever feel overwhelmed, you can step back, breathe, or reach out. We've got you.",
    color: "bg-pastel-yellow/40",
    tapeColor: "rgba(255,216,107,0.6)",
    tapeAngle: -2,
    rotation: -0.5,
    accent: "text-orange-highlight",
  },
  {
    icon: Users,
    emoji: "🌿",
    title: "We show up with respect.",
    body: "We ask for curiosity, not perfection. Presence, not performance. Kindness toward others and toward yourself — that's the only rule that matters.",
    color: "bg-sage-green/30",
    tapeColor: "rgba(183,211,176,0.6)",
    tapeAngle: 3,
    rotation: 1,
    accent: "text-sage-green",
  },
]

export function TrustSafetySection() {
  return (
    <section id="safe-space" className="relative py-16 md:py-28 px-4 sm:px-6 lg:px-8 bg-white/40">
      {/* Soft background blobs */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-lavender/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-soft-pink/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating accent */}
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 right-10 text-lavender/30 pointer-events-none hidden md:block"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block bg-sage-green/40 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide mb-5">
            Trust &amp; Safety
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4">
            A space that holds{" "}
            <span className="font-handwritten text-lavender italic font-normal text-4xl md:text-6xl">
              you.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Before anything else — you deserve to know this space was built
            with your safety, dignity, and wholeness in mind.
          </p>
        </motion.div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-14">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, rotate: 0, y: -6 }}
              className={`relative ${pillar.color} rounded-2xl p-6 shadow-sticky-note`}
              style={{ transform: `rotate(${pillar.rotation}deg)` }}
            >
              {/* Tape */}
              <div
                className="absolute -top-2.5 left-1/2 w-14 h-5 rounded-[2px] shadow-sm"
                style={{
                  background: pillar.tapeColor,
                  transform: `translateX(-50%) rotate(${pillar.tapeAngle}deg)`,
                }}
              />

              <span className="text-3xl mb-4 block">{pillar.emoji}</span>
              <h3 className="text-lg font-serif font-bold text-foreground mb-3 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom emotional note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center gap-3 bg-cream border border-border/60 px-8 py-6 rounded-2xl shadow-sm max-w-lg mx-auto">
            <p className="font-handwritten text-xl md:text-2xl text-foreground/85 italic leading-relaxed">
              &ldquo;You don&apos;t have to be okay here.
              <br />
              You just have to be here.&rdquo;
            </p>
            <Heart className="w-5 h-5 text-soft-pink fill-soft-pink animate-pulse-soft" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
