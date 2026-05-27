"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Heart, ArrowRight, Instagram, Youtube, Sparkles, Loader2, CheckCircle2, Mail } from "lucide-react"
import { useState } from "react"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore"
import { useRegisterModal } from "@/components/register-modal-provider"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Voices", href: "/voices" },
  { name: "Groups", href: "/groups" },
  { name: "FAQ", href: "/faq" },
]

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/kshrujanlife?igsh=MTUwanp0ZzB1Z3J1Mw==",
    label: "Instagram",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@kshrujanlife5122?si=2Lz57s5nnaQfeIpD",
    label: "YouTube",
  },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "already" | "invalid" | "error"
  >("idle")
  const { openRegisterModal } = useRegisterModal()

  const handleSubscribe = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!email || !email.includes("@")) {
      setStatus("invalid")
      return
    }

    setStatus("loading")

    try {
      const q = query(
        collection(db, "subscribers"),
        where("email", "==", email.toLowerCase().trim())
      )
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        setStatus("already")
        return
      }

      await addDoc(collection(db, "subscribers"), {
        email: email.toLowerCase().trim(),
        createdAt: serverTimestamp(),
      })

      setStatus("success")
      setEmail("")
    } catch (err) {
      console.error("Subscription error:", err)
      setStatus("error")
    }
  }

  return (
    <footer className="bg-cream pt-16 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Soft decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-lavender/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-soft-pink/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative emojis */}
      <div className="absolute top-8 right-12 text-3xl opacity-50 select-none pointer-events-none">🌸</div>
      <div className="absolute bottom-16 right-24 text-2xl opacity-30 select-none pointer-events-none">🌷</div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-14">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-1"
          >
            <Link href="/" className="inline-block mb-4">
              <span className="font-handwritten text-3xl text-foreground block">
                Girlfriend
              </span>
              <span className="text-xs tracking-widest text-muted-foreground uppercase">
                Hour
              </span>
            </Link>
            <div className="text-2xl mb-4">🌼</div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[180px]">
              A safe creative space for Gen Z voices, expression, and community.
            </p>
          </motion.div>

          {/* Navigate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
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

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="https://www.instagram.com/kshrujanlife?igsh=MTUwanp0ZzB1Z3J1Mw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" /> Instagram
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@thegirlfriendhourn.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" /> Email Us
                </a>
              </li>
              <li>
                <button
                  onClick={openRegisterModal}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Register Now
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Trust</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[160px]">
                  Your data is held with care and never shared without your consent.
                </p>
              </li>
              <li>
                <div className="inline-flex items-center gap-1.5 bg-sage-green/30 px-2.5 py-1 rounded-full">
                  <span className="text-xs text-foreground/70 font-medium">Safe Space ✦</span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-2 md:col-span-1 lg:col-span-1"
          >
            <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
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
                  className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center hover:bg-foreground/90 transition-colors disabled:bg-foreground/30 shrink-0"
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

            {/* Social Icons */}
            <div className="flex gap-3 mt-8">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-lavender/30 transition-colors shadow-sm"
                >
                  <social.icon className="w-4.5 h-4.5" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="relative mb-4">
            <div className="absolute -top-1 left-0 right-0 h-1.5 bg-gradient-to-r from-lavender/40 via-soft-pink/30 to-pastel-yellow/40 rounded-full" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-handwritten text-lg text-foreground/80">Made with care and intention.</span>
              <Heart className="w-4 h-4 text-soft-pink fill-soft-pink" />
            </div>
            <p className="text-xs text-muted-foreground text-center md:text-right">
              © 2026 The Girlfriend Hour. All rights reserved.
            </p>
          </div>

          <p className="text-center font-handwritten text-base text-muted-foreground/70 mt-3 italic">
            You are allowed to be exactly who you are.
          </p>
        </div>
      </div>
    </footer>
  )
}
