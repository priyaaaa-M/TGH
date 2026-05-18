"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { Play, Heart, Star, Sparkles } from "lucide-react"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"
import { useRegisterModal } from "@/components/register-modal-provider"

const polaroids = [
  {
    // friends sitting in circle, deep conversation
    img: "/IMG_fol/img2.png",
    caption: "real conversations that matter. 🫂",
    tapeColor: "bg-pastel-yellow/80",
    tapeAngle: "-rotate-3",
    rotation: -3,
    doodle: "star",
    alt: "A circle of young friends having a deep, candid conversation",
  },
  {
    // open mic / poetry performance on stage
    img: "/IMG_fol/img3.png",
    caption: "say it loudly. 🎤",
    tapeColor: "bg-soft-pink/80",
    tapeAngle: "rotate-2",
    rotation: 2,
    doodle: "heart",
    alt: "Young person performing poetry or singing on stage at an open mic night",
  },
  {
    // group playing guitar and singing together
    img: "/IMG_fol/img4.png",
    caption: "music heals softly. 🎸",
    tapeColor: "bg-lavender/80",
    tapeAngle: "-rotate-1",
    rotation: 1,
    doodle: "sparkles",
    alt: "Friends sitting together playing guitar and singing in a cozy candid moment",
  },
  {
    // brainstorming / creative session on laptops
    img: "/IMG_fol/img5.png",
    caption: "building things together. 💻",
    tapeColor: "bg-baby-blue/80",
    tapeAngle: "rotate-4",
    rotation: -2,
    doodle: "moon",
    alt: "Young people collaborating on laptops at a late night creative brainstorming session",
  },
  {
    // people dancing freely at a workshop
    img: "/IMG_fol/img6.png",
    caption: "move how you feel. 🕺",
    tapeColor: "bg-peach/80",
    tapeAngle: "-rotate-2",
    rotation: 3,
    doodle: "flower",
    alt: "Young people dancing freely and expressively at a community workshop",
  },
  {
    // people painting / journaling together
    img: "/IMG_fol/img7.png",
    caption: "creating without fear. 🎨",
    tapeColor: "bg-[#b3d9d3]/80",
    tapeAngle: "rotate-1",
    rotation: -1,
    doodle: "star",
    alt: "Friends painting and journaling together in a warm creative space",
  },
  {
    // group hug / emotional support moment
    img: "/IMG_fol/img8.png",
    caption: "safe. seen. supported. 🤍",
    tapeColor: "bg-soft-pink/80",
    tapeAngle: "-rotate-3",
    rotation: 2,
    doodle: "heart",
    alt: "Young people sharing a warm group hug and emotional support moment",
  },
  {
    // unfiltered moment
    img: "/IMG_fol/img9.png",
    caption: "unfiltered magic. ✨",
    tapeColor: "bg-lavender/80",
    tapeAngle: "rotate-3",
    rotation: -2,
    doodle: "sparkles",
    alt: "Young people expressing themselves freely in an unfiltered moment",
  },
]

// Responsive variables will be computed inside the component dynamically

const doodleMap: Record<string, React.ReactNode> = {
  star: <Star className="w-4 h-4 text-pastel-yellow fill-pastel-yellow" />,
  heart: <Heart className="w-4 h-4 text-soft-pink fill-soft-pink" />,
  sparkles: <Sparkles className="w-4 h-4 text-lavender" />,
  moon: <span className="text-sm">🌙</span>,
  flower: <span className="text-sm">🌸</span>,
}

