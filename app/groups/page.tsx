"use client"

import { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2, Heart, ArrowRight, Sparkles, X } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useRegisterModal } from "@/components/register-modal-provider"

interface Member {
  name: string
  role?: string
  photo?: string
}

interface GroupData {
  id: string
  groupName: string
  tagline: string
  activity: string
  description: string
  script: string
  heroImage: string
  gallery: string[]
  members?: Member[]
  memberNames?: string[]
  memberPhotos?: string[]
  createdAt?: any
}

function GroupsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialGroup = searchParams.get("group")
  
  const { openRegisterModal } = useRegisterModal()
  const [groups, setGroups] = useState<GroupData[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(initialGroup)
  const [isLoading, setIsLoading] = useState(true)
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false)
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null)

  // ─── Fetch and Filter Groups ───────────────────────────────────────────────
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "groups"))
        const groupsData = querySnapshot.docs.map(doc => {
          const data = doc.data()
          console.log("Raw Firestore Group Doc [Audit]:", doc.id, data)
          
          return {
            id: doc.id,
            groupName: data.groupName || data.name || data.title || "Untitled Group",
            tagline: data.tagline || data.subTitle || "",
            activity: data.activity || data.category || "Creative Collective",
            description: data.description || data.about || "",
            script: data.script || "",
            heroImage: data.heroImage || data.imageUrl || data.heroImageUrl || "",
            gallery: data.gallery || [],
            members: data.members || [],
            memberNames: data.memberNames || [],
            memberPhotos: data.memberPhotos || [],
            createdAt: data.createdAt || null
          } as GroupData
        })

        // Filter out duplicates and placeholder/dummy groups
        const filtered = groupsData.filter(group => {
          const name = (group.groupName || "").trim().toLowerCase()
          if (name === "" || name === "untitled group") return false
          if (/^group\s+\d+$/.test(name)) return false // Filter "Group 1", "Group 2", etc.
          if (name.includes("placeholder") || name.includes("test group") || name.includes("dummy")) return false
          return true
        })

        // Remove duplicate group names
        const uniqueGroups: GroupData[] = []
        const seenNames = new Set<string>()
        for (const group of filtered) {
          const nameNormalized = (group.groupName || "").trim().toLowerCase()
          if (!seenNames.has(nameNormalized)) {
            seenNames.add(nameNormalized)
            uniqueGroups.push(group)
          }
        }

        // Sort by createdAt (chronological order)
        uniqueGroups.sort((a, b) => {
          const timeA = a.createdAt?.seconds || a.createdAt?.toMillis?.() || 0
          const timeB = b.createdAt?.seconds || b.createdAt?.toMillis?.() || 0
          return timeA - timeB
        })

        console.log("Filtered & Sorted Groups [Audit]:", uniqueGroups)
        setGroups(uniqueGroups)
        
        if (!selectedGroupId && uniqueGroups.length > 0) {
          setSelectedGroupId(uniqueGroups[0].id)
        }
      } catch (error) {
        console.error("Error fetching groups:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGroups()
  }, [])

  const handleSelectGroup = (id: string) => {
    setSelectedGroupId(id)
    router.push(`/groups?group=${id}`, { scroll: false })
  }

  const selectedGroup = groups.find(g => g.id === selectedGroupId) || groups[0]
  if (selectedGroup) {
    console.log("Selected Group in UI [Audit]:", selectedGroup.groupName, "Hero Image:", selectedGroup.heroImage)
  }

  const hasValidHeroImage = selectedGroup?.heroImage && selectedGroup.heroImage.trim().length > 0

  // ─── Members List Processing ──────────────────────────────────────────────
  const members: Member[] = selectedGroup
    ? selectedGroup.members && selectedGroup.members.length > 0
      ? selectedGroup.members
      : (selectedGroup.memberNames || []).map((name, i) => ({
          name,
          role: "",
          photo: selectedGroup.memberPhotos?.[i] || "",
        }))
    : []

  const memberCount = members.length
  const galleryCount = selectedGroup?.gallery ? selectedGroup.gallery.length : 0

  // ─── Description Paragraphs (Max 3) ───────────────────────────────────────
  const descParagraphs = selectedGroup?.description
    ? selectedGroup.description.split(/\n+/).filter(p => p.trim().length > 0).slice(0, 3)
    : []

  return (
    <div className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden min-h-screen">
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-pastel-yellow/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-lavender/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <span className="inline-block bg-lavender/40 border border-lavender/50 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground/80 -rotate-1">
            Creative Collectives
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
            Explore our
            <span className="font-handwritten text-peach font-normal block mt-2 text-5xl md:text-7xl rotate-1">
              groups.
            </span>
          </h1>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="font-serif italic text-lg">Gathering the groups...</p>
          </div>
        ) : groups.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 md:py-24 text-center max-w-2xl mx-auto"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="text-6xl mb-6"
            >
              🌸
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-foreground">
              Groups are currently forming
            </h2>
            
            <div className="bg-white/60 backdrop-blur-sm border border-white/40 shadow-soft p-8 md:p-10 rounded-3xl w-full max-w-md mb-10 text-left relative">
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-lavender/30 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-peach/20 rounded-full blur-xl" />
              
              <p className="text-foreground/80 font-medium mb-5 text-lg text-center">
                Soon you'll be able to explore:
              </p>
              <ul className="space-y-3 font-medium text-foreground/70 ml-4 md:ml-8 mb-8">
                {["performances", "scripts", "creative journeys", "team stories", "behind-the-scenes moments"].map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-peach text-sm">✦</span> {item}
                  </motion.li>
                ))}
              </ul>
              <p className="text-center font-handwritten text-3xl text-foreground/80 italic">
                Come back soon ✨
              </p>
            </div>

            <Link href="/create-group">
              <button
                className="inline-flex items-center gap-2 bg-foreground text-primary-foreground px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] border-2 border-foreground"
              >
                Register Your Group <Sparkles className="w-4 h-4 text-pastel-yellow" />
              </button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Scrapbook Selector Tabs */}
            <div className="mb-12 md:mb-16 relative">
              <div className="flex items-center gap-4 md:gap-6 z-10 relative overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2">
                <div className="flex items-center gap-4 md:gap-6 flex-nowrap mx-auto">
                {groups.map((group, index) => {
                  const isSelected = selectedGroupId === group.id
                  const rotate = index % 2 === 0 ? (isSelected ? "rotate-0" : "-rotate-3 hover:-rotate-1") : (isSelected ? "rotate-0" : "rotate-3 hover:rotate-1")
                  
                  return (
                    <button
                      key={group.id}
                      onClick={() => handleSelectGroup(group.id)}
                      className={`relative group transition-all duration-300 ${rotate} ${isSelected ? 'scale-110 z-20' : 'scale-100 opacity-70 hover:opacity-100 z-10'}`}
                    >
                      {/* Ripped tape effect */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/50 backdrop-blur-sm shadow-sm rotate-2 z-10" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 50%)", backgroundSize: "4px 100%" }} />
                      
                      <div className={`px-6 py-4 bg-white border-2 rounded-lg shadow-sm transition-colors ${isSelected ? 'border-foreground' : 'border-border'}`}>
                        <div className="font-serif font-bold text-lg md:text-xl text-foreground">
                          {group.groupName}
                        </div>
                        {isSelected && (
                          <motion.div layoutId="underline" className="absolute -bottom-2 left-4 right-4 h-1 bg-peach rounded-full" />
                        )}
                      </div>
                    </button>
                  )
                })}
                </div>
              </div>
            </div>

            {/* Selected Group Content Showcase */}
            <AnimatePresence mode="wait">
              {selectedGroup && (
                <motion.div
                  key={selectedGroup.id}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-12 max-w-6xl mx-auto"
                >
                  
                  {/* 1. HERO BANNER */}
                  {hasValidHeroImage ? (
                    <div className="relative w-full min-h-[300px] sm:min-h-[360px] md:min-h-[460px] rounded-3xl overflow-hidden shadow-soft flex items-end p-6 sm:p-10 md:p-14 border border-foreground/5 bg-cream">
                      <Image
                        src={selectedGroup.heroImage}
                        alt={selectedGroup.groupName}
                        fill
                        sizes="(max-width: 1024px) 100vw, 1200px"
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                      
                      <div className="relative w-full z-10 text-white flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div className="space-y-3.5 max-w-2xl text-left">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/10">
                            {selectedGroup.activity}
                          </span>
                          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black leading-tight text-white">
                            {selectedGroup.groupName}
                          </h2>
                          {selectedGroup.tagline && (
                            <p className="text-lg sm:text-xl md:text-2xl font-medium font-handwritten text-white/90 leading-relaxed">
                              &ldquo;{selectedGroup.tagline}&rdquo;
                            </p>
                          )}
                          <div className="flex flex-wrap gap-3 text-[11px] font-bold text-white/80 pt-1.5">
                            <span className="flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full border border-white/5">
                              👥 {memberCount} {memberCount === 1 ? "Member" : "Members"}
                            </span>
                            {galleryCount > 0 && (
                              <span className="flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full border border-white/5">
                                📸 {galleryCount} {galleryCount === 1 ? "Moment" : "Moments"}
                              </span>
                            )}
                          </div>
                        </div>
                        <button 
                          onClick={openRegisterModal}
                          className="shrink-0 bg-white text-foreground hover:bg-white/95 px-7 py-3.5 rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
                        >
                          Join the Collective <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full rounded-3xl overflow-hidden shadow-soft border-2 border-dashed border-foreground/15 bg-gradient-to-br from-lavender/20 via-cream to-peach/20 p-8 sm:p-10 md:p-14 flex flex-col justify-between text-foreground min-h-[260px] sm:min-h-[320px]">
                      {/* Scrapbook Tape Doodles */}
                      <div className="absolute -top-1.5 left-8 w-16 h-5 bg-pastel-yellow/70 rotate-2 shadow-sm rounded-[2px]" />
                      <div className="absolute top-6 right-8 text-2xl animate-pulse-soft select-none pointer-events-none opacity-40">✨</div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-peach/5 rounded-tl-full pointer-events-none -z-10" />

                      <div className="relative w-full z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div className="space-y-3.5 max-w-2xl text-left">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/60 backdrop-blur-sm text-foreground/80 border border-foreground/10">
                            {selectedGroup.activity}
                          </span>
                          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-foreground leading-tight">
                            {selectedGroup.groupName}
                          </h2>
                          {selectedGroup.tagline && (
                            <p className="text-lg sm:text-xl md:text-2xl font-medium font-handwritten text-foreground/75 leading-relaxed">
                              &ldquo;{selectedGroup.tagline}&rdquo;
                            </p>
                          )}
                          <div className="flex flex-wrap gap-3 text-[11px] font-bold text-foreground/75 pt-1.5">
                            <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full border border-foreground/5">
                              👥 {memberCount} {memberCount === 1 ? "Member" : "Members"}
                            </span>
                            {galleryCount > 0 && (
                              <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full border border-foreground/5">
                                📸 {galleryCount} {galleryCount === 1 ? "Moment" : "Moments"}
                              </span>
                            )}
                          </div>
                        </div>
                        <button 
                          onClick={openRegisterModal}
                          className="shrink-0 bg-foreground text-primary-foreground hover:bg-foreground/95 px-7 py-3.5 rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
                        >
                          Join the Collective <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 2. ABOUT THE GROUP (Max 3 Paragraphs) */}
                  {descParagraphs.length > 0 && (
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-foreground/5 space-y-5 text-left">
                      <h3 className="text-2xl font-bold font-serif text-foreground flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-pastel-yellow" /> About the Space
                      </h3>
                      <div className="prose prose-lg text-foreground/80 leading-relaxed space-y-4 max-w-none">
                        {descParagraphs.map((para, i) => (
                          <p key={i} className="whitespace-pre-wrap">{para}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. GALLERY (With click lightbox triggers) */}
                  {selectedGroup.gallery && selectedGroup.gallery.length > 0 && (
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-foreground/5 space-y-6 text-left">
                      <h3 className="text-2xl font-bold font-serif text-foreground flex items-center gap-2">
                        📸 Captured Moments
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {selectedGroup.gallery.map((img, idx) => {
                          const rotate = idx % 2 === 0 ? "rotate-1 hover:rotate-0" : "-rotate-1 hover:rotate-0"
                          return (
                            <div 
                              key={idx} 
                              onClick={() => setActiveLightboxImg(img)}
                              className={`relative aspect-square rounded-2xl overflow-hidden shadow-sm border-4 border-white ${rotate} transition-transform hover:scale-105 hover:z-10 cursor-pointer bg-cream`}
                            >
                              <Image 
                                src={img} 
                                alt={`${selectedGroup.groupName} Gallery ${idx + 1}`} 
                                fill 
                                sizes="(max-width: 768px) 50vw, 300px"
                                className="object-cover" 
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* 4. MEET THE COLLECTIVE (Grid card representation) */}
                  {members.length > 0 && (
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-foreground/5 space-y-6 text-left">
                      <h3 className="text-2xl font-bold font-serif text-foreground flex items-center gap-2">
                        👥 Meet the Collective
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {members.map((member, idx) => (
                          <div 
                            key={idx} 
                            className="flex flex-col items-center text-center p-4 rounded-2xl bg-cream/35 border border-foreground/5 hover:border-lavender hover:bg-lavender/5 transition-all group/member"
                          >
                            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-cream shrink-0 border-2 border-transparent group-hover/member:border-lavender transition-all shadow-sm group-hover/member:shadow-md mb-3">
                              {member.photo ? (
                                <Image 
                                  src={member.photo} 
                                  alt={member.name} 
                                  fill 
                                  sizes="80px"
                                  className="object-cover" 
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-serif text-2xl font-bold opacity-60 bg-foreground/5">
                                  {member.name ? member.name.charAt(0).toUpperCase() : "?"}
                                </div>
                              )}
                            </div>
                            <h4 className="font-serif font-bold text-foreground text-sm sm:text-base leading-snug group-hover/member:text-lavender transition-colors">
                              {member.name}
                            </h4>
                            {member.role && (
                              <span className="text-[10px] text-foreground/50 font-semibold tracking-wider uppercase mt-1.5">
                                {member.role}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. CREATIVE STORY (Short character preview with read script button) */}
                  {selectedGroup.script && (
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-foreground/5 relative transform -rotate-[0.3deg] hover:rotate-0 transition-transform text-left">
                      <div className="absolute -top-4 left-8 w-16 h-5 bg-lavender/50 backdrop-blur-sm -rotate-3 z-10" />
                      
                      <h3 className="text-xl font-bold font-serif mb-5 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-soft-pink fill-soft-pink" /> 
                        Creative Story & Concept
                      </h3>
                      
                      <div className="font-handwritten text-xl md:text-2xl leading-relaxed text-foreground/90">
                        <p>
                          {selectedGroup.script.length > 400 
                            ? selectedGroup.script.slice(0, 400).trim() + "..." 
                            : selectedGroup.script}
                        </p>
                      </div>

                      {selectedGroup.script.length > 400 && (
                        <button
                          type="button"
                          onClick={() => setIsScriptModalOpen(true)}
                          className="mt-6 inline-flex items-center gap-2 bg-foreground text-primary-foreground px-6 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-sm cursor-pointer border-2 border-foreground"
                        >
                          <span>Read Full Script</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* 6. BOTTOM CTA */}
                  <div className="bg-peach/20 border border-peach/30 rounded-[2rem] p-10 md:p-16 text-center shadow-soft relative overflow-hidden max-w-4xl mx-auto w-full">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-peach/40 rounded-bl-[8rem] -z-10" />
                    <h3 className="font-serif font-bold text-2xl md:text-3xl mb-3">Want to join them?</h3>
                    <p className="text-foreground/70 font-medium mb-8 max-w-lg mx-auto text-base sm:text-lg">
                      Be part of the community, witness their live performance, or join their creative journey.
                    </p>
                    <button 
                      onClick={openRegisterModal}
                      className="inline-flex items-center justify-center bg-foreground text-primary-foreground px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform gap-2 shadow-lg border-2 border-foreground"
                    >
                      Join the Experience <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 9. Read Full Script Modal */}
                  <AnimatePresence>
                    {isScriptModalOpen && (
                      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setIsScriptModalOpen(false)}
                          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
                        />
                        
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 20 }}
                          transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
                          className="relative w-full max-w-2xl bg-[#F8F4EE] rounded-[2rem] p-6 sm:p-10 border-4 border-foreground overflow-y-auto max-h-[85vh] z-50 my-8 mx-auto shadow-2xl text-left"
                        >
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-pastel-yellow border border-foreground/15 -rotate-2 z-20 flex items-center justify-center shadow-sm">
                            <span className="font-handwritten text-foreground text-sm font-black tracking-widest">
                              SCRIPT
                            </span>
                          </div>

                          <button
                            onClick={() => setIsScriptModalOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full border border-foreground/10 hover:bg-lavender/35 hover:scale-105 active:scale-95 transition-all z-20 text-foreground"
                            aria-label="Close modal"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          <div className="mt-8 space-y-4">
                            <div>
                              <span className="inline-block px-3 py-1 bg-lavender/50 text-foreground border border-foreground/5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                                {selectedGroup.activity}
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-serif font-black text-foreground">
                                {selectedGroup.groupName}
                              </h3>
                              {selectedGroup.tagline && (
                                <p className="font-handwritten text-lg text-foreground/60 italic mt-1">
                                  &ldquo;{selectedGroup.tagline}&rdquo;
                                </p>
                              )}
                            </div>
                            
                            <div className="border-t border-dashed border-foreground/10 pt-5 font-handwritten text-lg sm:text-xl leading-relaxed text-foreground/90 whitespace-pre-wrap max-h-[48vh] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-foreground/20">
                              {selectedGroup.script}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                  {/* 3. LIGHTBOX MODAL */}
                  <AnimatePresence>
                    {activeLightboxImg && (
                      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setActiveLightboxImg(null)}
                          className="fixed inset-0 bg-black/90 backdrop-blur-md z-40"
                        />
                        
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ type: "spring", duration: 0.4 }}
                          className="relative max-w-5xl max-h-[85vh] z-50 overflow-hidden rounded-2xl border-4 border-white shadow-2xl bg-black"
                        >
                          <button
                            onClick={() => setActiveLightboxImg(null)}
                            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 hover:scale-105 active:scale-95 text-white transition-all z-20 shadow-md"
                            aria-label="Close lightbox"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={activeLightboxImg} 
                            alt="Gallery Lightbox Preview" 
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                          />
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}

export default function GroupsPage() {
  return (
    <main className="bg-[#F8F4EE] selection:bg-lavender selection:text-foreground">
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-foreground/50" />
        </div>
      }>
        <GroupsContent />
      </Suspense>
      <Footer />
    </main>
  )
}
