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

      {/* SECTION 2 - THE ECOSYSTEM */}
      <section className="py-28 px-6 relative bg-[#FAF6F0] overflow-hidden">
        {/* Subtle decorative grid/dots background */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Decorative background illustrations (floating shapes) */}
        <div className="absolute top-20 left-[5%] text-soft-pink opacity-20 animate-pulse pointer-events-none">
          <Heart className="w-16 h-16 fill-current" />
        </div>
        <div className="absolute bottom-20 right-[5%] text-lavender opacity-20 animate-pulse pointer-events-none">
          <Sparkles className="w-20 h-20 fill-current" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24 space-y-4"
          >
            <span className="font-handwritten text-lavender text-xl md:text-2xl tracking-wide inline-block transform -rotate-1">
              Our Foundations
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
              The Spaces Behind This Experience
            </h2>
          </motion.div>

          {/* Staggered Timeline Flow */}
          <div className="relative flex flex-col items-stretch max-w-4xl mx-auto space-y-16 md:space-y-24">
            
            {/* Soft connecting dotted pathway */}
            <div className="absolute left-1/2 top-10 bottom-10 w-[2px] border-l-2 border-dashed border-lavender/40 pointer-events-none z-0 hidden md:block -translate-x-1/2" />

            {/* SPACE 1: THE GIRLFRIEND HOUR (Staggered Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative z-10 w-full md:w-[70%] md:self-start group"
            >
              <div 
                className="bg-[#FFF4F0] border border-[#FFD9CE] p-8 md:p-10 rounded-[2.5rem] shadow-soft relative transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-default"
                style={{ transform: "rotate(-1.5deg)" }}
              >
                {/* Scrapbook Tape */}
                <div 
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-[2px] shadow-sm z-20"
                  style={{
                    background: "rgba(255, 180, 160, 0.65)",
                    transform: "translateX(-50%) rotate(-4deg)"
                  }}
                />

                {/* Mini handwritten label */}
                <span className="font-handwritten text-[#E8612A] text-lg md:text-xl font-bold tracking-wide uppercase block mb-3">
                  The Experience
                </span>

                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                  THE GIRLFRIEND HOUR
                </h3>
                
                <p className="text-base text-foreground/85 leading-relaxed font-medium">
                  A creative micro-culture experience that brings young women together through storytelling, performance, and collaborative expression rooted in empathy, identity, and community.
                </p>

                {/* Floating Doodle */}
                <div className="absolute -top-6 -right-6 text-4xl opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none z-30">
                  💖
                </div>
              </div>
            </motion.div>

            {/* SPACE 2: KSHRUJAN (Staggered Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative z-10 w-full md:w-[70%] md:self-end group"
            >
              <div 
                className="bg-[#F3F8F4] border border-[#D5EAD8] p-8 md:p-10 rounded-[2.5rem] shadow-soft relative transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-default"
                style={{ transform: "rotate(1.2deg)" }}
              >
                {/* Scrapbook Tape */}
                <div 
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-[2px] shadow-sm z-20"
                  style={{
                    background: "rgba(190, 225, 200, 0.65)",
                    transform: "translateX(-50%) rotate(3deg)"
                  }}
                />

                {/* Mini handwritten label */}
                <span className="font-handwritten text-[#5B8266] text-lg md:text-xl font-bold tracking-wide uppercase block mb-3">
                  Organising & Shaping
                </span>

                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                  KSHRUJAN
                </h3>
                
                <p className="text-base text-foreground/85 leading-relaxed font-medium">
                  A youth-centered initiative focused on expression, communication, confidence-building, and meaningful learning experiences for students and young adults.
                </p>

                {/* Floating Doodle */}
                <div className="absolute -bottom-6 -left-6 text-4xl opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none z-30">
                  🌱
                </div>
              </div>
            </motion.div>

            {/* SPACE 3: UDAYAN CARE FELLOWSHIP PROGRAM (Staggered Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative z-10 w-full md:w-[70%] md:self-start group"
            >
              <div 
                className="bg-[#F2F4FC] border border-[#D3DBFA] p-8 md:p-10 rounded-[2.5rem] shadow-soft relative transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-default"
                style={{ transform: "rotate(-1deg)" }}
              >
                {/* Scrapbook Tape */}
                <div 
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-[2px] shadow-sm z-20"
                  style={{
                    background: "rgba(180, 195, 250, 0.65)",
                    transform: "translateX(-50%) rotate(-2deg)"
                  }}
                />

                {/* Mini handwritten label */}
                <span className="font-handwritten text-[#3B66D4] text-lg md:text-xl font-bold tracking-wide uppercase block mb-3">
                  The Support System
                </span>

                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                  UDAYAN CARE FELLOWSHIP PROGRAM
                </h3>
                
                <p className="text-base text-foreground/85 leading-relaxed font-medium">
                  A leadership and social impact initiative that supports young women through mentorship, education, exposure, and community-based learning experiences.
                </p>

                {/* Floating Doodle */}
                <div className="absolute -top-6 -left-6 text-4xl opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none z-30">
                  💫
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 5 - JOIN THE EXPERIENCE */}
      <section className="py-24 px-6 bg-[#faf9f7] relative overflow-hidden">
        {/* Decorative background paper pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Tag */}
            <span className="inline-block bg-peach/50 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground/80 rotate-[-1deg]">
              Registrations Are Now Open
            </span>

            {/* Headline */}
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
                The Girlfriend Hour —{" "}
                <span className="font-handwritten text-lavender italic font-normal block md:inline text-4xl md:text-6xl">
                  “UNFILTERED”
                </span>
              </h2>
              <p className="text-sm md:text-base font-handwritten text-muted-foreground italic">
                (No edits. No apologies. Just you.)
              </p>
            </div>

            {/* Main description paragraph */}
            <div className="max-w-2xl mx-auto space-y-6 text-foreground/80 leading-relaxed text-base md:text-lg font-medium">
              <p>
                A safe, expressive, and collaborative experience where young voices come together through theatre, poetry, music, storytelling, dance, comedy, conversation, and creative exploration.
              </p>
              <p>
                Inspired by films, emotions, lived experiences, and personal truth — participants will interpret themes through their own lens and build something meaningful together.
              </p>
            </div>

            {/* Bullet points section */}
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 max-w-xl mx-auto shadow-sm text-left">
              <h4 className="font-serif font-bold text-lg mb-4 text-center">Whether you want to:</h4>
              <ul className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {["perform", "create", "collaborate", "organise", "support", "simply experience"].map((item) => (
                  <li key={item} className="flex items-center justify-center sm:justify-start gap-2 bg-cream px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold border border-border/40 text-foreground/85">
                    <Heart className="w-3 h-3 text-soft-pink fill-soft-pink flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-center font-handwritten text-lg mt-6 text-[#E8612A] font-bold">
                — there is space for you here.
              </p>
            </div>

            {/* Invitation */}
            <div className="space-y-1 font-serif text-lg md:text-2xl font-bold tracking-wider text-foreground/90 uppercase pt-4 leading-tight">
              <p>Build your team.</p>
              <p>Bring your voice.</p>
              <p>Come as you are.</p>
            </div>

            {/* Google Form Embed Container */}
            <div className="mt-16 bg-white/40 backdrop-blur-sm p-3 sm:p-5 md:p-6 rounded-[2.5rem] border border-white/60 shadow-soft max-w-3xl mx-auto overflow-hidden">
              <div className="relative w-full overflow-hidden rounded-[2rem] bg-cream/30 min-h-[750px] sm:min-h-[850px] md:min-h-[900px] border border-border/20">
                <iframe
                  src="https://docs.google.com/forms/d/1ZSUlQS2k2gWhYY2oZmEOwRshBHK-Ml_tfNpdBm17cJk/viewform?embedded=true"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="absolute inset-0 w-full h-full rounded-[2rem]"
                >
                  Loading…
                </iframe>
              </div>
            </div>

            {/* Small Emotional Footer Text */}
            <p className="font-handwritten text-lg sm:text-xl text-foreground/70 max-w-md mx-auto pt-6 leading-relaxed">
              “Looking forward to creating something honest, expressive, and unforgettable together 💫”
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
