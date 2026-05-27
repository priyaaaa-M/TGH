"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, PanInfo, useAnimationFrame } from "framer-motion"
import { Heart, ArrowRight, X, Send, Loader2 } from "lucide-react"
import Link from "next/link"
import { db, auth } from "@/lib/firebase"
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, limit, updateDoc, doc, increment } from "firebase/firestore"

const FORM_URL = "https://docs.google.com/forms/d/1ZSUlQS2k2gWhYY2oZmEOwRshBHK-Ml_tfNpdBm17cJk/edit?utm"

interface Confession {
  id: string
  text: string
  likes: number
  bgColor: string
  border: string
  paperStyle: string
  rotation: number
  doodle: string
  tapeColor: string
  tapeAngle: number
  size: string
}

const DEFAULT_CONFESSIONS: Confession[] = [
  {
    id: "default-1",
    text: "I act okay all the time.",
    likes: 124,
    bgColor: "#FFF9E8",
    border: "#F5D75A",
    paperStyle: "lined",
    rotation: -3,
    doodle: "flower",
    tapeColor: "rgba(250,220,60,0.65)",
    tapeAngle: -8,
    size: "w-[170px] md:w-[190px] min-h-[200px]",
  },
  {
    id: "default-2",
    text: "I don't know who I really am.",
    likes: 98,
    bgColor: "#EDE0FF",
    border: "#C9A7F5",
    paperStyle: "plain",
    rotation: 3,
    doodle: "butterfly",
    tapeColor: "rgba(230,170,220,0.65)",
    tapeAngle: 5,
    size: "w-[185px] md:w-[200px] min-h-[220px]",
  },
  {
    id: "default-3",
    text: "I am tired of pretending.",
    likes: 156,
    bgColor: "#FFE3E8",
    border: "#F5A0B0",
    paperStyle: "grid",
    rotation: -1,
    doodle: "star",
    tapeColor: "rgba(200,180,255,0.65)",
    tapeAngle: -3,
    size: "w-[160px] md:w-[180px] min-h-[195px]",
  },
  {
    id: "default-4",
    text: "I just want to be heard.",
    likes: 201,
    bgColor: "#FFF4C8",
    border: "#FAD34A",
    paperStyle: "plain",
    rotation: 2,
    doodle: "heart",
    tapeColor: "rgba(255,190,150,0.65)",
    tapeAngle: 8,
    size: "w-[175px] md:w-[195px] min-h-[210px]",
  },
  {
    id: "default-5",
    text: "I smile in public, break in private.",
    likes: 87,
    bgColor: "#E8F5E8",
    border: "#8DC891",
    paperStyle: "torn",
    rotation: -2,
    doodle: "moon",
    tapeColor: "rgba(130,200,180,0.65)",
    tapeAngle: -6,
    size: "w-[180px] md:w-[200px] min-h-[215px]",
  },
  {
    id: "default-6",
    text: "Some days I feel too much for this world.",
    likes: 112,
    bgColor: "#FFE8D8",
    border: "#F5B49A",
    paperStyle: "lined",
    rotation: 1,
    doodle: "sparkles",
    tapeColor: "rgba(190,210,255,0.65)",
    tapeAngle: 4,
    size: "w-[190px] md:w-[210px] min-h-[205px]",
  },
  {
    id: "default-7",
    text: "I question everything I feel.",
    likes: 77,
    bgColor: "#F0F4FF",
    border: "#9AB0F5",
    paperStyle: "plain",
    rotation: -3,
    doodle: "flower",
    tapeColor: "rgba(250,220,60,0.65)",
    tapeAngle: 3,
    size: "w-[165px] md:w-[185px] min-h-[200px]",
  },
  {
    id: "default-8",
    text: "I wish people saw the real me.",
    likes: 143,
    bgColor: "#FFF9E8",
    border: "#F5D75A",
    paperStyle: "grid",
    rotation: 2,
    doodle: "star",
    tapeColor: "rgba(230,170,220,0.65)",
    tapeAngle: -4,
    size: "w-[175px] md:w-[195px] min-h-[195px]",
  },
]




