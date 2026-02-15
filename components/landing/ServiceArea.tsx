import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { locations } from '@/data/locations';

export function ServiceArea() {
  return (
    <section className="py-24 bg-dark-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4">
            Service Area
          </h2>
          <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full opacity-70 mb-6"></div>
          <p className="text-zinc-400 font-light max-w-2xl mx-auto">
            Proudly servicing the Northern Rivers region, including Lismore and surrounding areas.
          </p>
        </div>
        
        {/* Location Cards Grid */}
        <div className="reveal delay-100 mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            Towns &amp; Cities We Service
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/services/${location.slug}`}
                className="group p-5 rounded-xl glass-card hover:border-brand-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-lg font-semibold text-white group-hover:text-brand-400 transition-colors">
                        {location.name}
                      </h4>
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-brand-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">{location.tagline}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden glass-card reveal delay-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93512.29538984869!2d153.18832604779582!3d-28.81351056715344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b906fe55b5e2e01%3A0x500ef8684799a00!2sLismore%20NSW%202480!5e0!3m2!1sen!2sau!4v1699000000000!5m2!1sen!2sau&q=Lismore+Northern+Rivers"
            width="100%" 
            height="500" 
            style={{ border: 0 }} 
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[400px] md:h-[500px]"
            title="Local Auto Glass service area map - Northern Rivers region centered on Lismore, NSW"
          />
        </div>
      </div>
    </section>
  );
}
