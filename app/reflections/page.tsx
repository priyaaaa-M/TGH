"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { toast } from "sonner"
import { 
  Loader2, 
  Upload, 
  Video as VideoIcon, 
  Link as LinkIcon, 
  Sparkles, 
  Heart, 
  Smile, 
  BookOpen, 
  Flame, 
  ArrowRight,
  CheckCircle,
  FileVideo
} from "lucide-react"

// ─── Reflection Questions ───────────────────────────────────────────────────
const REFLECTION_QUESTIONS = [
  { id: "q1", question: "What drew you to join The Girlfriend Hour, and what were you hoping to find?" },
  { id: "q2", question: "How did it feel when you first shared your voice or story in the space?" },
  { id: "q3", question: "Describe a moment during the 15-day lab that shifted how you view yourself or others." },
  { id: "q4", question: "In what ways did this safe space encourage you to express your authentic truth?" },
  { id: "q5", question: "If you could whisper one message of encouragement to future participants, what would it be?" }
]

// ─── Rapid Fire Prompts ──────────────────────────────────────────────────────
const RAPID_FIRE_PROMPTS = [
  { id: "rf1", label: "The Girlfriend Hour in one word:" },
  { id: "rf2", label: "My cohort/group in one word:" },
  { id: "rf3", label: "How I feel right now in one word:" },
  { id: "rf4", label: "Vulnerability in one word:" }
]

