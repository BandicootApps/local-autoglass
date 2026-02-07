import { Phone, ClipboardCheck, Truck } from 'lucide-react';

export function HowItWorks() {
  return (
    <section className="py-24 bg-dark-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <span className="text-brand-500 font-medium tracking-wide text-xs uppercase mb-3 block">How It Works</span>
          <h2 className="text-3xl lg:text-5xl font-semibold text-white tracking-tight mb-6">
            Back on the Road in 3 Easy Steps
          </h2>
        </div>
        <div className="relative grid md:grid-cols-3 gap-12">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 -z-10"></div>
          
          <div className="relative text-center reveal group">
            <div className="w-24 h-24 mx-auto bg-dark-950 border border-zinc-800 rounded-full flex items-center justify-center mb-8 shadow-2xl z-10 relative group-hover:border-brand-500/50 transition-colors duration-500">
              <Phone className="w-10 h-10 text-white group-hover:text-brand-400 transition-colors" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Give Nigel a Call</h3>
            <p className="text-zinc-400 max-w-xs mx-auto font-light">
              Ring us on <span className="text-white font-medium">0466 140 195</span> and let us know about your vehicle and the damage. No automated systems, no hold music — just a real conversation with someone who knows glass.
            </p>
          </div>

          <div className="relative text-center reveal delay-100 group">
            <div className="w-24 h-24 mx-auto bg-dark-950 border border-zinc-800 rounded-full flex items-center justify-center mb-8 shadow-2xl z-10 relative group-hover:border-brand-500/50 transition-colors duration-500">
              <ClipboardCheck className="w-10 h-10 text-white group-hover:text-brand-400 transition-colors" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Get a Free Quote</h3>
            <p className="text-zinc-400 max-w-xs mx-auto font-light">
              We&apos;ll confirm the details and provide a no-obligation quote on the spot. No hidden fees, no surprises — just honest, upfront pricing.
            </p>
          </div>

          <div className="relative text-center reveal delay-200 group">
            <div className="w-24 h-24 mx-auto bg-dark-950 border border-zinc-800 rounded-full flex items-center justify-center mb-8 shadow-2xl z-10 relative group-hover:border-brand-500/50 transition-colors duration-500">
              <Truck className="w-10 h-10 text-white group-hover:text-brand-400 transition-colors" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">We Come to You</h3>
            <p className="text-zinc-400 max-w-xs mx-auto font-light">
              We arrive at your home, workplace, or wherever your vehicle is, replace the windscreen, and have you back on the road safely — usually within a couple of hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
