import Image from 'next/image';

export function ServicesGrid() {
  return (
    <section id="services" className="py-24 bg-dark-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 reveal">
          <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4">
            Our Services
          </h2>
          <p className="text-lg text-zinc-400 font-light">
            Expert Mobile Windscreen Replacement Across the Northern Rivers &amp; Surrounding Areas
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group rounded-2xl overflow-hidden glass-card transition-all duration-500 reveal">
            <div className="aspect-[16/10] bg-zinc-800 relative overflow-hidden">
              <Image 
                src="/Our Services Images/local-autoglass-car-ute-windscreen-replacement.jpg" 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Local AutoGlass technician replacing a car windscreen on-site"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-60 pointer-events-none"></div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-white mb-3">Cars &amp; Utes</h3>
              <p className="text-zinc-400 mb-8 font-light leading-relaxed">
                Whether it's a daily driver or your weekend ute, we provide fast, professional windscreen replacement for all makes and models. With mobile service that comes to your home or workplace, we'll have you back on the road with minimal disruption.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="group rounded-2xl overflow-hidden glass-card transition-all duration-500 reveal delay-100 border-brand-500/30">
            <div className="aspect-[16/10] bg-zinc-800 relative overflow-hidden">
              <Image 
                src="/Our Services Images/local-autoglass-truck-heavy-machinery-windscreen-replacement.jpg" 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Local AutoGlass replacing a windscreen on a heavy vehicle at a work site"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent opacity-60 pointer-events-none"></div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-white mb-3">Trucks &amp; Heavy Machinery</h3>
              <p className="text-zinc-400 mb-8 font-light leading-relaxed">
                From delivery trucks to tractors and earthmoving equipment, we carry out on-site windscreen replacements for heavy vehicles and machinery. We know downtime costs money, so we work around your schedule to get your fleet moving again fast.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="group rounded-2xl overflow-hidden glass-card transition-all duration-500 reveal delay-200">
            <div className="aspect-[16/10] bg-zinc-800 relative overflow-hidden">
              <Image 
                src="/Our Services Images/local-autoglass-adas-calibration-after-windscreen-replacement.jpg" 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Local AutoGlass technician performing ADAS calibration after a windscreen replacement"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-60 pointer-events-none"></div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-white mb-3">ADAS Calibration</h3>
              <p className="text-zinc-400 mb-8 font-light leading-relaxed">
              Many modern vehicles rely on forward-facing cameras mounted to the windscreen for safety features like lane departure warning and automatic emergency braking. After a replacement, these systems need to be professionally recalibrated to ensure they're accurate and road-ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
