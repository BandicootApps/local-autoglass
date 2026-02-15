import { NavigationClient } from '@/components/landing/NavigationClient';
import { Footer } from '@/components/landing/Footer';
import { ScrollReveal } from '@/components/landing/ScrollReveal';

interface FAQPageLayoutProps {
  children: React.ReactNode;
}

export function FAQPageLayout({ children }: FAQPageLayoutProps) {
  return (
    <div className="bg-dark-950 text-zinc-300 font-sans selection:bg-brand-500 selection:text-white overflow-x-hidden min-h-screen flex flex-col">
      <NavigationClient />
      <ScrollReveal>
        <main className="flex-grow pt-32 pb-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-6 mb-16 text-center reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-400 mx-auto">
                <span>Support</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-zinc-400 font-light max-w-2xl mx-auto">
                Find answers to common questions about our windscreen replacement services, pricing, and warranty.
              </p>
            </div>

            <div className="bg-dark-900/50 rounded-3xl border border-white/5 p-6 md:p-8 reveal delay-100">
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </ScrollReveal>
    </div>
  );
}
