import CTAsection from "@/components/sections/CTAsection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HeroSection from "@/components/sections/HeroSection";
import NameSection from "@/components/sections/NameSection";
export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HeroSection />
      <FeaturesSection/>
      <NameSection/>
      <CTAsection/>
    </main>
  );
}
