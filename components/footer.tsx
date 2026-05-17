"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Heart, ArrowRight, Instagram, Music2, Youtube, Sparkles, Loader2, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore"

const quickLinks = [
  { name: "Explore", href: "/explore" },
  { name: "How It Works", href: "/#experience" },
  { name: "Wall", href: "/#voices" },
  { name: "Daily Prompt", href: "/#" },
]

const moreLinks = [
  { name: "People", href: "/#team" },
  { name: "BTS", href: "/#bts" },
  { name: "Join the Space", href: "/#join" },
]

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/kshrujanlife?igsh=MTUwanp0ZzB1Z3J1Mw==", label: "Instagram" },
  { icon: Music2, href: "#", label: "TikTok" },
  { icon: Sparkles, href: "#", label: "Spotify" },
  { icon: Youtube, href: "https://youtube.com/@kshrujanlife5122?si=2Lz57s5nnaQfeIpD", label: "YouTube" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "invalid" | "error">("idle")

  const handleSubscribe = async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!email || !email.includes("@")) {
      setStatus("invalid")
      return
    }

    setStatus("loading")
    console.log("Checking for duplicate subscriber:", email)

    try {
      // Check if already exists
      const q = query(collection(db, "subscribers"), where("email", "==", email.toLowerCase().trim()))
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        console.log("User already subscribed")
        setStatus("already")
        return
      }

      console.log("Saving new subscriber to Firestore...")
      await addDoc(collection(db, "subscribers"), {
        email: email.toLowerCase().trim(),
        createdAt: serverTimestamp()
      })
      
      console.log("Subscription successful!")
      setStatus("success")
      setEmail("")
    } catch (err) {
      console.error("Subscription error:", err)
      setStatus("error")
    }
  }
  return (
    <footer className="bg-cream pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 right-8 text-4xl opacity-60">🌸</div>
      <div className="absolute bottom-20 right-20 text-3xl opacity-40">🌷</div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-1"
          >
            <Link href="/" className="inline-block mb-4">
              <span className="font-handwritten text-3xl text-foreground">
                Girlfriend
              </span>
              <span className="block text-xs tracking-widest text-muted-foreground uppercase">
                Hour
              </span>
            </Link>
            <div className="text-2xl">🌼</div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">More</h4>
            <ul className="space-y-2">
              {moreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-2 md:col-span-1 lg:col-span-2"
          >
            <h4 className="font-semibold mb-2">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4">
              A letter. A reminder. A little love.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <div className="flex gap-2 relative z-10">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status !== "idle") setStatus("idle")
                  }}
                  placeholder="Your email"
                  disabled={status === "loading" || status === "success"}
                  className="flex-1 px-4 py-2.5 rounded-full border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-lavender transition-all disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center hover:bg-foreground/90 transition-colors disabled:bg-foreground/30"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-primary-foreground" />
                  )}
                </motion.button>
              </div>

              <AnimatePresence>
                {status !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2"
                  >
                    {status === "success" && (
                      <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>You&apos;re now part of the space 💌</span>
                      </div>
                    )}
                    {status === "already" && (
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider opacity-60">
                        Already in the space ✨
                      </span>
                    )}
                    {status === "invalid" && (
                      <span className="text-[10px] text-soft-pink font-bold uppercase tracking-wider">
                        Please enter a valid email
                      </span>
                    )}
                    {status === "error" && (
                      <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
                        Something went wrong. Try again?
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Made with love badge */}
            <div className="mt-6 inline-flex items-center gap-2 bg-lavender/50 px-4 py-2 rounded-full">
              <span className="text-sm">Made with</span>
              <Heart className="w-4 h-4 text-soft-pink fill-soft-pink" />
              <span className="text-sm">and intention.</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-lavender/30 transition-colors shadow-sm"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="relative">
            {/* Decorative wavy line */}
            <div className="absolute -top-1 left-0 right-0 h-2 bg-lavender/30 rounded-full" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
            <p className="text-sm text-muted-foreground font-handwritten text-lg">
              You are allowed to be exactly who you are.
            </p>
            <p className="text-xs text-muted-foreground">
              © 2025 The Girlfriend Hour. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
