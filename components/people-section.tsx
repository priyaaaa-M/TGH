"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Heart } from "lucide-react"

const teamMembers = [
  {
    name: "Dipti Paras Shah",
    role: "Program Curator",
    quote: "“Dil hai chota sa, choti si aasha.”",
    image: "/profile_pic/Dipti Shah .png",
    bgColor: "bg-[#EDE0FF]",
    tapeColor: "rgba(230,170,220,0.65)",
    tapeAngle: -2,
    rotation: -1,
    doodle: "🎬",
    doodleColor: "text-lavender",
  },
  {
    name: "Dimple Jogani",
    role: "Creative Storyteller",
    quote: "“Every sunrise is an invitation to learn something new.”",
    image: "/profile_pic/Dimple Jogani .png",
    bgColor: "bg-[#FFE8D8]",
    tapeColor: "rgba(255,190,150,0.65)",
    tapeAngle: -4,
    rotation: -3,
    doodle: "🌸",
    doodleColor: "text-peach",
  },
  {
    name: "Sourabh Bagree",
    role: "Facilitator",
    quote: "“Kuch toh log kahenge, logon ka kaam hai kehna.”",
    image: "/profile_pic/Sourabh Bagree.png",
    bgColor: "bg-[#E8F5E8]",
    tapeColor: "rgba(130,200,180,0.65)",
    tapeAngle: 2,
    rotation: 2,
    doodle: "〰️",
    doodleColor: "text-sage",
  },
  {
    name: "Priyanka Mandal",
    role: "Digital Lead",
    quote: "“Designing systems that simplify, not complicate.”",
    image: "/profile_pic/Priyanka Mandal.png",
    bgColor: "bg-[#F0F4FF]",
    tapeColor: "rgba(190,210,255,0.65)",
    tapeAngle: 3,
    rotation: 1,
    doodle: "✨",
    doodleColor: "text-baby-blue",
  },
  {
    name: "Riddhi",
    role: "Creative Practitioner",
    quote: "“Bringing storytelling to life, Because expression needs safety.”",
    image: "",
    bgColor: "bg-[#FFF9E8]",
    tapeColor: "rgba(250,220,60,0.65)",
    tapeAngle: -3,
    rotation: -2,
    doodle: "✦",
    doodleColor: "text-pastel-yellow",
  },
]

export function PeopleSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth)
    }
  }, [])

  return (
    <section id="team" className="relative pt-20 md:pt-32 overflow-hidden bg-[#faf9f7]">
      {/* Background paper texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12 md:mb-20"
        >
          <span className="font-handwritten text-xl md:text-2xl text-lavender tracking-wide mb-4 inline-block transform -rotate-2">
            PEOPLE HOLDING THE SPACE
          </span>
          <h2 className="text-lg md:text-xl font-serif text-foreground/80 leading-relaxed font-medium">
            The people quietly shaping the energy, safety, creativity, and emotional heartbeat of this experience.
          </h2>
        </motion.div>
      </div>

      {/* Horizontal Scroll Carousel */}
      <div className="relative z-20 pb-20">
        {/* Gradients for fade effect on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#faf9f7] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#faf9f7] to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          className="flex gap-6 px-8 md:px-16 overflow-x-auto snap-x snap-mandatory pt-8 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ paddingLeft: "max(2rem, calc((100vw - 80rem) / 2 + 2rem))" }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 0, y: -10, zIndex: 40 }}
              className="flex-shrink-0 relative group snap-center"
              style={{ width: "240px" }}
            >
              {/* Card Container */}
              <div
                className={`p-3 pb-6 rounded-sm shadow-md transition-shadow duration-300 group-hover:shadow-xl relative ${member.bgColor}`}
                style={{ transform: `rotate(${member.rotation}deg)` }}
              >
                {/* Tape */}
                <div
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-5 rounded-[2px] shadow-sm z-20"
                  style={{
                    background: member.tapeColor,
                    transform: `translateX(-50%) rotate(${member.tapeAngle}deg)`,
                  }}
                />

                {/* Floating Doodle */}
                <motion.div
                  animate={{ y: [0, -4, 0], rotate: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                  className={`absolute -top-5 -right-3 text-3xl font-handwritten ${member.doodleColor} opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 z-30`}
                >
                  {member.doodle}
                </motion.div>

                {/* Photo */}
                <div className="relative w-full h-[200px] bg-white/50 mb-4 overflow-hidden rounded-[2px] shadow-inner group-hover:shadow-md transition-all duration-300">
                  {member.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale-[20%] sepia-[10%] group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=500&fit=crop';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-pastel-yellow/20 flex flex-col items-center justify-center border-2 border-dashed border-pastel-yellow/50">
                      <span className="font-serif text-lg font-medium text-foreground/50">Coming Soon</span>
                    </div>
                  )}
                  {/* Subtle paper grain over photo */}
                  <div className="absolute inset-0 opacity-[0.08] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg font-bold font-serif text-foreground leading-tight">
                    {member.name}
                  </h3>
                  <span className="inline-block mt-1 px-2.5 py-0.5 bg-white/60 rounded-full text-[11px] font-medium text-foreground/70 tracking-wide uppercase">
                    {member.role}
                  </span>

                  <div className="mt-4 px-1 relative">
                    <span className="absolute -left-1 -top-1 text-2xl text-foreground/10 font-serif leading-none">"</span>
                    <p className="font-handwritten text-foreground/80 text-[15px] leading-snug">
                      {member.quote.replace(/[“”]/g, '')}
                    </p>
                    <span className="absolute -right-1 bottom-0 text-2xl text-foreground/10 font-serif leading-none rotate-180">"</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cinematic Footer Section */}
      <div className="relative mt-8 md:mt-16 w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background image representing youth culture/glamour/stage lights */}
        <Image
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&h=900&fit=crop"
          alt="Youth community event with warm stage lights"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-[#111111]/90 via-[#111111]/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
            “This is more than an event.
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-handwritten leading-relaxed drop-shadow-md">
            It is a youth-led expression lab built with care, courage, creativity, and community.”
          </p>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-10 text-soft-pink/80"
          >
            <Heart className="w-8 h-8 mx-auto fill-current" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
