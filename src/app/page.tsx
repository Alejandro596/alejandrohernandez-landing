import Effects from "@/components/Effects";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Results from "@/components/Results";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Effects />
      <Nav />
      <Hero />
      <TrustStrip />
      <Problem />
      <Services />
      <Process />
      <Results />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
