import Image from 'next/image';
import { Phone } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative py-32 bg-zinc-900 overflow-hidden">
      <div className="absolute inset-0">
        <Image 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop" 
          className="object-cover opacity-30 grayscale" 
          alt="Car driving on road - windscreen replacement service"
          fill
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark-950/80"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 reveal">
        <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
          Ready for a Clear View?
        </h2>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light">
          Call Nigel Swift today on <span className="text-white">0466 140 195</span> for a free no obligation quote.
        </p>
        <a href="tel:0466140195" className="inline-flex items-center gap-3 bg-brand-500 hover:bg-brand-600 text-white px-10 py-5 rounded-lg text-lg font-bold transition-all shadow-xl shadow-brand-500/20 transform hover:-translate-y-1">
          <span>Call Now</span>
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
