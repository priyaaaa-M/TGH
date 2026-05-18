"use client"

import { motion } from "framer-motion"
import { ArrowRight, Users, Eye, Heart, Mail, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRegisterModal } from "@/components/register-modal-provider"

const roles = [
  {
    icon: Users,
    title: "Participate",
    description: "Join the 15-day expression lab.",
    color: "bg-peach",
    iconBg: "bg-peach/50",
  },
  {
    icon: Eye,
    title: "Attend the Showcase",
    description: "Be there. Witness raw, real expression.",
    color: "bg-lavender",
    iconBg: "bg-lavender/50",
  },
  {
    icon: Heart,
    title: "Mentor / Support",
    description: "Help create a safe space for voices.",
    color: "bg-sage-green",
    iconBg: "bg-sage-green/50",
  },
  {
    icon: Mail,
    title: "Just Stay Connected",
    description: "Get updates, stories and all the vibes.",
    color: "bg-baby-blue",
    iconBg: "bg-baby-blue/50",
  },
]

export function FinalCTASection() {
  const { openRegisterModal } = useRegisterModal()

  return (
    <section id="join" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-cream/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <span className="inline-block bg-sage-green/50 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide mb-4">
              Choose Your Role
            </span>
            <Sparkles className="inline-block ml-2 w-5 h-5 text-baby-blue" />

            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Be a part of something{" "}
              <span className="text-sage-green font-handwritten italic font-normal">
                real.
              </span>
            </h2>
          </motion.div>

          {/* Role Cards */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              {roles.map((role, index) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={index === 0 ? openRegisterModal : undefined}
                  className={`bg-white rounded-2xl p-5 shadow-soft w-full text-left ${index === 0 ? "cursor-pointer group hover:shadow-md transition-shadow" : ""}`}
                >
                  <div
                    className={`w-12 h-12 ${role.iconBg} rounded-full flex items-center justify-center mb-4`}
                  >
                    <role.icon className="w-6 h-6 text-foreground/70" />
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{role.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {role.description}
                  </p>

                  {index === 0 && (
                    <div className="flex items-center gap-1 text-foreground/60 group-hover:text-foreground transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sticky Note */}
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            whileInView={{ opacity: 1, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-pastel-yellow p-6 rounded-xl shadow-sticky-note transform rotate-2 relative">
              {/* Tape */}
              <div className="absolute -top-2 right-8 w-12 h-5 bg-soft-pink/70 rounded-sm transform -rotate-6" />

              <p className="font-handwritten text-xl leading-relaxed text-foreground/90">
                You don&apos;t have to do everything.
                <br />
                <br />
                Just something.
                <br />
                <br />
                That&apos;s enough.
              </p>

              <Heart className="mt-4 w-5 h-5 text-soft-pink fill-soft-pink" />
            </div>

            {/* Decorative flower */}
            <div className="absolute -bottom-4 -right-4 text-3xl hidden lg:block">
              🌸
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
