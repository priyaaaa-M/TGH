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

      {/* SECTION 3 - HOW IT ALL CONNECTS */}
      <section className="py-28 px-6 bg-[#FAF6F0] relative overflow-hidden">
        {/* Decorative background scribbles */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-lavender/60 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground/80 rotate-[-1deg] mb-4">
              Our Blueprint
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">How it all connects</h2>
          </div>

          {/* Vertical flow container */}
          <div className="relative flex flex-col items-center">
            
            {/* The vertical connecting line */}
            <div className="absolute top-12 bottom-12 w-[2px] border-l-2 border-dashed border-lavender/80 pointer-events-none z-0" />

            {/* LEVEL 1: THE GIRLFRIEND HOUR */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 w-full text-center pb-12"
            >
              <div className="inline-block bg-white p-6 md:p-8 rounded-[2rem] shadow-soft border border-peach/20 max-w-xl mx-auto transition-transform hover:scale-[1.02]">
                <span className="font-handwritten text-peach text-lg md:text-xl font-bold tracking-wide uppercase block mb-3">
                  The Experience
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                  THE GIRLFRIEND HOUR — “UNFILTERED”
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  A space where young voices come together through storytelling, music, theatre, conversations, creativity, and expression.
                </p>
              </div>
            </motion.div>

            {/* Connector Wording 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 my-4 bg-[#FAF6F0] px-4 py-2"
            >
              <span className="font-handwritten text-foreground/50 text-base italic leading-none">
                Created & organised through:
              </span>
            </motion.div>

            {/* LEVEL 2: KSHRUJAN */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative z-10 w-full text-center pb-12"
            >
              <div className="inline-block bg-white p-6 md:p-8 rounded-[2rem] shadow-soft border border-sage-green/20 max-w-xl mx-auto transition-transform hover:scale-[1.02]">
                <span className="font-handwritten text-[#5B8266] text-lg md:text-xl font-bold tracking-wide uppercase block mb-3">
                  Creative Community
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                  KSHRUJAN
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  A youth-centered initiative focused on communication, confidence-building, creativity, and meaningful learning experiences.
                </p>
              </div>
            </motion.div>

            {/* Connector Wording 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 my-4 bg-[#FAF6F0] px-4 py-2"
            >
              <span className="font-handwritten text-foreground/50 text-base italic leading-none">
                Supported as part of:
              </span>
            </motion.div>

            {/* LEVEL 3: UDAYAN CARE FELLOWSHIP PROGRAM */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 w-full text-center"
            >
              <div className="inline-block bg-white p-6 md:p-8 rounded-[2rem] shadow-soft border border-baby-blue/20 max-w-xl mx-auto transition-transform hover:scale-[1.02]">
                <span className="font-handwritten text-[#3B66D4] text-lg md:text-xl font-bold tracking-wide uppercase block mb-3">
                  Larger Support System
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                  UDAYAN CARE FELLOWSHIP PROGRAM
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  A leadership and social impact fellowship supporting young women through mentorship, exposure, community, and growth-oriented experiences.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
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
