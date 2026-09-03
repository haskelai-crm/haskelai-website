import Hero from "@/components/home/Hero";
import ValueStrip from "@/components/home/ValueStrip";
import Products from "@/components/home/Products";
import AISection from "@/components/home/AISection";
import Solutions from "@/components/home/Solutions";
import PlatformArchitecture from "@/components/home/PlatformArchitecture";
import WhyHaskelAI from "@/components/home/WhyHaskelAI";
import AboutPreview from "@/components/home/AboutPreview";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <ValueStrip />
      <Products />
      <AISection />
      <Solutions />
      <PlatformArchitecture />
      <WhyHaskelAI />
      <AboutPreview />
      <CTA />
    </main>
  );
}
