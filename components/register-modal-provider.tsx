"use client"

import React, { createContext, useContext, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Sparkles, X, Heart, Star } from "lucide-react"

interface RegisterModalContextType {
  openRegisterModal: () => void
  closeRegisterModal: () => void
}

const RegisterModalContext = createContext<RegisterModalContextType | undefined>(undefined)

export function RegisterModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openRegisterModal = () => setIsOpen(true)
  const closeRegisterModal = () => setIsOpen(false)

  const handleContinue = () => {
    window.open("https://forms.gle/VqQ3Tdji3F4nCWny5", "_blank", "noopener,noreferrer")
  }

  return (
    <RegisterModalContext.Provider value={{ openRegisterModal, closeRegisterModal }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop with soft blur and fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeRegisterModal}
              className="fixed inset-0 bg-[#111111]/40 backdrop-blur-md z-40"
            />
            
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.12 }}
              className="relative w-full max-w-2xl bg-[#F8F4EE] rounded-[2rem] p-6 sm:p-10 md:p-12 shadow-2xl border-4 border-foreground overflow-y-auto max-h-[90vh] z-50 my-8 mx-auto scrollbar-thin scrollbar-thumb-foreground/20"
            >
              {/* Scrapbook Tape Effect */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#FFD86B] -rotate-2 shadow-sm z-20 flex items-center justify-center border border-foreground/10">
                <span className="font-handwritten text-foreground text-sm font-black tracking-widest">
                  UNFILTERED
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={closeRegisterModal}
                className="absolute top-4 right-4 p-2 rounded-full border border-foreground/10 hover:bg-lavender/35 hover:scale-105 active:scale-95 transition-all z-20 text-foreground"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Decorative pastel glowing background blur blobs */}
              <div className="absolute -top-10 -left-10 w-28 h-28 bg-soft-pink/40 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-baby-blue/40 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-lavender/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative mt-4 space-y-6 text-center md:text-left">
                <div className="space-y-3 text-center">
                  <div className="inline-flex items-center gap-1.5 bg-lavender/70 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-foreground border border-foreground/5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-orange-highlight fill-current" />
                    Registrations Are Now Open
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-[2.25rem] font-serif font-black tracking-tight leading-[1.1] text-foreground">
                    THE GIRLFRIEND HOUR — <span className="underline decoration-orange-highlight decoration-4 decoration-skip-ink">“UNFILTERED”</span>
                  </h3>
                  <p className="font-handwritten text-xl sm:text-2xl text-orange-highlight font-bold italic tracking-wide">
                    (No edits. No apologies. Just you.)
                  </p>
                </div>

                <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-foreground/85 font-medium font-sans">
                  <p>
                    This is a safe, expressive, and collaborative space where young voices can explore theatre, poetry, music, storytelling, dance, comedy, conversation, and creative expression.
                  </p>
                  <p>
                    Build your team, bring your creativity, and be part of an experience rooted in authenticity, collaboration, and emotional safety.
                  </p>
                  
                  <div className="bg-white/70 backdrop-blur-sm border-2 border-foreground p-5 sm:p-6 rounded-2xl space-y-3 text-left rotate-[1deg] shadow-soft-lg relative">
                    <div className="absolute -top-2 right-6 w-8 h-4 bg-soft-pink/70 rounded-sm transform rotate-12" />
                    <p className="font-bold text-xs text-foreground/50 uppercase tracking-widest">Whether you want to:</p>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-serif text-foreground font-black text-xs sm:text-sm md:text-base">
                      <li className="flex items-center gap-1.5">
                        <span className="text-soft-pink text-xs sm:text-sm">✨</span> perform
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-pastel-yellow text-xs sm:text-sm">🎨</span> create
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-baby-blue text-xs sm:text-sm">🤝</span> collaborate
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-sage-green text-xs sm:text-sm">📣</span> organise
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-[#FF8C42] text-xs sm:text-sm">💖</span> support
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-lavender text-xs sm:text-sm">👀</span> experience
                      </li>
                    </ul>
                    <p className="font-handwritten text-right text-base sm:text-lg text-foreground/90 font-bold mt-3 border-t border-dashed border-foreground/10 pt-2">— there is space for you here.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-dashed border-foreground/10">
                  <button
                    onClick={handleContinue}
                    className="w-full sm:w-auto bg-foreground text-primary-foreground hover:bg-foreground/90 font-bold px-8 py-4 rounded-full text-sm sm:text-base transition-all hover:scale-105 hover:shadow-soft-lg flex items-center justify-center gap-2 border-2 border-foreground"
                  >
                    Continue to Registration Form <span className="text-lg">→</span>
                  </button>
                  <button
                    onClick={closeRegisterModal}
                    className="w-full sm:w-auto bg-white/60 hover:bg-white text-foreground/75 hover:text-foreground font-bold px-6 py-3.5 rounded-full text-sm sm:text-base transition-all hover:scale-105 border border-foreground/10"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </RegisterModalContext.Provider>
  )
}

export function useRegisterModal() {
  const context = useContext(RegisterModalContext)
  if (context === undefined) {
    throw new Error("useRegisterModal must be used within a RegisterModalProvider")
  }
  return context
}
