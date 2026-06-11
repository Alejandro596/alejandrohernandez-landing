import Effects from "@/components/Effects";
import PlaneLoop from "@/components/intro/PlaneLoop";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import VslCard from "@/components/VslCard";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import MobileWhatsApp from "@/components/MobileWhatsApp";

// En móvil el orden cambia (clases order-*): copy -> video -> avión.
// En desktop (md:order-none en cada sección) manda el orden del DOM: avión primero.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Effects />
      <Nav />
      <PlaneLoop />
      <Hero />
      {/* El video como sección propia, solo en teléfono, justo después del copy */}
      <section className="order-3 px-4 pb-16 md:hidden" aria-label="Video: mira cómo funciona">
        <div data-reveal className="mx-auto max-w-xl">
          <VslCard />
        </div>
      </section>
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
