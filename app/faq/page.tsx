"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Plus, Heart, Sparkles } from "lucide-react"
import { useRegisterModal } from "@/components/register-modal-provider"

const faqs = [
  {
    question: "Is this online or offline?",
    answer: "The Girlfriend Hour is a real, offline community experience. We meet in person — no cameras, no performances for the internet, no filters. Just real people, real space, real connection.",
    emoji: "📍",
  },
  {
    question: "What exactly is The Girlfriend Hour?",
    answer: "It's a micro-culture and a safe space built by young people, for young people. We blend storytelling, art, music, theatre, poetry, and unfiltered conversations to create an environment where everyone can explore their identity and express themselves freely without judgment.",
    emoji: "💫",
  },
  {
    question: "Can beginners join?",
    answer: "Absolutely. In fact, this space was made for people who have never done this before. You don't need experience, skill, or confidence. Just curiosity — that's enough.",
    emoji: "🌱",
  },
  {
    question: "Do I need performance experience?",
    answer: "Not at all. This is not a performance. This is expression. There is a difference. You are not here to impress anyone. You are here to feel, explore, and be yourself.",
    emoji: "✨",
  },
  {
    question: "Can I join alone?",
    answer: "Yes — and many people do. Coming alone is actually one of the most powerful things you can do here. You will not feel alone for long. The community makes sure of that.",
    emoji: "🌸",
  },
  {
    question: "Is it free?",
    answer: "Yes, completely free. The Girlfriend Hour is community-led and supported by partners like Udayan Care Fellowship (USF) and Kshrujan. Your participation costs nothing except showing up.",
    emoji: "💛",
  },
  {
    question: "Can I participate without performing?",
    answer: "Yes. You can listen, witness, support, and experience the space without ever stepping up to speak or perform. Your presence is enough.",
    emoji: "🤍",
  },
  {
    question: "Is this only for girls?",
    answer: "The Girlfriend Hour was originally built for young women and non-binary people, but we welcome all genders who believe in and respect the values of emotional safety, expression, and community. If you care about this space, you belong here.",
    emoji: "🌈",
  },
  {
    question: "What should I bring?",
    answer: "Just yourself. Wear something comfortable. Bring a notebook if you want — some people like to write. Mostly, bring an open heart and a willingness to be present.",
    emoji: "🎒",
  },
  {
    question: "Can I just attend and experience the space?",
    answer: "Yes! You can choose to simply witness, absorb, and experience without any participation pressure. Every role in this space is valid — including just being there.",
    emoji: "🪷",
  },
  {
    question: "What does 'Emotional Safety' mean here?",
    answer: "It means we prioritize your well-being. We have dedicated emotional safety leads at our events. We practice active listening, trigger warnings before heavy content, confidentiality (what happens in the space, stays in the space), and a zero-tolerance policy for judgment or hate speech.",
    emoji: "🛡️",
  },
  {
    question: "How do I join a specific group?",
    answer: "You can explore all our active groups on the 'Groups' page. Click on the one that resonates with you, read about their current projects, and fill out the general registration form stating your interest in that specific group.",
    emoji: "🤝",
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { openRegisterModal } = useRegisterModal()

  return (
    <main className="min-h-screen bg-[#F8F4EE] selection:bg-lavender selection:text-foreground">
      <Navbar />

      <section className="pt-28 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto relative">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-14 md:mb-20"
          >
            <span className="inline-block bg-baby-blue/40 border border-baby-blue/50 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground/80 -rotate-1">
              Got Questions?
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
              Frequently Asked{" "}
              <span className="font-handwritten text-lavender font-normal block mt-1 text-5xl md:text-7xl -rotate-2">
                curiosities.
              </span>
            </h1>
            <p className="text-lg text-foreground/70 font-medium max-w-xl mx-auto pt-2 leading-relaxed">
              Honest, warm answers to everything you want to know before showing up.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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
                          ? "bg-lavender text-foreground"
                          : "bg-foreground/5 text-foreground/50"
                      }`}
                    >
                      <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
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
                          <div className="w-10 h-0.5 bg-lavender/50 rounded-full mb-3" />
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
            className="mt-16 text-center bg-lavender/20 border border-lavender/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <Sparkles className="absolute top-6 left-6 w-5 h-5 text-pastel-yellow opacity-60" />
            <Heart className="absolute bottom-6 right-6 w-5 h-5 text-soft-pink opacity-60 fill-soft-pink" />

            <h3 className="font-serif text-2xl font-bold mb-2">Still wondering if this is for you?</h3>
            <p className="font-handwritten text-xl text-foreground/70 mb-6">The answer is yes. It is.</p>
            <button
              onClick={openRegisterModal}
              className="bg-foreground text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:scale-105 transition-transform"
            >
              Join the Experience
            </button>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
