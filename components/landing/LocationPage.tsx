'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, Users, ArrowRight, ChevronDown, Shield, Wrench } from 'lucide-react';
import { Location, getLocationBySlug } from '@/data/locations';
import { NavigationClient } from '@/components/landing/NavigationClient';
import { Footer } from '@/components/landing/Footer';
import { ScrollReveal } from '@/components/landing/ScrollReveal';

interface LocationPageProps {
  location: Location;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-lg font-medium text-white pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-zinc-400 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-6 pb-6 text-zinc-400 font-light leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function LocationPage({ location }: LocationPageProps) {
  const nearbyLocations = location.nearbyLocations
    .map((slug) => getLocationBySlug(slug))
    .filter((loc): loc is Location => loc !== undefined);

  return (
    <div className="bg-dark-950 text-zinc-300 font-sans selection:bg-brand-500 selection:text-white overflow-x-hidden">
      <NavigationClient />
      <ScrollReveal>
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 bg-dark-950 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="reveal">
                <div className="flex items-center gap-2 text-brand-500 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wide">
                    {location.region}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-6">
                  Mobile Windscreen Replacement in {location.name}
                </h1>
                <p className="text-xl text-zinc-400 font-light max-w-3xl mb-8">
                  {location.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:0466140195"
                    className="inline-flex items-center gap-3 bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg shadow-brand-500/20 transform hover:-translate-y-1"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call 0466 140 195</span>
                  </a>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all"
                  >
                    View All Services
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Location Details */}
          <section className="py-16 bg-dark-900 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
                <div className="flex items-center gap-4 p-6 rounded-xl glass-card">
                  <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-brand-500" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 uppercase tracking-wide">Distance</p>
                    <p className="text-lg text-white font-medium">{location.distanceFromBase}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-xl glass-card">
                  <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-brand-500" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 uppercase tracking-wide">Population</p>
                    <p className="text-lg text-white font-medium">{location.population}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-xl glass-card">
                  <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-brand-500" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 uppercase tracking-wide">Service</p>
                    <p className="text-lg text-white font-medium">Same Day Available</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-24 bg-dark-950">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center reveal">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-6">
                    Why Choose Us in {location.name}?
                  </h2>
                  <p className="text-zinc-400 font-light leading-relaxed text-lg mb-8">
                    {location.whyChooseUs}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                      <Shield className="w-4 h-4 text-brand-500" />
                      <span className="text-sm text-zinc-300">35+ Years Experience</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                      <Wrench className="w-4 h-4 text-brand-500" />
                      <span className="text-sm text-zinc-300">100% Mobile Service</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                      <Clock className="w-4 h-4 text-brand-500" />
                      <span className="text-sm text-zinc-300">15 Min Install</span>
                    </div>
                  </div>
                </div>
                {/* Suburbs List */}
                <div className="p-8 rounded-2xl glass-card">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Areas We Cover in {location.name}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6">
                    We come to you in all of these suburbs and surrounding areas
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {location.suburbs.map((suburb) => (
                      <div key={suburb} className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm">{suburb}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section with unique descriptions */}
          <section className="py-24 bg-dark-900 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-16 reveal">
                <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4">
                  Our Services in {location.name}
                </h2>
                <p className="text-lg text-zinc-400 font-light">
                  Professional mobile windscreen replacement — we come to you anywhere in {location.name}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Card 1 - Cars & Utes */}
                <div className="group rounded-2xl overflow-hidden glass-card transition-all duration-500 reveal">
                  <div className="aspect-[16/10] bg-zinc-800 relative overflow-hidden">
                    <Image
                      src="/Our Services Images/local-autoglass-car-ute-windscreen-replacement.jpg"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={`Car windscreen replacement in ${location.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-60 pointer-events-none" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-white mb-3">Cars &amp; Utes</h3>
                    <p className="text-zinc-400 font-light leading-relaxed">
                      {location.services.carsUtes}
                    </p>
                  </div>
                </div>
                {/* Card 2 - Trucks & Heavy Machinery */}
                <div className="group rounded-2xl overflow-hidden glass-card transition-all duration-500 reveal delay-100 border-brand-500/30">
                  <div className="aspect-[16/10] bg-zinc-800 relative overflow-hidden">
                    <Image
                      src="/Our Services Images/local-autoglass-truck-heavy-machinery-windscreen-replacement.jpg"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={`Truck windscreen replacement in ${location.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent opacity-60 pointer-events-none" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-white mb-3">Trucks &amp; Heavy Machinery</h3>
                    <p className="text-zinc-400 font-light leading-relaxed">
                      {location.services.trucksHeavy}
                    </p>
                  </div>
                </div>
                {/* Card 3 - ADAS */}
                <div className="group rounded-2xl overflow-hidden glass-card transition-all duration-500 reveal delay-200">
                  <div className="aspect-[16/10] bg-zinc-800 relative overflow-hidden">
                    <Image
                      src="/Our Services Images/local-autoglass-adas-calibration-after-windscreen-replacement.jpg"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={`ADAS calibration service in ${location.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-60 pointer-events-none" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-white mb-3">ADAS Calibration</h3>
                    <p className="text-zinc-400 font-light leading-relaxed">
                      {location.services.adas}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          {location.faqs.length > 0 && (
            <section className="py-24 bg-dark-950">
              <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-12 reveal">
                  <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4">
                    {location.name} Windscreen Replacement FAQ
                  </h2>
                  <p className="text-zinc-400 font-light">
                    Common questions about our mobile windscreen service in {location.name}
                  </p>
                </div>
                <div className="space-y-3 reveal">
                  {location.faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Nearby Locations */}
          {nearbyLocations.length > 0 && (
            <section className="py-20 bg-dark-900 border-t border-white/5">
              <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 reveal">
                  <h2 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight mb-4">
                    Also Servicing Nearby Areas
                  </h2>
                  <p className="text-zinc-400 font-light">
                    We provide mobile windscreen replacement across the entire Northern Rivers region
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
                  {nearbyLocations.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/services/${loc.slug}`}
                      className="group p-6 rounded-xl glass-card hover:border-brand-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-brand-400 transition-colors">
                            {loc.name}
                          </h3>
                          <p className="text-sm text-zinc-400 mt-1">{loc.distanceFromBase}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="relative py-32 bg-zinc-900 overflow-hidden">
            <div className="absolute inset-0">
                <Image
                  src="/Background-Image.webp"
                  className="object-cover opacity-30 grayscale"
                  alt={`Windscreen replacement service in ${location.name}`}
                  fill
                  priority
                  sizes="100vw"
                />
              <div className="absolute inset-0 bg-dark-950/80" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center px-6 reveal">
              <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
                Book Your {location.name} Windscreen Replacement
              </h2>
              <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light">
                Call Nigel Swift today on <span className="text-white">0466 140 195</span> for a free quote. We come to you anywhere in {location.name}.
              </p>
              <a
                href="tel:0466140195"
                className="inline-flex items-center gap-3 bg-brand-500 hover:bg-brand-600 text-white px-10 py-5 rounded-lg text-lg font-bold transition-all shadow-xl shadow-brand-500/20 transform hover:-translate-y-1"
              >
                <span>Call Now</span>
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </ScrollReveal>
    </div>
  );
}
