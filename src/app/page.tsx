import Effects from "@/components/Effects";
import ScrollIntro from "@/components/intro/ScrollIntro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import MobileWhatsApp from "@/components/MobileWhatsApp";

export default function Home() {
  return (
    <main className="flex-1">
      <ScrollIntro />
      <Effects />
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Comparison />
      <FinalCta />
      <Footer />
      <MobileWhatsApp />
    </main>
  );
}
