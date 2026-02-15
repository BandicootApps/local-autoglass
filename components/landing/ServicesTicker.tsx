import { Star } from 'lucide-react';

export function ServicesTicker() {
  return (
    <section className="py-10 bg-black/20 backdrop-blur-md border-b border-white/5 overflow-hidden z-20 relative">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center reveal">
        <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
          Vehicles We Service
        </span>
      </div>
      <div className="relative flex overflow-hidden mask-linear-fade">
        <div className="flex items-center gap-16 animate-[scrollInfinite_30s_linear_infinite] whitespace-nowrap px-8">
          <span className="text-xl font-bold text-white/80 font-display opacity-50 hover:opacity-100 transition-opacity">CARS &amp; UTES</span>
          <Star className="w-4 h-4 text-brand-500/50" />
          <span className="text-xl font-bold text-white/80 font-display opacity-50 hover:opacity-100 transition-opacity">TRUCKS</span>
          <Star className="w-4 h-4 text-brand-500/50" />
          <span className="text-xl font-bold text-white/80 font-display opacity-50 hover:opacity-100 transition-opacity">TRACTORS</span>
          <Star className="w-4 h-4 text-brand-500/50" />
          <span className="text-xl font-bold text-white/80 font-display opacity-50 hover:opacity-100 transition-opacity">HEAVY MACHINERY</span>
          <Star className="w-4 h-4 text-brand-500/50" />
          <span className="text-xl font-bold text-white/80 font-display opacity-50 hover:opacity-100 transition-opacity">VINTAGE &amp; CLASSIC CARS</span>
          <Star className="w-4 h-4 text-brand-500/50" />
          <span className="text-xl font-bold text-white/80 font-display opacity-50 hover:opacity-100 transition-opacity">ADAS CALIBRATION</span>
          {/* Duplicate for loop */}
          <Star className="w-4 h-4 text-brand-500/50" />
          <span className="text-xl font-bold text-white/80 font-display opacity-50 hover:opacity-100 transition-opacity">CARS &amp; UTES</span>
          <Star className="w-4 h-4 text-brand-500/50" />
          <span className="text-xl font-bold text-white/80 font-display opacity-50 hover:opacity-100 transition-opacity">TRUCKS</span>
          <Star className="w-4 h-4 text-brand-500/50" />
          <span className="text-xl font-bold text-white/80 font-display opacity-50 hover:opacity-100 transition-opacity">TRACTORS</span>
          <Star className="w-4 h-4 text-brand-500/50" />
          <span className="text-xl font-bold text-white/80 font-display opacity-50 hover:opacity-100 transition-opacity">HEAVY MACHINERY</span>
        </div>
      </div>
    </section>
  );
}
