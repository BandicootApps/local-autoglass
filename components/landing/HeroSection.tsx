import { Phone, ShieldCheck, MapPin } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://lh3.googleusercontent.com/sitesv/AAzXCkf_XatHtPzIEiM7b_z8slStl7sinEWjz4TCpXQNWuEtC3jJjDKPD8x0hYDO24PYj5dXuR1iOfsfsBec_1zv3TmKQ2Z831CPPlZ9lIalgmPC97VQip0XLdc7x80zL-k95seC9RnlYvTugxx-shW-CyimY8DLYCoPcLvSe8YnCTGXnTxmmMIYN_NfIdCdr2PvSsF9Bo6Pd3HPOutIYtpV7h41Z-Q8AZzvoseEv7M=w1280"
        >
          <source src="/local-autoglass-mobile-windscreen-replacement-northern-rivers.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/80 to-dark-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-dark-950/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 w-full">
        <div className="max-w-3xl pt-10 flex flex-col items-center text-center md:block md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
            Servicing the Northern Rivers &amp; Surrounding Areas
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.1] mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            Mobile Windscreen Replacement <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-red-500 to-red-700">
              We Come to You!
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-8 max-w-xl opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
            Best price. Best service. Professional mobile windscreen replacement for cars, utes, trucks, tractors, and heavy machinery. No need to leave home — we bring the workshop to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
            <a href="tel:0466140195" className="inline-flex justify-center items-center gap-3 bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-lg text-base font-semibold transition-all transform hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/30 group">
              <span>Call Nigel for a Free Quote</span>
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] justify-center md:justify-start">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-500/30 transition-colors">
                <ShieldCheck className="w-5 h-5 text-brand-400" />
              </div>
              <span className="text-sm font-medium text-zinc-300">
                Lifetime<br />Guarantee
              </span>
            </div>
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-500/30 transition-colors">
                <MapPin className="w-5 h-5 text-brand-400" />
              </div>
              <span className="text-sm font-medium text-zinc-300">
                Locally Owned<br />&amp; Operated
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
