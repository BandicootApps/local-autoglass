import { NavigationClient } from '@/components/landing/NavigationClient';
import { HeroSection } from '@/components/landing/HeroSection';
import { ServicesTicker } from '@/components/landing/ServicesTicker';
import { WhyChooseUs } from '@/components/landing/WhyChooseUs';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { ServicesGrid } from '@/components/landing/ServicesGrid';
import { StatsBar } from '@/components/landing/StatsBar';
import { Gallery } from '@/components/landing/Gallery';
import { FAQSection } from '@/components/landing/FAQSection';
import { Testimonials } from '@/components/landing/Testimonials';
import { ServiceArea } from '@/components/landing/ServiceArea';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';
import { ScrollReveal } from '@/components/landing/ScrollReveal';

export default function LandingPage() {
  return (
    <div className="bg-dark-950 text-zinc-300 font-sans selection:bg-brand-500 selection:text-white overflow-x-hidden">
      <NavigationClient />
      <ScrollReveal>
        <main>
          <HeroSection />
          <ServicesTicker />
          <WhyChooseUs />
          <HowItWorks />
          <ServicesGrid />
          <StatsBar />
          <Gallery />
          <FAQSection />
          <Testimonials />
          <ServiceArea />
          <FinalCTA />
        </main>
        <Footer />
      </ScrollReveal>
    </div>
  );
}
