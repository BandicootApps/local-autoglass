'use client';

import { useEffect, useState, useRef } from 'react';

export function StatsBar() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const counters = document.querySelectorAll('[data-target]');
    counters.forEach((counter) => {
      const target = +(counter as HTMLElement).getAttribute('data-target')!;
      const updateCount = () => {
        const current = +counter.textContent!.replace('+', '').replace('%', '');
        const speed = 200;
        const inc = target / speed;
        if (current < target) {
          counter.textContent = Math.ceil(current + inc).toString();
          setTimeout(updateCount, 20);
        } else {
          counter.textContent = target.toString();
        }
      };
      updateCount();
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-12 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm relative z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 reveal">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-4xl md:text-5xl font-semibold text-brand-500 tracking-tight tabular-nums" data-target="35">0</span>
            <span className="text-xs md:text-sm text-zinc-400 mt-2 uppercase tracking-wide">Years Experience +</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-4xl md:text-5xl font-semibold text-brand-500 tracking-tight tabular-nums" data-target="100">0</span>
            <span className="text-xs md:text-sm text-zinc-400 mt-2 uppercase tracking-wide">% Mobile Service</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-4xl md:text-5xl font-semibold text-brand-500 tracking-tight tabular-nums" data-target="15">0</span>
            <span className="text-xs md:text-sm text-zinc-400 mt-2 uppercase tracking-wide">Mins Install Time</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-4xl md:text-5xl font-semibold text-brand-500 tracking-tight tabular-nums" data-target="1">0</span>
            <span className="text-xs md:text-sm text-zinc-400 mt-2 uppercase tracking-wide">Local Family</span>
          </div>
        </div>
      </div>
    </section>
  );
}
