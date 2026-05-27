"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, Heart, Sparkles } from "lucide-react"
import { useRegisterModal } from "@/components/register-modal-provider"

const faqs = [
  {
    question: "Is this online or offline?",
    answer:
      "The Girlfriend Hour is a real, offline community experience. We meet in person — no cameras, no performances for the internet, no filters. Just real people, real space, real connection.",
    emoji: "📍",
  },
  {
    question: "Can beginners join?",
    answer:
      "Absolutely. In fact, this space was made for people who have never done this before. You don't need experience, skill, or confidence. Just curiosity — that's enough.",
    emoji: "🌱",
  },
  {
    question: "Do I need performance experience?",
    answer:
      "Not at all. This is not a performance. This is expression. There is a difference. You are not here to impress anyone. You are here to feel, explore, and be yourself.",
    emoji: "✨",
  },
  {
    question: "Can I join alone?",
    answer:
      "Yes — and many people do. Coming alone is actually one of the most powerful things you can do here. You will not feel alone for long. The community makes sure of that.",
    emoji: "🌸",
  },
  {
    question: "Is it free?",
    answer:
      "Yes, completely free. The Girlfriend Hour is community-led and supported by partners like Udayan Care Fellowship (USF) and Kshrujan. Your participation costs nothing except showing up.",
    emoji: "💛",
  },
  {
    question: "Can I participate without performing?",
    answer:
      "Yes. You can listen, witness, support, and experience the space without ever stepping up to speak or perform. Your presence is enough.",
    emoji: "🤍",
  },
  {
    question: "Is this only for girls?",
    answer:
      "The Girlfriend Hour was originally built for young women and non-binary people, but we welcome all genders who believe in and respect the values of emotional safety, expression, and community. If you care about this space, you belong here.",
    emoji: "🌈",
  },
  {
    question: "What should I bring?",
    answer:
      "Just yourself. Wear something comfortable. Bring a notebook if you want — some people like to write. Mostly, bring an open heart and a willingness to be present.",
    emoji: "🎒",
  },
  {
    question: "Can I just attend and experience the space?",
    answer:
      "Yes! You can choose to simply witness, absorb, and experience without any participation pressure. Every role in this space is valid — including just being there.",
    emoji: "💫",
  },
]

export function FAQHomeSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { openRegisterModal } = useRegisterModal()

  return (
    <section id="faq" className="relative py-16 md:py-28 px-4 sm:px-6 lg:px-8">
      {/* Soft background */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block bg-baby-blue/50 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide mb-5">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4">
            Everything you want to{" "}
            <span className="font-handwritten text-lavender italic font-normal text-4xl md:text-6xl">
              know.
            </span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg leading-relaxed">
            Honest, warm answers to the questions we get most often.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "bg-white border-foreground shadow-soft"
                    : "bg-white/50 border-foreground/10 hover:border-foreground/25 hover:bg-white/70"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-5 py-4 md:px-6 md:py-5 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="text-xl shrink-0">{faq.emoji}</span>
                    <span className="font-serif font-bold text-base md:text-lg text-foreground leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isOpen
                        ? "bg-lavender text-foreground rotate-0"
                        : "bg-foreground/5 text-foreground/50"
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 md:px-6 pb-5 pt-0">
                        <div className="w-10 h-0.5 bg-lavender/50 rounded-full mb-4" />
                        <p className="text-foreground/75 leading-relaxed text-sm md:text-base font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center relative bg-lavender/20 border border-lavender/30 rounded-3xl p-8 md:p-10 overflow-hidden"
        >
          <Sparkles className="absolute top-5 left-5 w-5 h-5 text-pastel-yellow opacity-60" />
          <Heart className="absolute bottom-5 right-5 w-5 h-5 text-soft-pink opacity-60 fill-soft-pink" />

          <h3 className="font-serif text-2xl font-bold mb-2">Still wondering if this is for you?</h3>
          <p className="font-handwritten text-xl text-foreground/70 mb-6">
            The answer is yes. It is.
          </p>
          <button
            onClick={openRegisterModal}
            className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-7 py-3.5 rounded-full font-medium hover:bg-foreground/90 transition-all hover:scale-105"
          >
            Join the Experience
            <Heart className="w-4 h-4 fill-current" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
