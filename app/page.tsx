import AppsSection from "@/components/main/AppsSection";
import HeroSection from "@/components/main/HeroSection";
import TechnologiesSection from "@/components/main/TechnologiesSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="space-y-40 mb-40">
      <HeroSection />
      <TechnologiesSection />
      <AppsSection />
    </main>
  );
}
