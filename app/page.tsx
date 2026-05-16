import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MarqueeStrip } from "@/components/marquee-strip"
import { WhatIsThisSection } from "@/components/what-is-this-section"
import { HowItFeelsSection } from "@/components/how-it-feels-section"
import { UnfilteredWallSection } from "@/components/unfiltered-wall-section"
import { ThreeColumnSection } from "@/components/three-column-section"
import { PeopleSection } from "@/components/people-section"
import { SafeSpaceSection } from "@/components/safe-space-section"
import { BehindTheScenesSection } from "@/components/behind-the-scenes-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { JoinBannerSection } from "@/components/join-banner-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F4EE]">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <WhatIsThisSection />
      <HowItFeelsSection />
      <UnfilteredWallSection />
      <ThreeColumnSection />
      <PeopleSection />
      <SafeSpaceSection />
      <BehindTheScenesSection />
      <FinalCTASection />
      <JoinBannerSection />
      <Footer />
    </main>
  )
}
