import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MarqueeStrip } from "@/components/marquee-strip"
import { WhatHappensSection } from "@/components/what-happens-section"
import { WhatIsThisSection } from "@/components/what-is-this-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TrustSafetySection } from "@/components/trust-safety-section"
import { HowItFeelsSection } from "@/components/how-it-feels-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { UnfilteredWallSection } from "@/components/unfiltered-wall-section"
import { VoicesPreviewSection } from "@/components/voices-preview-section"
import { PeopleSection } from "@/components/people-section"
import { SafeSpaceSection } from "@/components/safe-space-section"
import { BehindTheScenesSection } from "@/components/behind-the-scenes-section"
import { FAQHomeSection } from "@/components/faq-home-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F4EE]">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <WhatHappensSection />
      <WhatIsThisSection />
      <HowItWorksSection />
      <TrustSafetySection />
      <HowItFeelsSection />
      <TestimonialsSection />
      <UnfilteredWallSection />
      <VoicesPreviewSection />
      <PeopleSection />
      <SafeSpaceSection />
      <BehindTheScenesSection />
      <FAQHomeSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
