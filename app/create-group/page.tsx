"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Mail, ArrowRight, Sparkles } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore"
import { Navbar } from "@/components/navbar"
import { GroupUploadForm, type GroupFormData } from "@/components/group-upload-form"

export default function CreateGroupPage() {
  const router = useRouter()

  // ─── Email gate state ─────────────────────────────────────────────────────
  const [emailInput, setEmailInput] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [verifiedEmail, setVerifiedEmail] = useState("")

  // ─── Form save state ─────────────────────────────────────────────────────
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleEmailVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError(null)
    setIsCheckingEmail(true)

    try {
      const allowedEmailsStr = process.env.NEXT_PUBLIC_ALLOWED_GROUP_EMAILS || ""
      const allowedEmails = allowedEmailsStr.split(",").map(em => em.trim().toLowerCase())
      const normalized = emailInput.trim().toLowerCase()

      if (!allowedEmails.includes(normalized)) {
        setEmailError("This email is not authorized to create a group.")
        return
      }

      // Check for an existing group with this email
      const q = query(collection(db, "groups"), where("createdByEmail", "==", normalized))
      const snap = await getDocs(q)

      if (!snap.empty) {
        const existingId = snap.docs[0].id
        setEmailError("You've already created your group 💫 Taking you there now...")
        setTimeout(() => router.push(`/edit/${existingId}`), 2000)
        return
      }

      setVerifiedEmail(normalized)
      setEmailVerified(true)
    } catch (err) {
      console.error("Error verifying email:", err)
      setEmailError("Something went wrong. Please try again.")
    } finally {
      setIsCheckingEmail(false)
    }
  }

  const handleSave = async (data: GroupFormData) => {
    setIsSaving(true)
    setError(null)
    setSuccess(false)
    try {
      const docRef = await addDoc(collection(db, "groups"), {
        ...data,
        createdByEmail: verifiedEmail,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
      setTimeout(() => router.push(`/edit/${docRef.id}`), 3000)
    } catch (err) {
      console.error("Error creating group:", err)
      setError("Failed to create group. Please try again.")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } finally {
      setIsSaving(false)
    }
  }

  // ─── Email Gate Screen ────────────────────────────────────────────────────
  if (!emailVerified) {
    return (
      <main className="min-h-screen bg-[#F8F4EE] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            {/* Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-foreground/5 p-7 relative">
              <div className="absolute -top-3 right-8 w-20 h-6 bg-peach/50 backdrop-blur-sm rotate-2" />
              <div className="absolute -bottom-3 left-8 w-16 h-5 bg-lavender/50 backdrop-blur-sm -rotate-1" />

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-lavender/20 rounded-2xl mb-4">
                  <Sparkles className="w-6 h-6 text-lavender" />
                </div>
                <h1 className="text-2xl font-serif font-bold text-foreground">Leader Portal</h1>
                <p className="text-sm text-foreground/60 mt-2 font-medium">
                  Enter your registered email to access your Group Upload Space.
                </p>
              </div>

              <form onSubmit={handleEmailVerification} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/35" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="your.email@gmail.com"
                    required
                    className="w-full bg-[#F8F4EE] rounded-xl pl-10 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-lavender transition-all"
                  />
                </div>

                <button
                  disabled={isCheckingEmail}
                  type="submit"
                  className="w-full bg-foreground text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60 hover:opacity-90 transition-opacity group"
                >
                  {isCheckingEmail
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking...</>
                    : <><span>Continue</span><ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                  }
                </button>
              </form>

              {emailError && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium rounded-xl text-center">
                  {emailError}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    )
  }

  // ─── Upload Form Screen ───────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#F8F4EE]">
      <Navbar />
      <div className="pt-20 pb-16 px-4 max-w-2xl mx-auto">

        {/* Page Header */}
        <div className="py-6 text-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-5 bg-peach/50 -rotate-2 hidden sm:block" />
          <div className="inline-flex items-center gap-2 bg-white border border-foreground/5 px-3 py-1 rounded-full text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2 shadow-sm">
            <Sparkles className="w-3 h-3 text-pastel-yellow" /> Group Upload Space
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            Create Your Group
          </h1>
          <p className="text-sm text-foreground/55 font-medium mt-1 font-handwritten text-base">
            Add your group details, members, and creative story here.
          </p>
        </div>

        <GroupUploadForm
          onSave={handleSave}
          isSaving={isSaving}
          saveLabel="CREATE GROUP"
          successMessage="Your group has been created successfully 💫 Redirecting..."
          error={error}
          success={success}
        />
      </div>
    </main>
  )
}
