"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { ArrowUpRight, Heart, Sparkles, Star, Users, Flame, Anchor } from "lucide-react"

export default function ExplorePage() {
  const formUrl = "https://docs.google.com/forms/d/1ZSUlQS2k2gWhYY2oZmEOwRshBHK-Ml_tfNpdBm17cJk/edit?utm"

  return (
    <main className="min-h-screen bg-cream selection:bg-lavender selection:text-foreground overflow-x-hidden">
      <Navbar />

      {/* SECTION 1 - HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-peach/50 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wider mb-6 rotate-[-2deg]">
              Our Ecosystem
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-8">
              More than an event.<br />
              <span className="italic text-sage-green relative inline-block">
                A space to feel,
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-sage-green/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
              </span>{" "}
              express, and belong.
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 font-medium">
              Built through storytelling, creativity, emotional safety, and youth-led expression.
            </p>
            <button 
              onClick={() => window.open(formUrl, "_blank")}
              className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-soft"
            >
              Join The Space
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-[10%] md:left-[20%] text-4xl text-peach/60"
        >
          <Sparkles />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-[10%] md:right-[20%] text-5xl text-baby-blue/60"
        >
          <Heart fill="currentColor" />
        </motion.div>
      </section>

      {/* SECTION 2 - ABOUT THE INITIATIVES */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-soft relative overflow-hidden border border-border/50 group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-baby-blue/20 rounded-bl-full transition-transform group-hover:scale-110" />
            <div className="relative z-10 md:w-2/3">
              <div className="inline-flex items-center gap-2 bg-baby-blue/30 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide mb-6">
                <Star className="w-3 h-3 text-foreground/70" />
                Initiative
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Udayan Care Fellowship Program</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Udayan Care Fellowship Program is a leadership and social impact initiative that supports young women through mentorship, education, exposure, and community-based learning experiences.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Leadership", "Learning", "Youth", "Women", "Growth"].map(tag => (
                  <span key={tag} className="bg-foreground/5 px-3 py-1 rounded-full text-xs font-medium text-foreground/70">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-sage-green/10 rounded-[2.5rem] p-8 md:p-12 shadow-soft relative overflow-hidden border border-sage-green/20 group md:ml-auto md:w-[90%]"
          >
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-sage-green/20 rounded-full transition-transform group-hover:scale-110" />
            <div className="relative z-10 md:w-3/4 md:ml-auto">
              <div className="inline-flex items-center gap-2 bg-sage-green/30 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide mb-6">
                <Users className="w-3 h-3 text-foreground/70" />
                Ecosystem
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">KSHRUJAN</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                KSHRUJAN is a youth-centered initiative focused on expression, communication, confidence-building, and meaningful learning experiences for students and young adults.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Creative Learning", "Expression", "Workshops", "Collaboration"].map(tag => (
                  <span key={tag} className="bg-foreground/5 px-3 py-1 rounded-full text-xs font-medium text-foreground/70">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-peach/10 rounded-[2.5rem] p-8 md:p-12 shadow-soft relative overflow-hidden border border-peach/20 group"
          >
            <div className="absolute top-1/2 right-4 -translate-y-1/2 w-24 h-24 bg-peach/30 rounded-full blur-xl transition-transform group-hover:scale-150" />
            <div className="relative z-10 md:w-2/3">
              <div className="inline-flex items-center gap-2 bg-peach/30 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide mb-6">
                <Flame className="w-3 h-3 text-foreground/70" />
                Experience
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">The Girlfriend Hour</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Girlfriend Hour is a creative micro-culture experience that brings young women together through storytelling, performance, and collaborative expression rooted in empathy, identity, and community.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Friendship", "Storytelling", "Stage", "Music", "Expression"].map(tag => (
                  <span key={tag} className="bg-foreground/5 px-3 py-1 rounded-full text-xs font-medium text-foreground/70">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 3 - HOW THEY CONNECT */}
      <section className="py-24 px-6 bg-lavender/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-serif font-bold mb-16"
          >
            How it all connects
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white px-8 py-4 rounded-full shadow-sm border-2 border-baby-blue/30 font-serif font-bold text-xl"
            >
              USF
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground"
            >
              <span className="hidden md:inline">→</span>
              <span className="inline md:hidden">↓</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white px-8 py-4 rounded-full shadow-sm border-2 border-sage-green/30 font-serif font-bold text-xl"
            >
              KSHRUJAN
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground"
            >
              <span className="hidden md:inline">→</span>
              <span className="inline md:hidden">↓</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white px-8 py-4 rounded-full shadow-sm border-2 border-peach/30 font-serif font-bold text-xl"
            >
              TGH
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/50 max-w-2xl mx-auto shadow-sm"
          >
            <p className="text-xl font-medium leading-relaxed">
              Organized by <span className="text-sage-green font-bold">KSHRUJAN</span> as part of a larger youth-led ecosystem of expression, emotional safety, and meaningful experiences.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative background scribbles */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </section>

      {/* SECTION 4 - EXPERIENCE VALUES */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-soft-pink/50 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wider mb-4">
            Core Pillars
          </span>
          <h2 className="text-4xl font-serif font-bold">What we stand for</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Emotional Safety", icon: Heart, color: "bg-soft-pink/30", rotate: "-rotate-2" },
            { title: "Creativity", icon: Sparkles, color: "bg-baby-blue/30", rotate: "rotate-1" },
            { title: "Youth Voices", icon: Users, color: "bg-sage-green/30", rotate: "-rotate-1" },
            { title: "Storytelling", icon: Star, color: "bg-lavender/30", rotate: "rotate-2" },
            { title: "Confidence", icon: Flame, color: "bg-orange-highlight/20", rotate: "-rotate-2" },
            { title: "Community", icon: Anchor, color: "bg-peach/30", rotate: "rotate-1" },
          ].map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className={`p-8 rounded-3xl ${val.color} ${val.rotate} transition-transform duration-300 flex flex-col items-center justify-center text-center gap-4 border border-white/40 shadow-sm`}
            >
              <val.icon className="w-8 h-8 opacity-70" />
              <h3 className="text-xl font-bold font-serif">{val.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
