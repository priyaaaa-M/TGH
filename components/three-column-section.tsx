"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Play, ArrowUpRight, Send, X, Square, Loader2 } from "lucide-react"
import { db, auth } from "@/lib/firebase"

import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, limit, doc, updateDoc, increment, getDoc, setDoc } from "firebase/firestore"

interface VoiceNote {
  id: string
  duration: string
  waveform: number[]
  audioUrl: string
  createdAt: any
}

const voiceNotes = [
  { duration: "0:21", waveform: [3, 5, 4, 7, 3, 6, 4, 8, 5, 3, 6, 4, 7, 5, 3] },
  { duration: "0:18", waveform: [4, 6, 3, 5, 7, 4, 6, 3, 5, 4, 7, 5, 3, 6, 4] },
  { duration: "0:24", waveform: [5, 3, 6, 4, 7, 5, 3, 6, 8, 4, 5, 7, 3, 6, 4] },
  { duration: "0:31", waveform: [3, 7, 4, 6, 3, 5, 7, 4, 6, 3, 5, 8, 4, 6, 3] },
]

const pollOptions = [
  { id: "option1", label: "I feel this often" },
  { id: "option2", label: "Sometimes" },
  { id: "option3", label: "I've never thought about it" },
]

export function ThreeColumnSection() {
    const [votedOption, setVotedOption] = useState<string | null>(null)
  const [pollData, setPollData] = useState<any>(null)
  const [isPollLoading, setIsPollLoading] = useState(true)
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([])
  const [isVoiceLoading, setIsVoiceLoading] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [playingNoteId, setPlayingNoteId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const lastRecordedDuration = useRef<number>(0)

  // Real-time listener for poll
  useEffect(() => {
    // Only access localStorage on client
    if (typeof window !== "undefined") {
      const hasVoted = localStorage.getItem("hasVotedPoll") === "true"
      const savedOption = localStorage.getItem("votedOptionId")
      if (hasVoted) {
        setVotedOption(savedOption || "voted")
      }
    }

    const q = query(collection(db, "pollVotes"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("POLL UPDATED! Docs:", snapshot.docs.length)
      const counts: any = {
        option1: 0,
        option2: 0,
        option3: 0,
        totalVotes: 0
      }
      
      snapshot.docs.forEach(doc => {
        const data = doc.data()
        if (data.option) {
          counts[data.option] = (counts[data.option] || 0) + 1
          counts.totalVotes++
        }
      })
      
      setPollData(counts)
      setIsPollLoading(false)
    }, (error) => {
      console.error("POLL SYNC ERROR:", error)
      setIsPollLoading(false)
    })
    
    return () => unsubscribe()
  }, [])

  // Real-time listener for voice notes
  useEffect(() => {
    // Ordering by newest first. Note: If this fails, Firestore index is needed.
    const q = query(collection(db, "voiceNotes"), orderBy("createdAt", "desc"), limit(6))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as VoiceNote[]
      console.log("VOICE FETCHED! Count:", notes.length)
      setVoiceNotes(notes)
      setIsVoiceLoading(false)
    }, (error) => {
      console.error("VOICE SYNC ERROR:", error)
      setIsVoiceLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleVote = async (optionId: string) => {
    if (votedOption) {
      console.log("User has already voted.")
      return
    }
    if (!pollData) {
      console.log("Poll data not yet loaded. Cannot vote.")
      return
    }
    
    console.log("Submitting poll vote for:", optionId)
    setVotedOption(optionId)
    localStorage.setItem("hasVotedPoll", "true")
    localStorage.setItem("votedOptionId", optionId) // Store specific option
    
    try {
      await addDoc(collection(db, "pollVotes"), {
        option: optionId,
        createdAt: serverTimestamp()
      })
      console.log("VOTE SAVED!")
    } catch (err) {
      console.error("VOTE ERROR:", err)
      setVotedOption(null)
      localStorage.removeItem("hasVotedPoll")
      localStorage.removeItem("votedOptionId")
      setErrorMessage("Voting failed. Please check your connection.")
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const getPercentage = (optionId: string) => {
    if (!pollData || pollData.totalVotes === 0) return 0
    const count = pollData[optionId] || 0
    return Math.round((count / pollData.totalVotes) * 100)
  }

  const startRecording = async () => {
    console.log("Requesting microphone access...")
    
    // Check if mediaDevices is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("MediaDevices not supported in this browser")
      setErrorMessage("Your browser does not support voice recording. Please try Chrome or Safari.")
      setTimeout(() => setErrorMessage(null), 5000)
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      console.log("Microphone access granted.")
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = async () => {
        console.log("MediaRecorder stopped. Finalizing audio...")
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" })
        const durationSnapshot = lastRecordedDuration.current > 0 ? lastRecordedDuration.current : 1
        
        // Ensure all UI states reset eventually
        try {
          await uploadVoiceNote(audioBlob, durationSnapshot)
        } catch (err) {
          console.error("Upload process failed:", err)
        } finally {
          console.log("Lifecycle complete. Resetting UI.")
          setIsUploading(false)
          setIsRecording(false)
          setRecordingTime(0)
        }
        
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      
      // Reset timer
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (err: any) {
      console.error("Microphone Access Error:", err)
      setIsRecording(false)
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setErrorMessage("Please allow microphone access to record your voice.")
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setErrorMessage("No microphone found. Please connect a mic and try again.")
      } else {
        setErrorMessage("Could not access microphone. Please ensure no other app is using it.")
      }
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      console.log("Stopping recording manually...")
      lastRecordedDuration.current = recordingTime
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const formatDuration = (seconds: number) => {
    if (seconds <= 0) return "0:01" // Minimum 1 second
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }
  const handlePlayPause = (noteId: string, url: string) => {
    if (playingNoteId === noteId) {
      audioRef.current?.pause()
      setPlayingNoteId(null)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => setPlayingNoteId(null)
      audio.play().catch(e => console.error("Playback failed:", e))
      setPlayingNoteId(noteId)
    }
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])
  const uploadVoiceNote = async (blob: Blob, finalTime: number) => {
    console.log("UPLOAD START: Size:", blob.size, "Duration:", finalTime)
    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append("file", blob)
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
      
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      console.log("Uploading to Cloudinary...")
      
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
      console.log("CLOUDINARY SUCCESS:", data.secure_url)
      
      const audioUrl = data.secure_url
      const durationStr = formatDuration(finalTime)
      const waveform = Array.from({ length: 15 }, () => Math.floor(Math.random() * 6) + 3)

      console.log("Saving to Firestore...")
      try {
        await addDoc(collection(db, "voiceNotes"), {
          audioUrl,
          waveform,
          duration: durationStr,
          anonymous: true,
          createdAt: serverTimestamp(),
          userId: auth.currentUser?.uid || "anon",
        })
        console.log("FIRESTORE SUCCESS!")
      } catch (dbErr) {
        console.error("FIRESTORE ERROR:", dbErr)
        throw dbErr
      }
    } catch (err: any) {
      console.error("UPLOAD FAILED:", err)
      setErrorMessage(`Upload failed: ${err.message || "Unknown error"}`)
      setTimeout(() => setErrorMessage(null), 5000)
    } finally {
      console.log("UPLOAD FINISHED: Cleaning up state.")
      setIsUploading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-lavender/20">
      <div className="max-w-7xl mx-auto">
        {/* Inline error toast */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700 font-medium text-center animate-in fade-in slide-in-from-top-2">
            {errorMessage}
            <button onClick={() => setErrorMessage(null)} className="ml-3 text-red-400 hover:text-red-600 font-bold">✕</button>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Today's Prompt Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-soft relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-2xl">🌸</div>
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-soft-pink/30 rounded-full" />

            <span className="inline-block bg-peach/50 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide mb-4">
              Today&apos;s Unfiltered Prompt
            </span>

            <h3 className="text-2xl md:text-3xl font-serif font-bold leading-tight mb-6">
              What part of you are you hiding the most?
            </h3>

            <div className="space-y-3">
              <button 
                onClick={() => window.open("https://forms.gle/VqQ3Tdji3F4nCWny5", "_blank", "noopener,noreferrer")}
                className="w-full flex items-center justify-center gap-2 bg-foreground text-primary-foreground px-5 py-3 rounded-full font-medium hover:bg-foreground/90 transition-all border-2 border-foreground"
              >
                Submit Anonymously
                <ArrowUpRight className="w-4 h-4" />
              </button>
              
              {!isRecording ? (
                <button 
                  onClick={startRecording}
                  disabled={isUploading}
                  className="w-full flex items-center justify-center gap-2 border-2 border-foreground px-5 py-3 rounded-full font-medium hover:bg-foreground/5 transition-all disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      Uploading...
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Record a Voice Note
                      <Mic className="w-4 h-4" />
                    </>
                  )}
                </button>
              ) : (
                <button 
                  onClick={stopRecording}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-3 rounded-full font-medium animate-pulse"
                >
                  Stop Recording ({formatTime(recordingTime)})
                  <Square className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Voice Notes Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-soft"
          >
            <span className="inline-block bg-baby-blue/50 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide mb-4">
              Voice Notes
            </span>

            <div className={`space-y-4 pr-2 custom-scrollbar ${voiceNotes.length > 3 ? "max-h-[320px] overflow-y-auto" : ""}`}>
              {isVoiceLoading ? (
                // Shimmer Skeletons
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-lavender/5 animate-pulse">
                      <div className="w-10 h-10 rounded-full bg-foreground/10 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-foreground/5 rounded w-3/4" />
                        <div className="h-2 bg-foreground/5 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : voiceNotes.length === 0 && !isUploading ? (
                <div className="text-center py-10 px-4 border-2 border-dashed border-foreground/10 rounded-2xl bg-cream/35">
                  <div className="text-3xl mb-2">🎙️</div>
                  <p className="text-sm font-bold text-foreground/80">
                    No voice notes shared yet.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-handwritten font-medium">
                    be the very first to whisper your truth...
                  </p>
                </div>
              ) : (
                <>
                  {isUploading && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-lavender/10 animate-pulse mb-4">
                      <div className="w-10 h-10 rounded-full bg-foreground/20 shrink-0" />
                      <div className="flex-1 h-2 bg-foreground/10 rounded-full" />
                    </div>
                  )}
                  {voiceNotes.map((note) => {
                    const isPlaying = playingNoteId === note.id
                    
                    return (
                      <div
                        key={note.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-cream hover:bg-lavender/10 transition-all border border-transparent hover:border-border/40 group mb-3"
                      >
                        <button 
                          onClick={() => handlePlayPause(note.id, note.audioUrl)}
                          className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform"
                        >
                          {isPlaying ? (
                            <Square className="w-4 h-4 text-primary-foreground fill-current" />
                          ) : (
                            <Play className="w-4 h-4 text-primary-foreground ml-0.5" fill="currentColor" />
                          )}
                        </button>

                        <div className="flex-1 flex flex-col gap-1">
                          <div className="flex items-center gap-0.5 h-6">
                            {note.waveform.map((height, i) => (
                              <motion.div
                                key={i}
                                animate={isPlaying ? { 
                                  height: [`${height * 2}px`, `${height * 3}px`, `${height * 2}px`] 
                                } : { height: `${height * 2}px` }}
                                transition={{ 
                                  duration: 0.5, 
                                  repeat: Infinity, 
                                  delay: i * 0.05,
                                  ease: "easeInOut"
                                }}
                                className={`w-1 rounded-full transition-colors ${
                                  isPlaying ? "bg-foreground" : "bg-foreground/20"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-50">
                              Anonymous • {note.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </>
              )}
            </div>

            <button 
              onClick={() => window.open("https://forms.gle/VqQ3Tdji3F4nCWny5", "_blank", "noopener,noreferrer")}
              className="mt-4 text-sm text-orange-highlight font-bold hover:underline flex items-center gap-1"
            >
              Hear more voices
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </motion.div>

          {/* Quick Poll Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-soft relative"
          >
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-sage-green/30 rounded-bl-[3rem]" />

            <span className="inline-block bg-sage-green/50 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide mb-4">
              Quick Poll
            </span>

            <h3 className="text-xl font-serif font-bold mb-6">
              Do you feel this?
            </h3>

            <div className="space-y-4">
              {pollOptions.map((option) => {
                const percentage = getPercentage(option.id)
                const isSelected = votedOption === option.id
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleVote(option.id)}
                    disabled={votedOption !== null || isPollLoading}
                    className={`group w-full text-left p-4 rounded-2xl border-2 transition-all relative overflow-hidden ${
                      votedOption
                        ? (votedOption === option.id ? "border-foreground bg-foreground/5" : "border-border opacity-60")
                        : "border-border hover:border-foreground/30 bg-white"
                    } disabled:cursor-default`}
                  >
                    {/* Progress Bar Background */}
                    {votedOption && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`absolute inset-y-0 left-0 ${
                          votedOption === option.id ? "bg-foreground/10" : "bg-black/[0.03]"
                        }`}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <span className={`text-sm font-medium transition-colors flex-1 text-left ${
                        votedOption === option.id ? "text-foreground font-bold" : "text-foreground/85"
                      }`}>
                        {option.label}
                      </span>
                      {votedOption && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs font-bold font-serif text-foreground/50 shrink-0"
                        >
                          {percentage}%
                        </motion.span>
                      )}
                    </div>

                    {/* Floating check for selected */}
                    {votedOption === option.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-1 -top-1 bg-foreground text-white p-1 rounded-bl-xl z-20"
                      >
                        <ArrowUpRight className="w-3 h-3" />
                      </motion.div>
                    )}
                  </button>
                )
              })}
            </div>

            {votedOption && pollData && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-[10px] text-muted-foreground text-center uppercase tracking-widest font-bold opacity-60"
              >
                THANK YOU FOR YOUR VOICE! ({pollData.totalVotes} TOTAL)
              </motion.p>
            )}

            {!votedOption && (
              <p className="mt-4 text-xs text-muted-foreground text-center italic">
                (Your response is anonymous)
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