export function BehindTheScenesSection() {
  const { openRegisterModal } = useRegisterModal()
  const isMobile = useIsMobile()
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const cardsVisible = isMobile ? 1 : (windowWidth < 1024 ? 2 : 4)
  const totalSlides = Math.ceil(polaroids.length / cardsVisible)

  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const activeSlide = Math.min(active, totalSlides - 1)

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > active ? 1 : -1)
      setActive(idx)
    },
    [active]
  )

  const next = useCallback(() => {
    setDirection(1)
    setActive((p) => {
      const nextSlide = p + 1
      return nextSlide >= totalSlides ? 0 : nextSlide
    })
  }, [totalSlides])

  const prev = useCallback(() => {
    setDirection(-1)
    setActive((p) => {
      const prevSlide = p - 1
      return prevSlide < 0 ? totalSlides - 1 : prevSlide
    })
  }, [totalSlides])

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(next, 8000) // Slowed down significantly for better readability
    return () => clearInterval(id)
  }, [isPaused, next])

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -60) next()
    else if (info.offset.x > 60) prev()
  }

  const visibleCards = polaroids.slice(activeSlide * cardsVisible, activeSlide * cardsVisible + cardsVisible)
  // peek card from next group
  const peekCard = polaroids[(activeSlide * cardsVisible + cardsVisible) % polaroids.length]

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 500 : -500, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -500 : 500, opacity: 0, scale: 0.95 }),
  }

  return (
    <section id="bts" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
      />

      {/* Floating doodles */}
      <motion.div animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-16 left-12 text-lavender/40 text-3xl select-none pointer-events-none">✦</motion.div>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 left-20 text-soft-pink/40 pointer-events-none">
        <Heart className="w-5 h-5 fill-current" />
      </motion.div>
      <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-12 text-pastel-yellow/50 pointer-events-none">
        <Star className="w-6 h-6" />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* ── LEFT: editorial text ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-5"
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2">
              <span className="inline-block bg-pastel-yellow/60 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-widest">
                Behind the Scenes
              </span>
              <Star className="w-4 h-4 text-pastel-yellow fill-pastel-yellow" />
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              The magic behind{" "}
              <span className="font-handwritten text-lavender italic font-normal">
                Unfiltered.
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-muted-foreground text-base leading-relaxed">
              Little moments. Big memories.{" "}
              <br />
              Real people. Real energy.{" "}
              <span className="text-[#E8612A] font-medium">Real us.</span>
            </p>

            {/* Handwritten annotation */}
            <div className="relative inline-block">
              <div className="bg-soft-pink/20 px-4 py-3 rounded-xl transform -rotate-1 border border-soft-pink/30">
                <p className="font-handwritten text-foreground/70 text-base leading-snug">
                  "every photo tells<br />a whole story" 📸
                </p>
              </div>
              {/* tape */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-pastel-yellow/70 rounded-[2px] -rotate-2" />
            </div>

            {/* CTA */}
            <button
              onClick={openRegisterModal}
              className="inline-flex items-center gap-2 border-2 border-foreground px-6 py-3 rounded-full font-medium hover:bg-foreground hover:text-primary-foreground transition-all hover:scale-105 group"
            >
              Watch BTS
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            </button>

            {/* Pagination dots */}
            <div className="flex items-center gap-2.5 pt-2">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="p-1"
                >
                  <motion.div
                    animate={{
                      scale: activeSlide === i ? 1.4 : 1,
                      backgroundColor: activeSlide === i ? "#1a1a1a" : "#c4c4c4",
                      width: activeSlide === i ? 20 : 8,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="h-2 rounded-full"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: horizontal polaroid carousel ── */}
          <div
            className="lg:col-span-8 relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDrag}
              className="cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeSlide}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className="flex gap-4"
                  style={{ userSelect: "none" }}
                >
                  {visibleCards.map((card, idx) => (
                    <PolaroidCard key={card.caption} card={card} idx={idx} cardsVisible={cardsVisible} />
                  ))}

                  {/* Peek card (partially visible) */}
                  <div className="flex-shrink-0 w-[80px] md:w-[100px] overflow-hidden rounded-sm">
                    <PolaroidCard card={peekCard} idx={visibleCards.length} cardsVisible={cardsVisible} peek />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Gradient fade on the right edge to hint more content */}
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#F8F4EE] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}

function PolaroidCard({
  card,
  idx,
  cardsVisible = 4,
  peek = false,
}: {
  card: (typeof polaroids)[0]
  idx: number
  cardsVisible?: number
  peek?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: card.rotation }}
      animate={{ opacity: 1, y: 0, rotate: card.rotation }}
      transition={{ duration: 0.4, delay: idx * 0.06 }}
      whileHover={
        !peek
          ? {
              scale: 1.04,
              rotate: 0,
              y: -8,
              transition: { type: "spring", stiffness: 400, damping: 20 },
            }
          : {}
      }
      className="relative bg-white flex-shrink-0 flex-grow-0"
      style={{
        width: peek ? "100%" : `calc(${100 / cardsVisible}% - 12px)`,
        minWidth: peek ? undefined : "140px",
        padding: "10px 10px 40px 10px",
        borderRadius: "2px",
        boxShadow: "3px 4px 14px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
        transform: `rotate(${card.rotation}deg)`,
      }}
    >
      {/* Tape strip */}
      <div
        className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-5 ${card.tapeColor} ${card.tapeAngle} rounded-[2px] shadow-sm`}
      />

      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <Image
          src={card.img}
          alt={card.alt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* film grain overlay */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
      </div>

      {/* Handwritten caption */}
      {!peek && (
        <p className="absolute bottom-2 left-2 right-2 font-handwritten text-xs md:text-sm text-foreground/80 text-center leading-tight">
          {card.caption}
        </p>
      )}

      {/* Doodle sticker corner */}
      {!peek && (
        <div className="absolute -top-3 -right-2">
          {doodleMap[card.doodle] || <Star className="w-4 h-4 text-pastel-yellow fill-pastel-yellow" />}
        </div>
      )}
    </motion.div>
  )
}
