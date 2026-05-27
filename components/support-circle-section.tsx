"use client"

import { motion } from "framer-motion"
import { Heart, ArrowUpRight } from "lucide-react"
import { useRegisterModal } from "@/components/register-modal-provider"

export function SupportCircleSection() {
  const { openRegisterModal } = useRegisterModal()

  const tags = [
    { text: "empathy", color: "bg-[#EDE0FF] text-[#6366F1]" },
    { text: "listening", color: "bg-[#FFE8D8] text-[#E8612A]" },
    { text: "safe space", color: "bg-[#E8F5E8] text-[#2F855A]" },
    { text: "support", color: "bg-[#F0F4FF] text-[#3B82F6]" },
    { text: "kindness", color: "bg-[#FFF9E8] text-[#CA8A04]" },
  ]

  const collage = [
    {
      url: "/placeholder.jpg",
      alt: "Safe listening space discussion",
      rotation: -3,
      tapeColor: "rgba(230,170,220,0.7)",
      tapeAngle: -4,
    },
    {
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=500&fit=crop",
      alt: "Warm peer support community",
      rotation: 2,
      tapeColor: "rgba(250,220,60,0.7)",
      tapeAngle: 3,
    },
    {
      url: "",
      alt: "Empathy and care support session",
      rotation: -1,
      tapeColor: "rgba(130,200,180,0.7)",
      tapeAngle: -2,
    },
  ]

  return (
    <section id="support-circle" className="relative py-24 md:py-32 overflow-hidden bg-[#FAF6F0] border-t border-b border-foreground/5">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Zine-Style Content & Text */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="font-handwritten text-xl md:text-2xl text-lavender tracking-wide inline-block transform -rotate-2">
                held with care.
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold leading-tight text-foreground">
                Emotional Safety & <br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-[#E8612A]">Support Circle</span>
                  <span className="absolute inset-0 bg-[#FFD9CE]/60 -skew-x-3 rounded" />
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6 text-foreground/90 font-medium"
            >
              <p className="text-xl md:text-2xl font-serif text-foreground/80 leading-relaxed font-light">
                A calm and supportive space built on empathy, respect, emotional safety, and non-judgmental listening.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                This support circle helps participants feel comfortable expressing themselves freely and authentically throughout the experience. We welcome facilitators, listeners, peer supporters, and emotionally aware volunteers who want to help create a safe and meaningful environment for everyone.
              </p>
            </motion.div>

            {/* Floating Scrapbook Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              {tags.map((tag, i) => (
                <motion.span
                  key={tag.text}
                  whileHover={{ scale: 1.1, rotate: (i % 2 === 0 ? 2 : -2) }}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm font-serif transform ${tag.color} border border-black/5 cursor-default`}
                  style={{ rotate: (i % 2 === 0 ? 1 : -1) }}
                >
                  #{tag.text}
                </motion.span>
              ))}
            </motion.div>

            {/* Volunteer CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-6"
            >
              <div className="bg-[#FFF9E8] p-6 md:p-8 rounded-3xl border-2 border-dashed border-black/10 relative shadow-md max-w-md w-full">
                {/* Scrapbook pin */}
                <div className="absolute -top-4 left-6 text-3xl">📌</div>
                <h4 className="font-serif font-bold text-lg md:text-xl text-foreground mb-1">
                  Want to support the space?
                </h4>
                <p className="text-sm md:text-base text-muted-foreground font-handwritten mb-4">
                  Join as a volunteer facilitator, listener, or peer support lead.
                </p>
                <button
                  onClick={openRegisterModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E8612A] text-white px-6 py-3 rounded-full font-bold hover:bg-[#D5531E] transition-all hover:scale-105 border-2 border-[#E8612A]"
                >
                  Join as a volunteer
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Scrapbook Collage */}
          <div className="lg:col-span-6 relative h-[480px] md:h-[550px] flex items-center justify-center mt-10 lg:mt-0">
            {/* Background Zine paper decoration */}
            <div className="absolute w-[90%] h-[90%] bg-white/40 border border-foreground/5 rounded-3xl -rotate-1 pointer-events-none" />

            {/* Collage Image 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: collage[0].rotation }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, zIndex: 30 }}
              transition={{ duration: 0.6 }}
              className="absolute top-6 left-6 w-[200px] md:w-[260px] bg-white p-3 pb-8 rounded-sm shadow-xl border border-foreground/5 z-10"
            >
              {/* Tape */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-[2px] shadow-sm z-20"
                style={{
                  background: collage[0].tapeColor,
                  transform: `translateX(-50%) rotate(${collage[0].tapeAngle}deg)`,
                }}
              />
              <div className="relative aspect-[4/3] bg-cream rounded-[2px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={collage[0].url}
                  alt={collage[0].alt}
                  className="object-cover w-full h-full grayscale-[10%] sepia-[10%]"
                />
              </div>
              <p className="font-handwritten text-center text-foreground/85 text-sm mt-3">
                safe, gentle spaces. ✨
              </p>
            </motion.div>

            {/* Collage Image 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: collage[1].rotation }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, zIndex: 30 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="absolute bottom-6 right-6 w-[200px] md:w-[260px] bg-white p-3 pb-8 rounded-sm shadow-xl border border-foreground/5 z-20"
            >
              {/* Tape */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-[2px] shadow-sm z-20"
                style={{
                  background: collage[1].tapeColor,
                  transform: `translateX(-50%) rotate(${collage[1].tapeAngle}deg)`,
                }}
              />
              <div className="relative aspect-[4/3] bg-cream rounded-[2px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={collage[1].url}
                  alt={collage[1].alt}
                  className="object-cover w-full h-full grayscale-[10%] sepia-[10%]"
                />
              </div>
              <p className="font-handwritten text-center text-foreground/85 text-sm mt-3">
                leaning on each other. 🌸
              </p>
            </motion.div>

            {/* Collage Image 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: collage[2].rotation }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, zIndex: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] md:w-[200px] bg-white p-2.5 pb-6 rounded-sm shadow-2xl border border-foreground/5 z-25"
            >
              {/* Tape */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 rounded-[2px] shadow-sm z-20"
                style={{
                  background: collage[2].tapeColor,
                  transform: `translateX(-50%) rotate(${collage[2].tapeAngle}deg)`,
                }}
              />
              <div className="relative aspect-square bg-cream rounded-[2px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={collage[2].url}
                  alt={collage[2].alt}
                  className="object-cover w-full h-full grayscale-[10%] sepia-[10%]"
                />
              </div>
              <p className="font-handwritten text-center text-foreground/85 text-[12px] mt-2">
                active listening. 🤍
              </p>
            </motion.div>

            {/* Handwritten Note decoration */}
            <motion.div
              initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: -5, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-4 left-4 md:left-8 bg-[#EDE0FF] p-4 shadow-lg rounded-xl max-w-[180px] border border-black/5 z-30 transform -rotate-6"
            >
              <p className="font-handwritten text-[#6366F1] text-sm leading-snug">
                "No one has to walk through it alone."
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
