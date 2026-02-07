import Image from 'next/image';
import { Car, Truck, Cpu, CheckCircle, Phone } from 'lucide-react';

export function ServicesList() {
  return (
    <div className="space-y-24">
      {/* Service 1: Cars & Utes - Full Width Hero Style */}
      <div className="reveal">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold uppercase tracking-wider text-brand-400 mb-6">
              <Car className="w-3.5 h-3.5" />
              <span>Most Popular</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
              Cars &amp; Utes
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed mb-8">
              We replace windscreens on all makes and models — Toyota, Ford, Mazda, Holden, Hyundai, Kia, and more. Our mobile service comes to your home or workplace, with most jobs done in under two hours using Australian Standard certified glass.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">All Makes &amp; Models</h4>
                  <p className="text-zinc-500 text-sm font-light">No matter the brand or year.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Certified Glass</h4>
                  <p className="text-zinc-500 text-sm font-light">Meets Australian Standards and OEM specs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Fast Turnaround</h4>
                  <p className="text-zinc-500 text-sm font-light">Done in one to two hours at your location.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image 
                src="/Our Services Images/local-autoglass-car-ute-windscreen-replacement.jpg" 
                className="object-cover" 
                alt="Local AutoGlass technician replacing a car windscreen on-site"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Service 2: Trucks & Heavy Machinery - Reversed Layout */}
      <div className="reveal">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image 
                src="/Our Services Images/local-autoglass-truck-heavy-machinery-windscreen-replacement.jpg" 
                className="object-cover" 
                alt="Local AutoGlass replacing a windscreen on a heavy vehicle at a work site"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent"></div>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">
              <Truck className="w-3.5 h-3.5" />
              <span>Commercial &amp; Industrial</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
              Trucks, Tractors &amp; Heavy Machinery
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed mb-8">
              When your gear is off the job, it's costing you money. We provide on-site windscreen replacement at your depot, farm, or construction site — and we work around your schedule, including early starts and weekends.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">On-Site Service</h4>
                  <p className="text-zinc-500 text-sm font-light">No need to transport heavy equipment.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Flexible Scheduling</h4>
                  <p className="text-zinc-500 text-sm font-light">Before hours, after hours, or weekends.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Wide Vehicle Range</h4>
                  <p className="text-zinc-500 text-sm font-light">Trucks, buses, tractors, excavators, forklifts, and more.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Service 3: ADAS Calibration - Full Width Hero Style */}
      <div className="reveal">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">
              <Cpu className="w-3.5 h-3.5" />
              <span>Advanced Technology</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
              ADAS Windscreen Calibration
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed mb-8">
              Many modern vehicles have cameras and sensors behind the windscreen that control safety features like lane departure warning and automatic emergency braking. After a replacement, these systems need professional recalibration — which we handle on the spot with manufacturer-approved equipment.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Safety Critical</h4>
                  <p className="text-zinc-500 text-sm font-light">Braking, lane keeping, and cruise control all rely on accurate calibration.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Professional Equipment</h4>
                  <p className="text-zinc-500 text-sm font-light">Industry-approved tools meeting manufacturer standards.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">No Surprises</h4>
                  <p className="text-zinc-500 text-sm font-light">If calibration is needed, we'll include it in your quote upfront.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image 
                src="/Our Services Images/local-autoglass-adas-calibration-after-windscreen-replacement.jpg" 
                className="object-cover" 
                alt="Local AutoGlass technician performing ADAS calibration after a windscreen replacement"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="reveal">
        <div className="relative rounded-3xl overflow-hidden py-16 px-8 md:px-16">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-800"></div>
          <div className="absolute inset-0 bg-[url('/local-autoglass-mobile-windscreen-repair-technicians.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
              Ready for a Clear View?
            </h2>
            <p className="text-lg text-white/80 font-light max-w-2xl mx-auto mb-8">
              Call Nigel Swift today for a free, no-obligation quote. We'll come to you anywhere in the Northern Rivers region.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:0466140195" className="inline-flex items-center gap-3 bg-white hover:bg-zinc-100 text-brand-600 px-8 py-4 rounded-lg text-lg font-bold transition-all shadow-xl transform hover:-translate-y-0.5">
                <Phone className="w-5 h-5" />
                <span>0466 140 195</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
