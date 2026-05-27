"use client"

import { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2, Heart, ArrowRight, Sparkles } from "lucide-react"
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
}

function GroupsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialGroup = searchParams.get("group")
  
  const { openRegisterModal } = useRegisterModal()
  const [groups, setGroups] = useState<GroupData[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(initialGroup)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "groups"))
        const groupsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as GroupData[]
        
        groupsData.sort((a, b) => a.groupName.localeCompare(b.groupName))
        setGroups(groupsData)
        
        if (!selectedGroupId && groupsData.length > 0) {
          setSelectedGroupId(groupsData[0].id)
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
              {/* Decorative elements */}
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
            {/* Scrapbook Selector */}
            <div className="mb-16 md:mb-24 relative">
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

            {/* Selected Group Content */}
            <AnimatePresence mode="wait">
              {selectedGroup && (
                <motion.div
                  key={selectedGroup.id}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-16"
                >
                  
                  {/* Hero Banner */}
                  <div className={`relative aspect-[21/9] md:aspect-[3/1] w-full rounded-3xl overflow-hidden shadow-soft group flex items-end ${!selectedGroup.heroImage ? 'bg-gradient-to-br from-lavender/30 to-peach/20 border border-white/50' : ''}`}>
                    {selectedGroup.heroImage && (
                      <>
                        <Image
                          src={selectedGroup.heroImage}
                          alt={selectedGroup.groupName}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      </>
                    )}
                    
                    <div className="relative p-6 md:p-12 w-full z-10">
                      <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border ${selectedGroup.heroImage ? 'bg-white/20 backdrop-blur-md text-white border-white/10' : 'bg-white/50 backdrop-blur-sm text-foreground border-foreground/10'}`}
                      >
                        {selectedGroup.activity}
                      </motion.span>
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`text-4xl md:text-6xl font-serif font-bold leading-tight mb-3 ${selectedGroup.heroImage ? 'text-white' : 'text-foreground'}`}
                      >
                        {selectedGroup.groupName}
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`text-xl md:text-2xl font-medium font-handwritten ${selectedGroup.heroImage ? 'text-white/90' : 'text-foreground/80'}`}
                      >
                        &ldquo;{selectedGroup.tagline}&rdquo;
                      </motion.p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    
                    {/* Main Column */}
                    <div className="md:col-span-2 space-y-12">
                      {/* Description */}
                      <div className="prose prose-lg prose-headings:font-serif text-foreground/80">
                        <h3 className="text-2xl font-bold text-foreground mb-4 font-serif flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-pastel-yellow" /> About the Space
                        </h3>
                        <p className="whitespace-pre-wrap">{selectedGroup.description || "A space for creative expression."}</p>
                      </div>

                      {/* Script / Concept */}
                      {selectedGroup.script && (
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-foreground/5 relative transform -rotate-1 hover:rotate-0 transition-transform">
                          <div className="absolute -top-4 left-8 w-16 h-8 bg-lavender/50 backdrop-blur-sm -rotate-3 z-10" />
                          <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-soft-pink fill-soft-pink" /> 
                            Creative Concept & Script
                          </h3>
                          <div className="font-handwritten text-xl md:text-2xl leading-relaxed text-foreground/90 whitespace-pre-wrap">
                            {selectedGroup.script}
                          </div>
                        </div>
                      )}

                      {/* Gallery */}
                      {selectedGroup.gallery && selectedGroup.gallery.length > 0 && (
                        <div>
                          <h3 className="text-2xl font-bold font-serif mb-8 text-foreground">Captured Moments</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {selectedGroup.gallery.map((img, idx) => {
                              const rotate = idx % 2 === 0 ? "rotate-2" : "-rotate-2"
                              return (
                                <div key={idx} className={`relative aspect-square rounded-2xl overflow-hidden shadow-sm border-4 border-white ${rotate} hover:rotate-0 transition-transform hover:z-10`}>
                                  <Image src={img} alt={`Gallery image ${idx + 1}`} fill className="object-cover" />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                      {/* CTA */}
                      <div className="bg-peach/20 border border-peach/30 rounded-3xl p-8 text-center shadow-soft relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-peach/40 rounded-bl-[4rem] -z-10" />
                        <h3 className="font-serif font-bold text-2xl mb-3">Want to join them?</h3>
                        <p className="text-foreground/70 font-medium mb-8">Register to be part of this group or witness their performance.</p>
                        <button 
                          onClick={openRegisterModal}
                          className="w-full bg-foreground text-primary-foreground py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-sm"
                        >
                          Join the Experience <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Members – supports both new members[] and legacy memberNames[] */}
                      {(() => {
                        const members: Member[] = selectedGroup.members && selectedGroup.members.length > 0
                          ? selectedGroup.members
                          : (selectedGroup.memberNames || []).map((name, i) => ({
                              name,
                              role: "",
                              photo: selectedGroup.memberPhotos?.[i] || "",
                            }))
                        if (members.length === 0) return null
                        return (
                          <div className="bg-white rounded-3xl p-8 shadow-sm border border-foreground/5">
                            <h3 className="font-serif font-bold text-2xl mb-6">The Collective</h3>
                            <div className="space-y-5">
                              {members.map((member, idx) => (
                                <div key={idx} className="flex items-center gap-4 group/member">
                                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-cream shrink-0 border-2 border-transparent group-hover/member:border-lavender transition-colors">
                                    {member.photo ? (
                                      <Image src={member.photo} alt={member.name} fill className="object-cover" />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center font-serif text-lg font-bold opacity-50 bg-foreground/5">
                                        {member.name ? member.name.charAt(0).toUpperCase() : "?"}
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <span className="font-bold text-foreground/90 text-lg group-hover/member:text-lavender transition-colors block">{member.name}</span>
                                    {member.role && <span className="text-xs text-foreground/50 font-medium">{member.role}</span>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })()}
                    </div>
                  </div>

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
