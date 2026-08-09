import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { InfoPillsStrip } from "@/components/info-pills-strip"
import { MarqueeStrip } from "@/components/marquee-strip"
import { WhatIsThisSection } from "@/components/what-is-this-section"
import { WhatHappensSection } from "@/components/what-happens-section"
import { SafeSpaceSection } from "@/components/safe-space-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { HowItFeelsSection } from "@/components/how-it-feels-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TrustSafetySection } from "@/components/trust-safety-section"
import { UnfilteredWallSection } from "@/components/unfiltered-wall-section"
import { ReflectionsCtaSection } from "@/components/reflections-cta-section"
import { VoicesPreviewSection } from "@/components/voices-preview-section"
import { PeopleSection } from "@/components/people-section"
import { BehindTheScenesSection } from "@/components/behind-the-scenes-section"
import { FAQHomeSection } from "@/components/faq-home-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F4EE]">
      <Navbar />
      <HeroSection />
      <InfoPillsStrip />
      <MarqueeStrip />
      
      {/* 1. Introduction & Concept */}
      <WhatIsThisSection />
      <WhatHappensSection />
      
      {/* 2. Safe Space & Practical Details */}
      <SafeSpaceSection />
      <HowItWorksSection />
      
      {/* 3. Experience & Social Proof */}
      <HowItFeelsSection />
      <TestimonialsSection />
      <TrustSafetySection />
      <UnfilteredWallSection />
      <ReflectionsCtaSection />
      <VoicesPreviewSection />
      
      {/* 4. Behind the Scenes & Community */}
      <PeopleSection />
      <BehindTheScenesSection />
      <FAQHomeSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
