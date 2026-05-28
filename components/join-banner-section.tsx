"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { RegistrationButton } from "@/components/registration-button"
import { useRegisterModal } from "@/components/register-modal-provider"

export function JoinBannerSection() {
  const { openRegisterModal } = useRegisterModal()
  
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-lavender">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl font-serif font-bold text-foreground">
              Come as you are.
            </p>
            <p className="text-lg text-foreground/80">
              You&apos;ll be exactly where you need to be.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <span className="text-2xl">➡️</span>
            <button
              onClick={openRegisterModal}
              className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-all hover:scale-105 border-2 border-foreground"
            >
              Join the 15-Day Journey
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Decorative photos hint */}
          <div className="hidden lg:flex -space-x-4">
            {[
              "bg-peach/30",
              "bg-sage-green/30",
              "bg-soft-pink/30",
            ].map((color, i) => (
              <div
                key={i}
                className={`w-16 h-16 ${color} rounded-lg border-2 border-white transform ${
                  i === 0 ? "-rotate-6" : i === 1 ? "rotate-3" : "-rotate-3"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
