"use client"

import React from "react"
import { ArrowUpRight } from "lucide-react"

interface RegistrationButtonProps {
  className?: string
  text?: string
}

export function RegistrationButton({ className = "", text = "Join The Space" }: RegistrationButtonProps) {
  const FORM_LINK = "https://forms.gle/VqQ3Tdji3F4nCWny5"

  const handleClick = () => {
    window.open(FORM_LINK, "_blank")
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <button
        onClick={handleClick}
        className="group relative inline-flex justify-center items-center gap-2 bg-foreground text-primary-foreground px-8 py-4 rounded-full text-base sm:text-lg font-bold hover:bg-foreground/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] active:scale-95 overflow-hidden w-full sm:w-auto"
      >
        <span className="relative z-10">{text}</span>
        <ArrowUpRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-soft-pink/20 to-lavender/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </button>
      <span className="text-xs sm:text-sm text-foreground/70 font-medium italic text-center">
        Registrations are handled through our official form 🌸
      </span>
    </div>
  )
}
