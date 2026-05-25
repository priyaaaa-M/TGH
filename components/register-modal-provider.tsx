"use client"

import React, { createContext, useContext, useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Sparkles, X, Heart, Loader2, ArrowRight, ShieldCheck, HeartHandshake, ArrowLeft } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp, doc, setDoc, increment } from "firebase/firestore"

interface RegisterModalContextType {
  openRegisterModal: () => void
  closeRegisterModal: () => void
}

const RegisterModalContext = createContext<RegisterModalContextType | undefined>(undefined)

export function RegisterModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0) // 0: Intro, 1: Details Form, 2: Consent Form, 3: Success Ticket
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submittedRef = useRef(false)
  const [successData, setSuccessData] = useState<{ name: string; regId: string } | null>(null)

  // Step 1 Fields
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [age, setAge] = useState("")
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [spaceMeaning, setSpaceMeaning] = useState("")

  // Step 2 Fields
  const [consentParticipation, setConsentParticipation] = useState(false)
  const [consentPhotoVideo, setConsentPhotoVideo] = useState("documentation_social") // documentation_social | internal_only | no_consent
  const [consentConfidentiality, setConsentConfidentiality] = useState(false)

  // Validation States
  const [step1Error, setStep1Error] = useState("")
  const [step2Error, setStep2Error] = useState("")

  const openRegisterModal = () => {
    setIsOpen(true)
    setStep(0)
    // Reset states
    setFullName("")
    setEmail("")
    setPhone("")
    setAge("")
    setSelectedRoles([])
    setSpaceMeaning("")
    setConsentParticipation(false)
    setConsentPhotoVideo("documentation_social")
    setConsentConfidentiality(false)
    setStep1Error("")
    setStep2Error("")
    setSuccessData(null)
  }

  const closeRegisterModal = () => {
    if (isSubmitting) return
    setIsOpen(false)
  }

  const handleRoleToggle = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    } else {
      setSelectedRoles([...selectedRoles, role])
    }
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !email.trim() || !age.trim()) {
      setStep1Error("Please fill out all required fields.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setStep1Error("Please enter a valid email address.")
      return
    }

    if (phone.trim()) {
      const cleanPhone = phone.replace(/[^0-9+]/g, '')
      if (cleanPhone.length < 7 || cleanPhone.length > 15) {
        setStep1Error("Please enter a valid phone number length (between 7 and 15 digits).")
        return
      }
    }

    const parsedAge = parseInt(age, 10)
    if (isNaN(parsedAge) || parsedAge < 13 || parsedAge > 99) {
      setStep1Error("Please enter a valid age (13-99).")
      return
    }

    if (selectedRoles.length === 0) {
      setStep1Error("Please select at least one way you would like to participate.")
      return
    }
    setStep1Error("")
    setStep(2)
  }

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submittedRef.current || isSubmitting) return // Prevent double submission
    if (!consentParticipation) {
      setStep2Error("You must agree to the Participation Consent to proceed.")
      return
    }
    if (!consentConfidentiality) {
      setStep2Error("You must agree to the Confidentiality and Safe Space rules to proceed.")
      return
    }

    setStep2Error("")
    setIsSubmitting(true)
    console.log("Submitting registration form...")

    try {
      // Generate a unique registration ticket ID
      const timestampPart = Date.now().toString().slice(-6)
      const randomPart = Math.floor(100 + Math.random() * 900)
      const ticketId = `TGH-REG-${timestampPart}-${randomPart}`

      const parsedAge = parseInt(age, 10)

      const registrationData = {
        fullName: fullName.trim(),
        email: email.trim(),
        phoneNumber: phone.trim() || null,
        age: parsedAge,
        participationTypes: selectedRoles,
        safeSpaceMeaning: spaceMeaning.trim(),
        consentParticipation,
        consentMedia: consentPhotoVideo,
        consentConfidentiality,
        ticketId, // Kept for frontend ticket rendering
        createdAt: serverTimestamp(),
        status: "registered"
      }

      // Save registration data
      await addDoc(collection(db, "registrations"), registrationData)
      submittedRef.current = true

      // Update participant count (fire-and-forget, don't block registration)
      const statsRef = doc(db, "stats", "registrations")
      setDoc(statsRef, { participantCount: increment(1) }, { merge: true }).catch((err) =>
        console.warn("Stats counter update failed (non-blocking):", err)
      )

      console.log("Firestore success: Registration saved successfully!")

      setSuccessData({
        name: fullName,
        regId: ticketId,
      })
      setStep(3)
    } catch (err) {
      console.error("Firestore error:", err)
      setStep2Error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <RegisterModalContext.Provider value={{ openRegisterModal, closeRegisterModal }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop with soft blur and fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeRegisterModal}
              className="fixed inset-0 bg-[#111111]/40 backdrop-blur-md z-40"
            />
            
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.12 }}
              className="relative w-full max-w-2xl bg-[#F8F4EE] rounded-[2rem] p-6 sm:p-10 md:p-12 shadow-2xl border-4 border-foreground overflow-y-auto max-h-[90vh] z-50 my-8 mx-auto scrollbar-thin scrollbar-thumb-foreground/20"
            >
              {/* Scrapbook Tape Effect */}
              {step !== 3 && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#FFD86B] -rotate-2 shadow-sm z-20 flex items-center justify-center border border-foreground/10">
                  <span className="font-handwritten text-foreground text-sm font-black tracking-widest">
                    {step === 0 ? "UNFILTERED" : step === 1 ? "STEP 1 OF 2" : "STEP 2 OF 2"}
                  </span>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={closeRegisterModal}
                disabled={isSubmitting}
                className="absolute top-4 right-4 p-2 rounded-full border border-foreground/10 hover:bg-lavender/35 hover:scale-105 active:scale-95 transition-all z-20 text-foreground disabled:opacity-50"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Decorative pastel glowing background blur blobs */}
              <div className="absolute -top-10 -left-10 w-28 h-28 bg-soft-pink/40 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-baby-blue/40 rounded-full blur-2xl pointer-events-none" />

              {/* Step 0: Welcome overview */}
              {step === 0 && (
                <div className="relative mt-4 space-y-6 text-center md:text-left">
                  <div className="space-y-3 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-lavender/70 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-foreground border border-foreground/5 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-orange-highlight fill-current" />
                      Registrations Are Now Open
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-[2.25rem] font-serif font-black tracking-tight leading-[1.1] text-foreground">
                      THE GIRLFRIEND HOUR — <span className="underline decoration-orange-highlight decoration-4 decoration-skip-ink">“UNFILTERED”</span>
                    </h3>
                    <p className="font-handwritten text-xl sm:text-2xl text-orange-highlight font-bold italic tracking-wide">
                      (No edits. No apologies. Just you.)
                    </p>
                  </div>

                  <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-foreground/85 font-medium font-sans">
                    <p>
                      This is a safe, expressive, and collaborative space where young voices can explore theatre, poetry, music, storytelling, dance, comedy, conversation, and creative expression.
                    </p>
                    <p>
                      Build your team, bring your creativity, and be part of an experience rooted in authenticity, collaboration, and emotional safety.
                    </p>
                    
                    <div className="bg-white/70 backdrop-blur-sm border-2 border-foreground p-5 sm:p-6 rounded-2xl space-y-3 text-left rotate-slight-right shadow-soft-lg relative">
                      <div className="absolute -top-2 right-6 w-8 h-4 bg-soft-pink/70 rounded-sm transform rotate-12" />
                      <p className="font-bold text-xs text-foreground/50 uppercase tracking-widest">Whether you want to:</p>
                      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-serif text-foreground font-black text-xs sm:text-sm md:text-base">
                        <li className="flex items-center gap-1.5">
                          <span className="text-soft-pink text-xs sm:text-sm">✨</span> perform
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="text-pastel-yellow text-xs sm:text-sm">🎨</span> create
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="text-baby-blue text-xs sm:text-sm">🤝</span> collaborate
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="text-sage-green text-xs sm:text-sm">📣</span> organise
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="text-[#FF8C42] text-xs sm:text-sm">💖</span> support
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="text-lavender text-xs sm:text-sm">👀</span> experience
                        </li>
                      </ul>
                      <p className="font-handwritten text-right text-base sm:text-lg text-foreground/90 font-bold mt-3 border-t border-dashed border-foreground/10 pt-2">— there is space for you here.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-dashed border-foreground/10">
                    <button
                      onClick={() => setStep(1)}
                      className="w-full sm:w-auto bg-foreground text-primary-foreground hover:bg-foreground/90 font-bold px-8 py-4 rounded-full text-sm sm:text-base transition-all hover:scale-105 hover:shadow-soft-lg flex items-center justify-center gap-2 border-2 border-foreground"
                    >
                      Fill Registration Form <span className="text-lg">→</span>
                    </button>
                    <button
                      onClick={closeRegisterModal}
                      className="w-full sm:w-auto bg-white/60 hover:bg-white text-foreground/75 hover:text-foreground font-bold px-6 py-3.5 rounded-full text-sm sm:text-base transition-all hover:scale-105 border border-foreground/10"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              )}

              {/* Step 1: Core Registration Details */}
              {step === 1 && (
                <div className="relative mt-4 space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-serif font-black text-foreground">
                      Tell us about yourself
                    </h3>
                    <p className="text-sm text-muted-foreground italic font-handwritten text-[16px]">
                      Your journey to the circle begins here.
                    </p>
                  </div>

                  <form onSubmit={handleStep1Submit} className="space-y-5">
                    {step1Error && (
                      <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-200">
                        {step1Error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1">
                        <label className="block text-sm font-bold text-foreground font-serif">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your beautiful name"
                          className="w-full px-4 py-3 bg-white rounded-xl border-2 border-foreground shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#FFFDF9] text-base"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="block text-sm font-bold text-foreground font-serif">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-4 py-3 bg-white rounded-xl border-2 border-foreground shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#FFFDF9] text-base"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone (Optional) */}
                      <div className="space-y-1">
                        <label className="block text-sm font-bold text-foreground font-serif">Phone Number <span className="text-muted-foreground font-normal">(Optional)</span></label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Your WhatsApp/phone number"
                          className="w-full px-4 py-3 bg-white rounded-xl border-2 border-foreground shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#FFFDF9] text-base"
                        />
                      </div>

                      {/* Age */}
                      <div className="space-y-1">
                        <label className="block text-sm font-bold text-foreground font-serif">Age *</label>
                        <input
                          type="number"
                          required
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="Your age"
                          className="w-full px-4 py-3 bg-white rounded-xl border-2 border-foreground shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#FFFDF9] text-base"
                        />
                      </div>
                    </div>

                    {/* Roles/Interests Selection */}
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-foreground font-serif">
                        How would you like to participate? (Select all that apply) *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {["perform", "create", "collaborate", "organise", "support", "experience"].map((role) => {
                          const isSelected = selectedRoles.includes(role)
                          return (
                            <button
                              key={role}
                              type="button"
                              onClick={() => handleRoleToggle(role)}
                              className={`py-2 px-3 rounded-xl border-2 border-foreground font-serif font-bold text-xs uppercase tracking-wide transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] text-center ${
                                isSelected ? "bg-lavender text-foreground" : "bg-white hover:bg-lavender/10"
                              }`}
                            >
                              {role}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* What does a safe space mean */}
                    <div className="space-y-1">
                      <label className="block text-sm font-bold text-foreground font-serif">
                        What does a safe, unfiltered space mean to you? (Optional)
                      </label>
                      <textarea
                        value={spaceMeaning}
                        onChange={(e) => setSpaceMeaning(e.target.value)}
                        placeholder="A tiny note, in your own words..."
                        className="w-full h-24 px-4 py-3 bg-white rounded-xl border-2 border-foreground shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#FFFDF9] text-base resize-none font-handwritten text-lg"
                      />
                    </div>

                    {/* Step 1 Submit / Navigation Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-dashed border-foreground/10">
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground font-bold px-4 py-2 transition-all font-serif"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>

                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-foreground text-primary-foreground hover:bg-foreground/90 font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2 border-2 border-foreground"
                      >
                        Continue to Consent Form <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 2: Participation & Consent Form */}
              {step === 2 && (
                <div className="relative mt-4 space-y-6">
                  <div className="text-center space-y-2">
                    <span className="font-handwritten text-lg text-lavender tracking-widest font-black inline-block transform -rotate-1">
                      mutual respect & care.
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-black text-foreground uppercase tracking-tight">
                      Participation & Consent Form
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground italic font-sans max-w-lg mx-auto">
                      A safe and respectful space built on expression, emotional safety, and mutual respect.
                    </p>
                  </div>

                  <form onSubmit={handleCompleteRegistration} className="space-y-6 text-left">
                    {step2Error && (
                      <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-200">
                        {step2Error}
                      </div>
                    )}

                    {/* Section 1: Participation Consent */}
                    <div className="bg-[#EDE0FF]/40 border-2 border-foreground p-5 rounded-2xl space-y-3 relative shadow-md">
                      <div className="absolute -top-3.5 left-6 bg-[#EDE0FF] px-3 py-1 rounded-full text-xs font-bold border border-foreground/10 uppercase tracking-widest text-[#6366F1] flex items-center gap-1">
                        <HeartHandshake className="w-3.5 h-3.5" />
                        1. Participation Consent
                      </div>
                      
                      <div className="text-xs sm:text-sm text-foreground/80 leading-relaxed space-y-2 pt-2">
                        <p>
                          I understand that The Girlfriend Hour is a creative and collaborative experience involving storytelling, performances, conversations, artistic expression, and community participation.
                        </p>
                        <p className="font-bold text-foreground">I confirm that:</p>
                        <ul className="list-disc pl-5 space-y-1 text-xs">
                          <li>My participation is voluntary</li>
                          <li>I understand the nature of the activities</li>
                          <li>I agree to follow community guidelines around respect, emotional safety, and confidentiality</li>
                          <li>I may step away or withdraw participation if I feel uncomfortable by informing facilitators</li>
                        </ul>
                      </div>

                      <label className="flex items-start gap-3 pt-3 border-t border-dashed border-foreground/10 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={consentParticipation}
                          onChange={(e) => setConsentParticipation(e.target.checked)}
                          className="w-5 h-5 rounded border-2 border-foreground text-[#6366F1] focus:ring-0 focus:outline-none shrink-0 mt-0.5 transition-all accent-[#6366F1]"
                        />
                        <span className="text-xs sm:text-sm font-serif font-black text-foreground">
                          I agree to participate in The Girlfriend Hour
                        </span>
                      </label>
                    </div>

                    {/* Section 2: Photo / Video Consent */}
                    <div className="bg-[#FFE8D8]/40 border-2 border-foreground p-5 rounded-2xl space-y-3 relative shadow-md">
                      <div className="absolute -top-3.5 left-6 bg-[#FFE8D8] px-3 py-1 rounded-full text-xs font-bold border border-foreground/10 uppercase tracking-widest text-[#E8612A] flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        2. Photo / Video Consent
                      </div>
                      
                      <div className="text-xs sm:text-sm text-foreground/80 leading-relaxed pt-2">
                        <p>
                          Photos and videos may be captured during the experience for documentation, storytelling, educational, and community-sharing purposes.
                        </p>
                        <p className="mt-1 font-bold text-foreground">
                          Content will always be used respectfully and aligned with the purpose of the experience.
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-dashed border-foreground/10">
                        {[
                          { id: "documentation_social", text: "I consent to photos/videos being used for event documentation and social media" },
                          { id: "internal_only", text: "I consent to photos/videos being taken but not shared publicly" },
                          { id: "no_consent", text: "I do not consent to photography/videography" },
                        ].map((opt) => (
                          <label key={opt.id} className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="photoVideoConsent"
                              value={opt.id}
                              checked={consentPhotoVideo === opt.id}
                              onChange={() => setConsentPhotoVideo(opt.id)}
                              className="w-5 h-5 rounded-full border-2 border-foreground text-[#E8612A] focus:ring-0 focus:outline-none shrink-0 mt-0.5 accent-[#E8612A]"
                            />
                            <span className="text-xs sm:text-sm font-medium text-foreground">
                              {opt.text}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Confidentiality & Safe Space */}
                    <div className="bg-[#E8F5E8]/40 border-2 border-foreground p-5 rounded-2xl space-y-3 relative shadow-md">
                      <div className="absolute -top-3.5 left-6 bg-[#E8F5E8] px-3 py-1 rounded-full text-xs font-bold border border-foreground/10 uppercase tracking-widest text-[#2F855A] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        3. Confidentiality & Safe Space
                      </div>
                      
                      <div className="text-xs sm:text-sm text-foreground/80 leading-relaxed space-y-2 pt-2">
                        <p>
                          This is a safe and respectful space where participants are encouraged to express themselves freely without judgment, comparison, or pressure.
                        </p>
                        <p className="font-bold text-foreground">We ask all participants to:</p>
                        <ul className="list-disc pl-5 space-y-1 text-xs">
                          <li>respect personal stories shared within the space</li>
                          <li>avoid recording others without permission</li>
                          <li>contribute to a supportive and emotionally aware environment</li>
                        </ul>
                      </div>

                      <label className="flex items-start gap-3 pt-3 border-t border-dashed border-foreground/10 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={consentConfidentiality}
                          onChange={(e) => setConsentConfidentiality(e.target.checked)}
                          className="w-5 h-5 rounded border-2 border-foreground text-[#2F855A] focus:ring-0 focus:outline-none shrink-0 mt-0.5 transition-all accent-[#2F855A]"
                        />
                        <span className="text-xs sm:text-sm font-serif font-black text-foreground">
                          I agree to uphold confidentiality and respect the space
                        </span>
                      </label>
                    </div>



                    {/* Step 2 Form Submission Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-dashed border-foreground/10">
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setStep(1)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground font-bold px-4 py-2 transition-all font-serif disabled:opacity-50"
                      >
                        <ArrowLeft className="w-4 h-4" /> Edit Details
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-[#E8612A] text-white hover:bg-[#D5531E] font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2 border-2 border-[#E8612A] shadow-md disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            Completing... <Loader2 className="w-4 h-4 animate-spin" />
                          </>
                        ) : (
                          <>
                            Complete Registration <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Success Admit-One Ticket State */}
              {step === 3 && successData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative mt-2 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto border-2 border-foreground shadow-md animate-bounce-soft">
                    <Heart className="w-8 h-8 text-green-600 fill-green-600 animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl font-serif font-black text-foreground">
                      You are in! 🌸
                    </h3>
                    <p className="font-handwritten text-xl text-orange-highlight font-bold">
                      Your space is held with gentle care.
                    </p>
                  </div>

                  {/* Physical Scrapbook Ticket Mockup */}
                  <div className="relative bg-[#FFFDF9] border-4 border-foreground p-6 sm:p-8 rounded-[1.5rem] shadow-soft-lg rotate-[1.5deg] max-w-md mx-auto overflow-hidden">
                    {/* Retro Ticket punch cuts */}
                    <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-[#F8F4EE] rounded-full border-r-4 border-foreground" />
                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-[#F8F4EE] rounded-full border-l-4 border-foreground" />
                    
                    {/* Dashed separator */}
                    <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 border-t-2 border-dashed border-foreground/30 pointer-events-none" />

                    {/* Ticket Contents: Top Half */}
                    <div className="pb-8 space-y-2">
                      <span className="font-handwritten text-xs uppercase tracking-widest text-muted-foreground">Admit One</span>
                      <h4 className="font-serif font-black text-xl tracking-tight text-foreground">
                        THE GIRLFRIEND HOUR
                      </h4>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        UNFILTERED • 2026 EDITION
                      </p>
                    </div>

                    {/* Ticket Contents: Bottom Half */}
                    <div className="pt-8 space-y-3">
                      <div className="space-y-1">
                        <span className="text-[11px] uppercase tracking-widest text-muted-foreground block font-serif">PARTICIPANT</span>
                        <span className="text-lg font-serif font-black text-foreground uppercase leading-none block">
                          {successData.name}
                        </span>
                      </div>

                      <div className="space-y-1 pt-1 bg-lavender/30 py-2 rounded-xl border border-foreground/5 shadow-inner">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground block font-bold">TICKET REGISTRATION ID</span>
                        <span className="text-sm font-mono font-black text-foreground tracking-wider select-all block">
                          {successData.regId}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto font-sans">
                    A copy of your registration ticket ID has been saved. We are extremely excited to share this safe, unfiltered space with you.
                  </p>

                  <div className="pt-4 border-t border-dashed border-foreground/10">
                    <button
                      onClick={closeRegisterModal}
                      className="w-full sm:w-auto bg-foreground text-primary-foreground hover:bg-foreground/90 font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 border-2 border-foreground shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                    >
                      Close & Explore the Space
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </RegisterModalContext.Provider>
  )
}

export function useRegisterModal() {
  const context = useContext(RegisterModalContext)
  if (context === undefined) {
    throw new Error("useRegisterModal must be used within a RegisterModalProvider")
  }
  return context
}
