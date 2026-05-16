"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, ArrowUpRight, Heart } from "lucide-react"

const FORM_URL = "https://docs.google.com/forms/d/1ZSUlQS2k2gWhYY2oZmEOwRshBHK-Ml_tfNpdBm17cJk/edit?utm"

const safeSpaceItems = [
  "No judgment",
  "No forced sharing",
  "No comparison",
  "Full respect",
]

export function SafeSpaceSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2026-06-28T00:00:00")

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Safe Space Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-soft-pink/30 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 w-12 h-12 bg-soft-pink/50 rounded-full" />
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-lavender/50 rounded-full" />

            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6">
              This is a{" "}
              <span className="text-orange-highlight">SAFE SPACE.</span>
            </h3>

            <ul className="space-y-3">
              {safeSpaceItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-sage-green/50 flex items-center justify-center">
                    <Check className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Countdown Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-lavender/30 rounded-3xl p-8 text-center"
          >
            <p className="text-sm font-medium uppercase tracking-wide text-foreground/70 mb-4">
              Starting
            </p>
            <p className="text-3xl md:text-4xl font-serif font-bold mb-6">
              28th June 2026
            </p>

            <div className="grid grid-cols-4 gap-2">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Mins" },
                { value: timeLeft.seconds, label: "Secs" },
              ].map((item) => (
                <div key={item.label} className="bg-white/50 rounded-xl p-3">
                  <p className="text-2xl md:text-3xl font-bold text-foreground">
                    {item.value.toString().padStart(2, "0")}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-pastel-yellow/30 rounded-3xl p-8 flex flex-col justify-center text-center"
          >
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
              Come as you are.
            </h3>
            <p className="text-lg text-foreground/70 mb-6 font-handwritten">
              That&apos;s enough.
            </p>

            <button
              onClick={() => window.open(FORM_URL, "_blank")}
              className="inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-all hover:scale-105 mx-auto"
            >
              Join the Space
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <Heart className="mx-auto mt-4 w-5 h-5 text-soft-pink fill-soft-pink animate-pulse-soft" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
