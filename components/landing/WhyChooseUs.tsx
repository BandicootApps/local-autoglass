import { Heart, Route, CheckCircle } from 'lucide-react';

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-dark-950 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4">
            Why Choose Local AutoGlass?
          </h2>
          <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full opacity-70"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl glass-card transition-all duration-500 group reveal delay-100 flex flex-col items-center text-center md:items-start md:text-left">
            <div className="w-14 h-14 bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:shadow-lg group-hover:shadow-brand-500/10 transition-all">
              <Heart className="w-8 h-8 text-white group-hover:text-brand-400 transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Family Owned &amp; Operated</h3>
            <p className="text-zinc-400 leading-relaxed font-light">
              We&apos;re a local Northern Rivers family business, not a franchise or call centre. When you ring us, you&apos;re speaking directly with the person who&apos;ll be fitting your windscreen. We take pride in looking after our community and keeping our neighbours safe on the road.
            </p>
          </div>
          <div className="p-8 rounded-2xl glass-card transition-all duration-500 group reveal delay-200 flex flex-col items-center text-center md:items-start md:text-left">
            <div className="w-14 h-14 bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:shadow-lg group-hover:shadow-brand-500/10 transition-all">
              <Route className="w-8 h-8 text-white group-hover:text-brand-400 transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Fully Mobile Service</h3>
            <p className="text-zinc-400 leading-relaxed font-light">
              No need to drive anywhere or rearrange your day. Whether you&apos;re at home, on the farm, at a job site, or stuck on the roadside, we come to you with a fully equipped service vehicle ready to get the job done on the spot.
            </p>
          </div>
          <div className="p-8 rounded-2xl glass-card transition-all duration-500 group reveal delay-300 flex flex-col items-center text-center md:items-start md:text-left">
            <div className="w-14 h-14 bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:shadow-lg group-hover:shadow-brand-500/10 transition-all">
              <CheckCircle className="w-8 h-8 text-white group-hover:text-brand-400 transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">20+ Years Experience</h3>
            <p className="text-zinc-400 leading-relaxed font-light">
              Fully qualified, licensed (MVRL63433), and insured. With over two decades in the trade, you can trust that every replacement is done right the first time — backed by our workmanship guarantee for complete peace of mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
