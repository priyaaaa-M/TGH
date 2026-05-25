"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Heart, Sparkles, Star } from "lucide-react"
import Image from "next/image"

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-[#F8F4EE] selection:bg-lavender selection:text-foreground overflow-x-hidden">
      <Navbar />

      {/* SECTION 1 - CINEMATIC STORYTELLING HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        {/* Soft elegant gradient glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[500px] bg-gradient-to-b from-[#FFF4F0] via-[#F8F4EE]/50 to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left: Stories Headline */}
          <div className="lg:col-span-6 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="inline-block bg-peach/40 border border-peach/50 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground/80 rotate-[-1deg]">
                The Journey of Expression
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] text-foreground">
                More than an event.<br />
                <span className="font-handwritten text-[#E8612A] font-normal block mt-2 text-5xl sm:text-6xl lg:text-7xl">
                  A shared universe.
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg md:text-xl text-foreground/85 font-medium leading-relaxed max-w-xl"
            >
              Unfiltered is born at the intersection of individual truth and collaborative empathy. It is where young voices explore their identity and shape their narratives freely.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 pt-2 text-foreground/60 text-sm font-handwritten italic"
            >
              <Heart className="w-4 h-4 text-soft-pink fill-soft-pink animate-pulse" />
              <span>curated by many hearts, speaking as one.</span>
            </motion.div>
          </div>

          {/* Hero Right: Premium Polaroid / Cinematic Frame displaying /profile_pic/hero_pg_new.png */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            whileHover={{ scale: 1.02, rotate: -0.5 }}
            className="lg:col-span-6 relative flex justify-center z-10"
          >
            {/* Scrapbook Tape top center */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pastel-yellow/85 rounded-sm transform -rotate-1 shadow-sm z-20" />

            {/* Polaroid Zine Border */}
            <div className="bg-white p-4 pb-14 rounded-[4px] shadow-2xl w-full max-w-md border border-foreground/5 transform rotate-1">
              <div className="relative aspect-[4/5] bg-cream rounded-sm overflow-hidden border border-foreground/10">
                <Image
                  src="/profile_pic/hero_pg_new.webp"
                  alt="The Girlfriend Hour Unfiltered Storytelling"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Soft feminine gradient blending */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              {/* Polaroid Caption */}
              <div className="pt-4 text-center">
                <p className="font-handwritten text-lg md:text-xl text-foreground/85">
                  unfiltered. unapologetic. raw. ✨
                </p>
              </div>
            </div>

            {/* Floating Doodles */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 text-5xl select-none opacity-80"
            >
              🌸
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6 text-pastel-yellow"
            >
              <Star className="w-8 h-8 fill-pastel-yellow" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - THE FOUNDATIONS */}
      <section className="py-24 px-6 relative bg-[#FAF6F0] overflow-hidden border-t border-foreground/5">
        {/* Scrapbook paper noise overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24 space-y-3"
          >
            <span className="font-handwritten text-lavender text-2xl tracking-wide inline-block transform -rotate-1">
              three beautiful worlds.
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
              The Foundations of Unfiltered
            </h2>
            <div className="w-32 h-1 bg-soft-pink/40 mx-auto rounded-full mt-4" />
          </motion.div>

          <div className="space-y-20 md:space-y-32">

            {/* FOUNDATION 1: THE GIRLFRIEND HOUR (TGH) */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:col-span-7 space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-[#FFF4F0] border border-[#FFD9CE] px-4 py-1.5 rounded-full">
                  <span className="text-xs font-bold tracking-wider text-[#E8612A] uppercase">01 / The Creative Catalyst</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground leading-tight">
                  THE GIRLFRIEND HOUR (TGH)
                </h3>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-medium">
                  At its core, **The Girlfriend Hour** is a creative incubator and micro-culture. We exist to build a vibrant, safe community where young women discover the absolute power of their voice. Through storytelling, collaborative arts, theatre, and deep, unedited expression, we craft experiences that are deeply personal yet universally understood.
                </p>
                <p className="text-sm font-handwritten text-muted-foreground/80 italic border-l-2 border-peach/50 pl-4 py-1">
                  “We don&apos;t fit into molds here. We break them, color them, and share them with the world.”
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:col-span-5 flex justify-center relative"
              >
                <div className="bg-white p-3 pb-8 rounded-[4px] shadow-lg w-full max-w-sm border border-foreground/5 transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="relative aspect-[4/3] bg-cream overflow-hidden">
                    <Image
                      src="/IMG_fol/img_2.png"
                      alt="The Girlfriend Hour"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-handwritten text-sm text-center text-foreground/75 mt-3">the magic of safe spaces. 💫</p>
                </div>
                <div className="absolute -top-2 left-8 w-12 h-4 bg-pastel-yellow/60 transform -rotate-12" />
              </motion.div>
            </div>

            {/* FOUNDATION 2: KSHRUJAN */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center md:flex-row-reverse">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:col-span-7 md:order-2 space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-[#F3F8F4] border border-[#D5EAD8] px-4 py-1.5 rounded-full">
                  <span className="text-xs font-bold tracking-wider text-[#5B8266] uppercase">02 / The Youth Backbone</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#344E41] leading-tight">
                  KSHRUJAN
                </h3>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-medium">
                  **Kshrujan** is a grass-roots, youth-led initiative that organizes, fosters, and empowers new learning ecosystems. Focused on bolstering self-confidence, soft skills, creative communication, and active leadership, Kshrujan creates spaces where students and young adults don&apos;t just learn—they participate, lead, and grow collectively.
                </p>
                <p className="text-sm font-handwritten text-muted-foreground/80 italic border-l-2 border-sage/50 pl-4 py-1">
                  “Empowerment starts when we learn to speak our truths without hesitation.”
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:col-span-5 md:order-1 flex justify-center relative"
              >
                <div className="bg-white p-3 pb-8 rounded-[4px] shadow-lg w-full max-w-sm border border-foreground/5 transform rotate-1 hover:rotate-0 transition-transform">
                  <div className="relative aspect-[4/3] bg-cream overflow-hidden">
                    <Image
                      src="/IMG_fol/kshrujan_logo.png"
                      alt="Kshrujan Logo"
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <p className="font-handwritten text-sm text-center text-foreground/75 mt-3">collaboration and community. 🌱</p>
                </div>
                <div className="absolute -top-2 right-8 w-12 h-4 bg-baby-blue/60 transform rotate-12" />
              </motion.div>
            </div>

            {/* FOUNDATION 3: UDAYAN CARE FELLOWSHIP PROGRAM (USF) */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:col-span-7 space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-[#F2F4FC] border border-[#D3DBFA] px-4 py-1.5 rounded-full">
                  <span className="text-xs font-bold tracking-wider text-[#3B66D4] uppercase">03 / The Support System</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#1D3557] leading-tight">
                  UDAYAN CARE FELLOWSHIP (USF)
                </h3>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-medium">
                  The **Udayan Shalini Fellowship (USF)** program is a cornerstone of systemic support and social impact. Dedicated to fostering high-quality educational exposure and strong emotional support systems, USF walks alongside young women from disadvantaged backgrounds, building them into self-reliant, socially aware leaders of tomorrow.
                </p>
                <p className="text-sm font-handwritten text-muted-foreground/80 italic border-l-2 border-lavender/50 pl-4 py-1">
                  “Education shapes minds, but fellowship shapes lives.”
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:col-span-5 flex justify-center relative"
              >
                <div className="bg-white p-3 pb-8 rounded-[4px] shadow-lg w-full max-w-sm border border-foreground/5 transform -rotate-2 hover:rotate-0 transition-transform">
                  <div className="relative aspect-[4/3] bg-cream overflow-hidden">
                    <Image
                      src="/IMG_fol/usf_logo.png"
                      alt="Udayan Care Fellowship Logo"
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <p className="font-handwritten text-sm text-center text-foreground/75 mt-3">fellowship that empowers. 💫</p>
                </div>
                <div className="absolute -top-2 left-6 w-12 h-4 bg-soft-pink/60 transform -rotate-6" />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
