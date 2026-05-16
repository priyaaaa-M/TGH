"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"

const marqueeItems = [
  "EVER FELT LIKE YOU'RE CONSTANTLY PERFORMING?",
  "SAYING THE RIGHT THINGS.",
  "LOOKING A CERTAIN WAY.",
  "BEING... ACCEPTABLE?",
  "WHAT IF THERE WAS A SPACE WHERE YOU DIDN'T HAVE TO?",
]

export function MarqueeStrip() {
  return (
    <div className="relative bg-foreground py-4 overflow-hidden">
      <div className="flex animate-marquee">
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex shrink-0">
            {marqueeItems.map((item, index) => (
              <div
                key={`${setIndex}-${index}`}
                className="flex items-center gap-4 px-4 md:px-8"
              >
                <span className="text-pastel-yellow font-medium text-sm md:text-base whitespace-nowrap">
                  {item}
                </span>
                <span className="text-soft-pink">
                  {index % 2 === 0 ? (
                    <Heart className="w-4 h-4 fill-current" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