export function UnfilteredWallSection() {
  const [likedCards, setLikedCards] = useState<Set<string>>(new Set())
  const [dbConfessions, setDbConfessions] = useState<Confession[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [newConfession, setNewConfession] = useState("")
  
  const containerRef = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)
  const pausedRef = useRef(false)
  
  const CARD_W = 210 // approx card width + gap in px

  // Combine static and dynamic notes
  const allConfessions = [...DEFAULT_CONFESSIONS, ...dbConfessions]
  const N = allConfessions.length
  
  // Triple the data for the infinite scroll effect
  const TRIPLE = N > 0 ? [...allConfessions, ...allConfessions, ...allConfessions] : []

  // Real-time listener for confessions
  useEffect(() => {
    const q = query(collection(db, "wallNotes"), orderBy("createdAt", "desc"), limit(20))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Confession[]
      console.log("Firestore confessions fetched:", docs.length)
      setDbConfessions(docs)
    })

    // Load liked notes from localStorage
    const savedLikes = localStorage.getItem("gh_liked_notes")
    if (savedLikes) {
      setLikedCards(new Set(JSON.parse(savedLikes)))
    }

    return () => unsubscribe()
  }, [])



  // Seed at the "middle" copy so we can scroll both directions
  useEffect(() => {
    if (N > 0) {
      xRef.current = -N * CARD_W
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${xRef.current}px)`
      }
    }
  }, [N])

  // Slow auto-scroll
  useAnimationFrame((_, delta) => {
    if (pausedRef.current || N === 0) return
    xRef.current -= (delta / 1000) * 40 // 40px/s

    // Seamless loop
    const minX = -N * CARD_W * 2
    if (xRef.current < minX) {
      xRef.current += N * CARD_W
    }
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${xRef.current}px)`
    }
  })

  // Drag support
  const dragStartX = useRef(0)
  const dragStartOffset = useRef(0)

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX
    dragStartOffset.current = xRef.current
    pausedRef.current = true
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!pausedRef.current) return
    const dx = e.clientX - dragStartX.current
    xRef.current = dragStartOffset.current + dx
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${xRef.current}px)`
    }
  }
  const onPointerUp = () => {
    pausedRef.current = false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newConfession.trim() || isSubmitting) return
    
    setIsSubmitting(true)
    try {
      const styles = [
        { bgColor: "#FFF9E8", border: "#F5D75A", paperStyle: "lined", tapeColor: "rgba(250,220,60,0.65)", doodle: "flower" },
        { bgColor: "#EDE0FF", border: "#C9A7F5", paperStyle: "plain", tapeColor: "rgba(230,170,220,0.65)", doodle: "butterfly" },
        { bgColor: "#FFE3E8", border: "#F5A0B0", paperStyle: "grid", tapeColor: "rgba(200,180,255,0.65)", doodle: "star" },
      ]
      const style = styles[Math.floor(Math.random() * styles.length)]
      
      await addDoc(collection(db, "wallNotes"), {
        text: newConfession,
        likes: 0,
        createdAt: serverTimestamp(),
        rotation: Math.random() * 6 - 3,
        tapeAngle: Math.random() * 10 - 5,
        size: "w-[180px] md:w-[200px] min-h-[210px]",
        ...style
      })
      
      setNewConfession("")
      setShowSubmitModal(false)
    } catch (err) {
      console.error("Error submitting confession:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleLike = async (confessionId: string) => {
    if (likedCards.has(confessionId)) return
    
    // Optimistic Update
    const nextLikes = new Set(likedCards).add(confessionId)
    setLikedCards(nextLikes)
    localStorage.setItem("gh_liked_notes", JSON.stringify(Array.from(nextLikes)))

    try {
      await updateDoc(doc(db, "wallNotes", confessionId), {
        likes: increment(1)
      })
    } catch (err) {
      console.error("Error liking confession:", err)
    }
  }

  return (
    <section id="voices" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />

      {/* Floating stickers */}
      <motion.div animate={{ y: [0, -5, 0], rotate: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity }}
        className="absolute top-8 left-6 font-handwritten text-lavender/40 text-2xl select-none pointer-events-none">✦</motion.div>
      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute top-12 right-10 text-soft-pink/40 pointer-events-none">
        <Heart className="w-4 h-4 fill-current" />
      </motion.div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-1"
          >
            <div className="flex items-center gap-2">
              <span className="font-handwritten text-xl md:text-2xl text-foreground tracking-wide">
                UNFILTERED WALL
              </span>
              <Heart className="w-4 h-4 text-soft-pink fill-soft-pink" />
            </div>
            <p className="text-sm text-muted-foreground italic">
              Real thoughts. Real people. Real brave.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-1.5 font-handwritten text-lavender hover:text-lavender/70 transition-colors text-base"
            >
              Share your voice
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Submission Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative"
            >
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl font-serif font-bold mb-2">Share your thoughts</h3>
              <p className="text-sm text-muted-foreground mb-6 italic">Your voice is safe and anonymous here.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={newConfession}
                  onChange={(e) => setNewConfession(e.target.value)}
                  placeholder="What's on your mind? (Keep it unfiltered...)"
                  className="w-full h-32 p-4 rounded-2xl bg-cream border-none focus:ring-2 focus:ring-lavender resize-none text-base placeholder:italic"
                  maxLength={200}
                  required
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting || !newConfession.trim()}
                  className="w-full flex items-center justify-center gap-2 bg-foreground text-primary-foreground py-3 rounded-full font-medium hover:bg-foreground/90 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>Submitting... <Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : (
                    <>Submit to the Wall <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Infinite scroll wall */}
      <div
        className="relative w-full overflow-hidden"
        style={{ cursor: "grab" }}
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Left gradient fade */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F8F4EE] to-transparent z-10 pointer-events-none" />
        {/* Right gradient fade */}
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F8F4EE] to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          className="flex items-end gap-4 pb-8 pt-6 pl-4"
          style={{ willChange: "transform", touchAction: "none" }}
        >
          {TRIPLE.map((confession, idx) => {
            const globalId = `${confession.id}-${idx}`
            return (
              <StickyNote
                key={`${idx}-${globalId}`}
                confession={confession}
                index={idx}
                isLiked={likedCards.has(globalId)}
                onToggleLike={() => toggleLike(globalId)}
              />
            )
          })}
        </div>
      </div>

      {/* Static dot indicators (decorative) */}
      <div className="flex justify-center gap-2.5 mt-4">
        {allConfessions.slice(0, 6).map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            className="w-1.5 h-1.5 rounded-full bg-foreground/25"
          />
        ))}
      </div>
    </section>
  )
}

interface StickyNoteProps {
  confession: Confession
  index: number
  isLiked: boolean
  onToggleLike: () => void
}

const doodleIcons: Record<string, React.ReactNode> = {
  sparkles: (
    <svg className="w-5 h-5 text-lavender/60" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L13.09 8.26L19 7L14.74 11.26L21 12L14.74 12.74L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12.74L3 12L9.26 11.26L5 7L10.91 8.26L12 2Z" />
    </svg>
  ),
  flower: (
    <svg className="w-5 h-5 text-soft-pink/70" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="5" r="2.5" /><circle cx="12" cy="19" r="2.5" />
      <circle cx="5" cy="12" r="2.5" /><circle cx="19" cy="12" r="2.5" />
      <circle cx="7" cy="7" r="2" /><circle cx="17" cy="7" r="2" />
      <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
    </svg>
  ),
  star: (
    <svg className="w-5 h-5 text-pastel-yellow" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </svg>
  ),
  butterfly: (
    <svg className="w-5 h-5 text-blue-300/80" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 8C12 8 9 3 4 3C4 8 8 11 11 12C8 13 4 16 4 21C9 21 12 16 12 16C12 16 15 21 20 21C20 16 16 13 13 12C16 11 20 8 20 3C15 3 12 8 12 8Z" />
    </svg>
  ),
  moon: (
    <svg className="w-5 h-5 text-lavender/70" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C7.03 3 3 7.03 3 12S7.03 21 12 21C12.83 21 13.63 20.88 14.39 20.67C13.53 19.61 13 18.25 13 16.75C13 13.3 15.8 10.5 19.25 10.5C19.58 10.5 19.91 10.53 20.22 10.58C19.83 6.27 16.27 3 12 3Z" />
    </svg>
  ),
  heart: (
    <svg className="w-5 h-5 text-pink-400/80" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
    </svg>
  ),
}

function StickyNote({ confession, index, isLiked, onToggleLike }: StickyNoteProps) {
  const [liked, setLiked] = useState(isLiked)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % DEFAULT_CONFESSIONS.length) * 0.04 }}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        y: -10,
        zIndex: 20,
        transition: { type: "spring", stiffness: 400, damping: 18 },
      }}
      className={`relative flex-shrink-0 ${confession.size} p-4 flex flex-col cursor-default`}
      style={{
        background: confession.bgColor,
        border: `1px solid ${confession.border}20`,
        transform: `rotate(${confession.rotation}deg)`,
        borderRadius: "2px",
        boxShadow: `2px 4px 12px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.05), inset 0 0 0 1px ${confession.border}18`,
        position: "relative",
      }}
    >
      {/* Tape */}
      <div
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-[18px] rounded-[2px] shadow-sm"
        style={{
          background: confession.tapeColor,
          transform: `translateX(-50%) rotate(${confession.tapeAngle}deg)`,
        }}
      />

      {/* Paper texture: lined */}
      {confession.paperStyle === "lined" && (
        <div className="absolute inset-x-4 top-10 bottom-10 flex flex-col gap-[20px] pointer-events-none opacity-15">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-[1px] bg-blue-400" />
          ))}
        </div>
      )}

      {/* Paper texture: grid */}
      {confession.paperStyle === "grid" && (
        <div className="absolute inset-4 pointer-events-none opacity-10"
          style={{
            backgroundImage: "linear-gradient(#666 1px, transparent 1px), linear-gradient(90deg, #666 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
      )}

      {/* Corner fold for torn style */}
      {confession.paperStyle === "torn" && (
        <div className="absolute bottom-0 right-0 w-7 h-7 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-10 h-10 bg-[#F8F4EE] transform rotate-45 translate-x-5 translate-y-5 shadow-inner" />
        </div>
      )}

      {/* Quote mark */}
      <span className="text-foreground/12 text-4xl font-serif leading-none select-none">&ldquo;</span>

      {/* Text */}
      <p className="flex-1 font-medium text-foreground/85 text-sm leading-snug mt-1 relative z-10">
        {confession.text}
      </p>

      {/* Bottom row */}
      <div className="flex items-end justify-between mt-3 relative z-10">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleLike() }}
          className="flex items-center gap-1 group/like relative"
        >
          <AnimatePresence>
            {isLiked && (
              <motion.div
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              isLiked
                ? "text-red-500 fill-red-500 scale-125"
                : "text-foreground/30 group-hover/like:text-red-400 group-hover/like:scale-110"
            }`}
          />
          <span className={`text-xs transition-colors ${isLiked ? "text-red-500 font-bold" : "text-foreground/50"}`}>
            {confession.likes}
          </span>
        </button>
        <div className="opacity-70">{doodleIcons[confession.doodle] || doodleIcons.sparkles}</div>
      </div>

      {/* Floating mini star on some */}
      {index % 3 === 0 && (
        <motion.div
          animate={{ rotate: [0, 12, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-3 -right-2 font-handwritten text-pastel-yellow text-sm select-none"
        >
          &#10022;
        </motion.div>
      )}
    </motion.div>
  )
}
