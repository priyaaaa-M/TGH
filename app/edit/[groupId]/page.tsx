"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2, Sparkles, ArrowLeft } from "lucide-react"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { Navbar } from "@/components/navbar"
import { GroupUploadForm, type GroupFormData, type Member } from "@/components/group-upload-form"

interface StoredGroupData {
  groupName?: string
  tagline?: string
  activity?: string
  description?: string
  script?: string
  heroImage?: string
  // New schema
  members?: Member[]
  gallery?: string[]
  // Legacy schema support
  memberNames?: string[]
  memberPhotos?: string[]
  createdByEmail?: string
}

export default function EditGroupPage() {
  const { groupId } = useParams()
  const router = useRouter()

  const [initialData, setInitialData] = useState<GroupFormData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!groupId) {
      router.push("/")
      return
    }

    const fetchGroup = async () => {
      try {
        const docRef = doc(db, "groups", groupId as string)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
          router.push("/")
          return
        }

        const data = docSnap.data() as StoredGroupData

        // Migrate legacy memberNames/memberPhotos → members array
        let members: Member[] = data.members || []
        if (members.length === 0 && (data.memberNames?.length || data.memberPhotos?.length)) {
          const maxLen = Math.max(data.memberNames?.length || 0, data.memberPhotos?.length || 0)
          members = Array.from({ length: maxLen }, (_, i) => ({
            name: data.memberNames?.[i] || "",
            role: "",
            photo: data.memberPhotos?.[i] || "",
          }))
        }

        setInitialData({
          groupName: data.groupName || "",
          tagline: data.tagline || "",
          activity: data.activity || "",
          description: data.description || "",
          script: data.script || "",
          heroImage: data.heroImage || "",
          members,
          gallery: data.gallery || [],
        })
      } catch (err) {
        console.error("Error fetching group:", err)
        router.push("/")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGroup()
  }, [groupId, router])

  const handleSave = async (data: GroupFormData) => {
    setIsSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const docRef = doc(db, "groups", groupId as string)
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      })
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      console.error("Error saving:", err)
      setError("Failed to save. Please try again.")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-foreground/30" />
      </div>
    )
  }

  if (!initialData) return null

  return (
    <main className="min-h-screen bg-[#F8F4EE]">
      <Navbar />
      <div className="pt-20 pb-16 px-4 max-w-2xl mx-auto">

        {/* Page Header */}
        <div className="py-6 relative">
          <button
            onClick={() => router.push(`/groups?group=${groupId}`)}
            className="flex items-center gap-1.5 text-xs font-bold text-foreground/40 hover:text-foreground/70 transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> View public page
          </button>

          <div className="text-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-5 bg-peach/50 -rotate-2 hidden sm:block" />
            <div className="inline-flex items-center gap-2 bg-white border border-foreground/5 px-3 py-1 rounded-full text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2 shadow-sm">
              <Sparkles className="w-3 h-3 text-pastel-yellow" /> Group Upload Space
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              {initialData.groupName || "Edit Your Group"}
            </h1>
            <p className="text-sm text-foreground/55 font-medium mt-1 font-handwritten text-base">
              Update your group details, members, and creative story here.
            </p>
          </div>
        </div>

        <GroupUploadForm
          initialData={initialData}
          onSave={handleSave}
          isSaving={isSaving}
          saveLabel="SAVE CHANGES"
          successMessage="Your group has been updated successfully 💫"
          error={error}
          success={success}
        />
      </div>
    </main>
  )
}
