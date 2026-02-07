import { NavigationClient } from '@/components/landing/NavigationClient';
import { Footer } from '@/components/landing/Footer';
import { ScrollReveal } from '@/components/landing/ScrollReveal';

interface ServicesPageLayoutProps {
  children: React.ReactNode;
}

export function ServicesPageLayout({ children }: ServicesPageLayoutProps) {
  return (
    <div className="bg-dark-950 text-zinc-300 font-sans selection:bg-brand-500 selection:text-white overflow-x-hidden min-h-screen flex flex-col">
      <NavigationClient />
      <ScrollReveal>
        <main className="flex-grow pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-6 mb-16 text-center reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-400 mx-auto">
                <span>Northern Rivers &amp; Surrounding Areas</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
                Our Services
              </h1>
              <p className="text-lg text-zinc-500 font-light max-w-2xl mx-auto">
                Professional, on-site windscreen replacement for cars, trucks, tractors, and heavy machinery. We come to you — no workshop visit needed.
              </p>
            </div>

            <div className="reveal delay-100">
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </ScrollReveal>
    </div>
  );
}
