"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { Loader2, Upload, Plus, Trash2, Image as ImageIcon, Camera, Users, BookOpen, Images } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Member {
  name: string
  role: string
  photo: string
}

export interface GroupFormData {
  groupName: string
  tagline: string
  activity: string
  description: string
  script: string
  heroImage: string
  members: Member[]
  gallery: string[]
}

interface GroupUploadFormProps {
  initialData?: Partial<GroupFormData>
  onSave: (data: GroupFormData) => Promise<void>
  isSaving: boolean
  saveLabel?: string
  successMessage?: string
  error?: string | null
  success?: boolean
}

// ─── Cloudinary upload helper ─────────────────────────────────────────────────
async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "voiceNote")
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error?.message || "Upload failed")
  }
  const data = await res.json()
  return data.secure_url
}

const EMPTY_FORM: GroupFormData = {
  groupName: "",
  tagline: "",
  activity: "",
  description: "",
  script: "",
  heroImage: "",
  members: [],
  gallery: [],
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function GroupUploadForm({
  initialData,
  onSave,
  isSaving,
  saveLabel = "SAVE GROUP",
  successMessage = "Your group has been updated successfully 💫",
  error,
  success,
}: GroupUploadFormProps) {
  const [form, setForm] = useState<GroupFormData>({ ...EMPTY_FORM, ...initialData })
  const [uploadingHero, setUploadingHero] = useState(false)
  const [uploadingMember, setUploadingMember] = useState<number | null>(null)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [isDraggingHero, setIsDraggingHero] = useState(false)
  const [isDraggingGallery, setIsDraggingGallery] = useState(false)

  const heroInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const memberPhotoRefs = useRef<(HTMLInputElement | null)[]>([])

  // ─── Hero upload ─────────────────────────────────────────────────────────
  const handleHeroFile = async (file: File) => {
    setUploadingHero(true)
    try {
      const url = await uploadToCloudinary(file)
      setForm(f => ({ ...f, heroImage: url }))
    } catch (e: any) {
      setFormError(`Hero upload failed: ${e.message}`)
    } finally {
      setUploadingHero(false)
    }
  }

  const onHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleHeroFile(file)
    e.target.value = ""
  }

  const onHeroDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingHero(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) handleHeroFile(file)
  }, [])

  // ─── Gallery upload (multi-file) ─────────────────────────────────────────
  const handleGalleryFiles = async (files: FileList) => {
    const remaining = 6 - form.gallery.length
    if (remaining <= 0) return
    const toUpload = Array.from(files).slice(0, remaining)
    setUploadingGallery(true)
    try {
      const urls = await Promise.all(toUpload.map(uploadToCloudinary))
      setForm(f => ({ ...f, gallery: [...f.gallery, ...urls].slice(0, 6) }))
    } catch (e: any) {
      setFormError(`Gallery upload failed: ${e.message}`)
    } finally {
      setUploadingGallery(false)
    }
  }

  const onGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleGalleryFiles(e.target.files)
    e.target.value = ""
  }

  const onGalleryDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingGallery(false)
    if (e.dataTransfer.files?.length) handleGalleryFiles(e.dataTransfer.files)
  }, [form.gallery.length])

  const removeGallery = (idx: number) =>
    setForm(f => ({ ...f, gallery: f.gallery.filter((_, i) => i !== idx) }))

  // ─── Member helpers ───────────────────────────────────────────────────────
  const addMember = () =>
    setForm(f => ({ ...f, members: [...f.members, { name: "", role: "", photo: "" }] }))

  const removeMember = (idx: number) =>
    setForm(f => ({ ...f, members: f.members.filter((_, i) => i !== idx) }))

  const updateMember = (idx: number, field: keyof Member, value: string) =>
    setForm(f => {
      const members = [...f.members]
      members[idx] = { ...members[idx], [field]: value }
      return { ...f, members }
    })

  const handleMemberPhoto = async (idx: number, file: File) => {
    setUploadingMember(idx)
    try {
      const url = await uploadToCloudinary(file)
      updateMember(idx, "photo", url)
    } catch (e: any) {
      setFormError(`Member photo upload failed: ${e.message}`)
    } finally {
      setUploadingMember(null)
    }
  }

  // ─── Save ────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setFormError(null)
    if (!form.groupName.trim()) {
      setFormError("Group Name is required.")
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    await onSave(form)
  }

  const displayError = error || formError

  return (
    <div className="space-y-3">
      {/* Hidden inputs */}
      <input ref={heroInputRef} type="file" accept="image/*" className="hidden" onChange={onHeroChange} />
      <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={onGalleryChange} />

      {/* Alerts */}
      {displayError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium text-center animate-in fade-in">
          {displayError}
        </div>
      )}
      {success && (
        <div className="p-3 bg-[#F2FCE2] border border-[#D4EDBA] text-[#3A6011] rounded-2xl text-sm font-medium text-center animate-in fade-in">
          {successMessage}
        </div>
      )}

      {/* ── CARD: Basic Info ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-foreground/5 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-foreground/5 bg-[#F8F4EE]">
          <BookOpen className="w-4 h-4 text-foreground/50" />
          <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">Group Info</span>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider mb-1.5">Group Name *</label>
            <input
              type="text"
              value={form.groupName}
              onChange={e => setForm(f => ({ ...f, groupName: e.target.value }))}
              placeholder="e.g. Echoes"
              className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 text-xl font-serif font-bold text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-lavender transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider mb-1.5">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))}
                placeholder="A short emotional hook..."
                className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 font-medium text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-lavender transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider mb-1.5">Activity Type</label>
              <input
                type="text"
                value={form.activity}
                onChange={e => setForm(f => ({ ...f, activity: e.target.value }))}
                placeholder="e.g. Spoken Word Poetry"
                className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 font-medium text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-lavender transition-all text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-foreground/60 uppercase tracking-wider mb-1.5">Script / Story</label>
            <textarea
              value={form.script}
              onChange={e => setForm(f => ({ ...f, script: e.target.value }))}
              rows={5}
              placeholder="Write your creative story or performance concept here..."
              className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 font-handwritten text-lg text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-lavender transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* ── CARD: Group Cover Photo ───────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-foreground/5 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-foreground/5 bg-[#F8F4EE]">
          <Camera className="w-4 h-4 text-foreground/50" />
          <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">Group Cover Photo</span>
        </div>
        <div className="p-4">
          <div
            onClick={() => !uploadingHero && heroInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setIsDraggingHero(true) }}
            onDragLeave={() => setIsDraggingHero(false)}
            onDrop={onHeroDrop}
            className={`relative aspect-[16/7] w-full rounded-xl overflow-hidden cursor-pointer flex items-center justify-center transition-all
              ${isDraggingHero ? "ring-2 ring-lavender bg-lavender/10" : "bg-[#F8F4EE]"}
              ${!form.heroImage ? "border-2 border-dashed border-foreground/15 hover:border-foreground/30" : ""}
            `}
          >
            {form.heroImage ? (
              <>
                <Image src={form.heroImage} alt="Group Cover" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center group">
                  <span className="opacity-0 group-hover:opacity-100 bg-white text-foreground text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow transition-opacity">
                    {uploadingHero ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    {uploadingHero ? "Uploading..." : "Replace Photo"}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-foreground/40 pointer-events-none select-none">
                {uploadingHero
                  ? <Loader2 className="w-8 h-8 animate-spin" />
                  : <ImageIcon className="w-8 h-8" />
                }
                <span className="text-sm font-bold">
                  {uploadingHero ? "Uploading..." : "Tap to upload · or drag & drop"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── CARD: Members ────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-foreground/5 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/5 bg-[#F8F4EE]">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-foreground/50" />
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">Members</span>
          </div>
          <span className="text-xs text-foreground/40 font-medium">{form.members.length} added</span>
        </div>
        <div className="p-4 space-y-3">
          {form.members.map((member, idx) => (
            <div key={idx} className="bg-[#F8F4EE] rounded-xl p-3 space-y-2.5 relative">
              {/* Member photo + name row */}
              <div className="flex items-start gap-3">
                {/* Photo */}
                <div className="shrink-0 relative">
                  <div
                    className="w-14 h-14 rounded-full bg-white border border-foreground/10 overflow-hidden flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      const inp = memberPhotoRefs.current[idx]
                      if (inp) inp.click()
                    }}
                  >
                    {member.photo ? (
                      <Image src={member.photo} alt={member.name || "Member"} fill className="object-cover" />
                    ) : uploadingMember === idx ? (
                      <Loader2 className="w-5 h-5 animate-spin text-foreground/40" />
                    ) : (
                      <Camera className="w-5 h-5 text-foreground/30" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={el => { memberPhotoRefs.current[idx] = el }}
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) handleMemberPhoto(idx, file)
                      e.target.value = ""
                    }}
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-foreground rounded-full flex items-center justify-center pointer-events-none">
                    <Upload className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>

                {/* Name + role */}
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={member.name}
                    onChange={e => updateMember(idx, "name", e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-white rounded-lg px-3 py-2 text-sm font-bold text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-lavender transition-all"
                  />
                  <input
                    type="text"
                    value={member.role}
                    onChange={e => updateMember(idx, "role", e.target.value)}
                    placeholder="Role (optional) — e.g. Lead Vocalist"
                    className="w-full bg-white rounded-lg px-3 py-2 text-xs font-medium text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-lavender transition-all"
                  />
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeMember(idx)}
                  className="shrink-0 p-1.5 text-foreground/30 hover:text-red-500 transition-colors"
                  title="Remove member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addMember}
            className="w-full py-3 rounded-xl border-2 border-dashed border-foreground/10 text-foreground/50 font-bold text-sm hover:border-foreground/25 hover:text-foreground/70 hover:bg-foreground/3 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Another Member
          </button>
        </div>
      </div>

      {/* ── CARD: Gallery ────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-foreground/5 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/5 bg-[#F8F4EE]">
          <div className="flex items-center gap-2">
            <Images className="w-4 h-4 text-foreground/50" />
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">Gallery Photos</span>
          </div>
          <span className="text-xs text-foreground/40 font-medium">{form.gallery.length}/6</span>
        </div>
        <div className="p-4 space-y-3">
          {/* Multi-upload drop zone */}
          {form.gallery.length < 6 && (
            <div
              onClick={() => galleryInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setIsDraggingGallery(true) }}
              onDragLeave={() => setIsDraggingGallery(false)}
              onDrop={onGalleryDrop}
              className={`w-full rounded-xl border-2 border-dashed py-6 flex flex-col items-center gap-2 cursor-pointer transition-all text-foreground/50 hover:text-foreground/70
                ${isDraggingGallery ? "border-lavender bg-lavender/10 text-lavender" : "border-foreground/15 hover:border-foreground/30 hover:bg-foreground/3"}
              `}
            >
              {uploadingGallery ? (
                <>
                  <Loader2 className="w-7 h-7 animate-spin" />
                  <span className="text-sm font-bold">Uploading photos...</span>
                </>
              ) : (
                <>
                  <Upload className="w-7 h-7" />
                  <span className="text-sm font-bold">Select multiple photos at once</span>
                  <span className="text-xs opacity-70">Tap to pick · or drag & drop · up to {6 - form.gallery.length} more</span>
                </>
              )}
            </div>
          )}

          {/* Image grid preview */}
          {form.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {form.gallery.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group/gal">
                  <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                  <button
                    onClick={() => removeGallery(idx)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover/gal:opacity-100 transition-opacity hover:bg-red-500"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {/* Add more tile */}
              {form.gallery.length < 6 && !uploadingGallery && (
                <button
                  onClick={() => galleryInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-foreground/10 hover:border-foreground/30 flex flex-col items-center justify-center gap-1 text-foreground/30 hover:text-foreground/50 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-xs font-bold">Add</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── SAVE BUTTON ──────────────────────────────────────────── */}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full bg-foreground text-white py-4 rounded-2xl font-bold text-base tracking-wide hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:hover:scale-100 shadow-soft flex items-center justify-center gap-2.5"
      >
        {isSaving ? <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</> : saveLabel}
      </button>
    </div>
  )
}