export default function ReflectionsPage() {
  // ─── Form State ────────────────────────────────────────────────────────────
  const [name, setName] = useState("")
  const [groupName, setGroupName] = useState("")
  const [role, setRole] = useState("Participant")
  
  const [quickAnswers, setQuickAnswers] = useState<Record<string, string>>({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: ""
  })

  const [oneLineBefore, setOneLineBefore] = useState("")
  const [oneLineNow, setOneLineNow] = useState("")
  const [oneLineCourageous, setOneLineCourageous] = useState("")

  const [rapidFire, setRapidFire] = useState<Record<string, string>>({
    rf1: "",
    rf2: "",
    rf3: "",
    rf4: ""
  })

  // ─── Video Testimonial State ───────────────────────────────────────────────
  const [videoMode, setVideoMode] = useState<"upload" | "link">("upload")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState("")
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ─── Submission State ──────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleQuickAnswerChange = (id: string, value: string) => {
    setQuickAnswers(prev => ({ ...prev, [id]: value }))
  }

  const handleRapidFireChange = (id: string, value: string) => {
    setRapidFire(prev => ({ ...prev, [id]: value }))
  }

  // ─── Cloudinary Upload Helper ──────────────────────────────────────────────
  const handleVideoUpload = async (file: File) => {
    if (!file) return
    if (file.size > 100 * 1024 * 1024) {
      toast.error("Video is too large. Please upload a file smaller than 100MB.")
      return
    }

    setUploadingVideo(true)
    setVideoFile(file)
    
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "voiceNote")
      
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      if (!cloudName) {
        throw new Error("Cloudinary cloud name is not configured.")
      }

      console.log("Uploading video to Cloudinary...")
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || "Cloudinary upload failed")
      }

      const data = await response.json()
      console.log("Cloudinary upload successful:", data.secure_url)
      setVideoUrl(data.secure_url)
      toast.success("Video uploaded successfully! 🎬")
    } catch (error: any) {
      console.error("Cloudinary video upload error:", error)
      toast.error(error.message || "Failed to upload video. Please try pasting a Google Drive or YouTube link instead.")
      setVideoFile(null)
    } finally {
      setUploadingVideo(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("video/")) {
        handleVideoUpload(file)
      } else {
        toast.error("Please drop a valid video file.")
      }
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleVideoUpload(e.target.files[0])
    }
  }

  // ─── Submit Form to Firestore ──────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Please enter your name.")
      return
    }
    if (!groupName.trim()) {
      toast.error("Please enter your group or cohort name.")
      return
    }

    setIsSubmitting(true)

    try {
      // Structure all answers nicely
      const answers = {
        quickReflection: quickAnswers,
        oneLine: {
          before: oneLineBefore,
          now: oneLineNow,
          courageous: oneLineCourageous
        },
        rapidFire: rapidFire
      }

      // Add to Firestore testimonials collection
      await addDoc(collection(db, "testimonials"), {
        name: name.trim(),
        groupName: groupName.trim(),
        role: role,
        answers: answers,
        videoUrl: videoUrl.trim(),
        createdAt: serverTimestamp(),
        approved: false // Default to false (admin approval required)
      })

      setSubmitted(true)
      toast.success("Thank you for sharing your reflection! 💜")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err: any) {
      console.error("Error saving reflection to Firestore:", err)
      toast.error("Something went wrong saving your reflection. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─── Success Screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <main className="min-h-screen bg-[#F8F4EE] flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-24 px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-white rounded-3xl border border-foreground/5 shadow-soft p-8 md:p-10 text-center relative overflow-hidden"
          >
            {/* Scrapbook Tape Decors */}
            <div className="absolute -top-2.5 left-1/4 w-16 h-6 bg-lavender/60 backdrop-blur-sm -rotate-3" />
            <div className="absolute -bottom-2 right-1/4 w-16 h-6 bg-peach/60 backdrop-blur-sm rotate-2" />

            <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-green/20 rounded-full mb-6 text-sage-green">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
              Reflection Shared
            </h1>
            <p className="text-lg text-foreground/70 font-medium font-handwritten text-xl mb-6">
              Thank you, {name}, for sharing your heart and journey with us.
            </p>
            <p className="text-sm text-foreground/50 leading-relaxed mb-8">
              Your voice is a beautiful thread in our community. We review and approve all submissions before sharing them on the public gallery.
            </p>

            <button
              onClick={() => {
                // Reset form states
                setName("")
                setGroupName("")
                setRole("Participant")
                setQuickAnswers({ q1: "", q2: "", q3: "", q4: "", q5: "" })
                setOneLineBefore("")
                setOneLineNow("")
                setOneLineCourageous("")
                setRapidFire({ rf1: "", rf2: "", rf3: "", rf4: "" })
                setVideoFile(null)
                setVideoUrl("")
                setSubmitted(false)
              }}
              className="w-full bg-foreground text-white py-4 rounded-2xl font-bold hover:scale-[1.01] active:scale-[0.99] transition-all shadow-soft flex items-center justify-center gap-2"
            >
              <span>Submit Another Reflection</span>
              <Smile className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
        <Footer />
      </main>
    )
  }

  // ─── Main Form Screen ──────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#F8F4EE] flex flex-col justify-between">
      <Navbar />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-8 relative mb-12"
        >
          {/* Scrapbook Sticky Tape Decors */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-peach/40 backdrop-blur-sm -rotate-2" />
          
          <span className="inline-flex items-center gap-1.5 bg-white border border-foreground/5 px-4 py-1.5 rounded-full text-xs font-bold text-foreground/60 uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pastel-yellow" /> Community Reflections
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
            Thank you for being part of <br/>
            <span className="font-handwritten text-soft-pink italic font-normal text-5xl md:text-7xl block mt-1 -rotate-1">
              The Girlfriend Hour.
            </span>
          </h1>
          <p className="text-xl text-foreground/75 font-handwritten mt-4 max-w-xl mx-auto text-center leading-relaxed">
            Your story matters. <br />
            We would love to hear about your journey.
          </p>
        </motion.div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Personal Information */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-foreground/5 p-6 md:p-8 shadow-soft space-y-4"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-foreground/5">
              <Smile className="w-5 h-5 text-soft-pink" />
              <h2 className="text-lg font-serif font-bold text-foreground">Tell us who you are</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 font-medium text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-lavender transition-all text-sm border-0"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider mb-2">Group / Cohort Name *</label>
                <input
                  type="text"
                  required
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                  placeholder="e.g. Wednesday Circle / Summer Cohort"
                  className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 font-medium text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-lavender transition-all text-sm border-0"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider mb-2">Your Role</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-lavender transition-all text-sm border-0"
              >
                <option value="Participant">Participant</option>
                <option value="Group Leader / Host">Group Leader / Host</option>
                <option value="Facilitator">Facilitator / Team member</option>
                <option value="Observer">Observer</option>
              </select>
            </div>
          </motion.div>

          {/* 2. Quick Reflection */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-foreground/5 p-6 md:p-8 shadow-soft space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-foreground/5">
              <BookOpen className="w-5 h-5 text-lavender" />
              <h2 className="text-lg font-serif font-bold text-foreground">Quick Reflections</h2>
            </div>
            
            <div className="space-y-6">
              {REFLECTION_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground/80">
                    <span className="text-soft-pink mr-1 font-serif">{idx + 1}.</span>
                    {q.question}
                  </label>
                  <textarea
                    value={quickAnswers[q.id]}
                    onChange={e => handleQuickAnswerChange(q.id, e.target.value)}
                    rows={3}
                    placeholder="Reflect and share your thoughts here..."
                    className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 font-handwritten text-lg text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-lavender transition-all resize-none border-0"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* 3. One-Line Reflections */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#E3D6FF]/20 rounded-3xl border border-foreground/5 p-6 md:p-8 shadow-soft space-y-6 relative overflow-hidden"
          >
            <div className="absolute -top-3 right-8 w-16 h-5 bg-lavender/35 rotate-3" />
            
            <div className="flex items-center gap-2 pb-4 border-b border-foreground/5">
              <Heart className="w-5 h-5 text-orange-highlight" />
              <h2 className="text-lg font-serif font-bold text-foreground">One-Line Reflections</h2>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider">Before The Girlfriend Hour...</label>
                <input
                  type="text"
                  value={oneLineBefore}
                  onChange={e => setOneLineBefore(e.target.value)}
                  placeholder="I felt a bit disconnected and quiet..."
                  className="w-full bg-white rounded-xl px-4 py-3.5 font-handwritten text-lg text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-lavender transition-all border-0 shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider">Now...</label>
                <input
                  type="text"
                  value={oneLineNow}
                  onChange={e => setOneLineNow(e.target.value)}
                  placeholder="I speak my truth and embrace community with courage..."
                  className="w-full bg-white rounded-xl px-4 py-3.5 font-handwritten text-lg text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-lavender transition-all border-0 shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider">The most courageous thing I did was...</label>
                <input
                  type="text"
                  value={oneLineCourageous}
                  onChange={e => setOneLineCourageous(e.target.value)}
                  placeholder="Share a poem about my growth in front of my group..."
                  className="w-full bg-white rounded-xl px-4 py-3.5 font-handwritten text-lg text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-lavender transition-all border-0 shadow-sm"
                />
              </div>
            </div>
          </motion.div>

          {/* 4. Video Testimonial */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-foreground/5 p-6 md:p-8 shadow-soft space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-foreground/5">
              <div className="flex items-center gap-2">
                <VideoIcon className="w-5 h-5 text-sage-green" />
                <h2 className="text-lg font-serif font-bold text-foreground">Video Testimonial (Optional)</h2>
              </div>
              <span className="text-xs text-foreground/40 font-medium">Visual expression</span>
            </div>

            {/* Toggle Modes */}
            <div className="flex gap-2 p-1 bg-[#F8F4EE] rounded-xl max-w-xs">
              <button
                type="button"
                onClick={() => setVideoMode("upload")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5
                  ${videoMode === "upload" ? "bg-white text-foreground shadow-sm" : "text-foreground/50 hover:text-foreground"}
                `}
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Video
              </button>
              <button
                type="button"
                onClick={() => setVideoMode("link")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5
                  ${videoMode === "link" ? "bg-white text-foreground shadow-sm" : "text-foreground/50 hover:text-foreground"}
                `}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                Paste Link
              </button>
            </div>

            {/* Upload Area */}
            {videoMode === "upload" ? (
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => !uploadingVideo && fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl py-8 px-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[160px]
                  ${dragActive ? "border-lavender bg-lavender/5" : "border-foreground/15 hover:border-foreground/35 hover:bg-[#F8F4EE]/50"}
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {uploadingVideo ? (
                  <div className="space-y-2 text-foreground/60">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-lavender" />
                    <p className="text-sm font-bold">Uploading video file...</p>
                    <p className="text-xs text-foreground/40">This might take a moment depending on the size</p>
                  </div>
                ) : videoUrl && videoFile ? (
                  <div className="space-y-3">
                    <FileVideo className="w-12 h-12 text-sage-green mx-auto" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-foreground">{videoFile.name}</p>
                      <p className="text-xs text-foreground/40">{(videoFile.size / (1024 * 1024)).toFixed(1)} MB · Ready to submit</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setVideoFile(null)
                        setVideoUrl("")
                      }}
                      className="text-xs font-bold text-red-500 hover:underline"
                    >
                      Remove Video
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 text-foreground/40">
                    <Upload className="w-8 h-8 mx-auto" />
                    <p className="text-sm font-bold">Drag and drop your video file here</p>
                    <p className="text-xs">Or tap to select file (MP4, MOV, max 100MB)</p>
                  </div>
                )}
              </div>
            ) : (
              // Paste Link Area
              <div className="space-y-2">
                <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider">Paste Google Drive or YouTube link</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={e => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or https://drive.google.com/..."
                  className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3.5 font-medium text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-lavender transition-all text-sm border-0"
                />
                <p className="text-xs text-foreground/40">
                  Ensure the link sharing settings are set to public if hosting on Google Drive.
                </p>
              </div>
            )}
          </motion.div>

          {/* 5. Rapid Fire */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-foreground/5 p-6 md:p-8 shadow-soft space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-foreground/5">
              <Flame className="w-5 h-5 text-orange-highlight" />
              <h2 className="text-lg font-serif font-bold text-foreground">Rapid Fire (One word responses)</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RAPID_FIRE_PROMPTS.map(p => (
                <div key={p.id} className="space-y-1.5">
                  <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider">{p.label}</label>
                  <input
                    type="text"
                    value={rapidFire[p.id]}
                    onChange={e => handleRapidFireChange(p.id, e.target.value)}
                    placeholder="e.g. Magical"
                    maxLength={30}
                    className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 font-medium text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-lavender transition-all text-sm border-0"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* 6. Submit */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-4"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-foreground text-white py-4.5 rounded-2xl font-bold text-base tracking-wide hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:hover:scale-100 shadow-soft flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Saving Reflection...</span>
                </>
              ) : (
                <>
                  <span>Submit Reflection</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-foreground/40 mt-3 font-medium">
              We care about your privacy. Testimonials are only shared after curation and approval.
            </p>
          </motion.div>

        </form>
      </div>

      <Footer />
    </main>
  )
}
