'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  clicks: number;
}

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopFAQs = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('faqs')
        .select('id, question, answer, clicks')
        .eq('active', true)
        .order('clicks', { ascending: false })
        .limit(5);

      if (data) {
        setFaqs(data);
      }
      setIsLoading(false);
    };

    fetchTopFAQs();
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-dark-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        {/* LEFT: Content */}
        <div className="space-y-12 reveal">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <span>Support</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-zinc-500 font-light">
              Answers to common questions about your windscreen replacement.
            </p>
          </div>

          <div className="flex flex-col border-t border-b border-white/5 divide-y divide-white/5">
            {isLoading ? (
              // Loading skeleton
              [...Array(5)].map((_, index) => (
                <div key={index} className="py-6 animate-pulse">
                  <div className="h-6 bg-white/5 rounded w-3/4 mb-2"></div>
                </div>
              ))
            ) : faqs.length === 0 ? (
              // Empty state
              <div className="py-6 text-center text-zinc-500">
                <p>No FAQs available at the moment.</p>
              </div>
            ) : (
              // FAQ list
              faqs.map((faq, index) => (
                <div 
                  key={faq.id} 
                  className={`group cursor-pointer transition-colors duration-300 ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <button className="flex items-center justify-between w-full py-6 text-left focus:outline-none group">
                    <span className={`text-lg font-medium transition-colors duration-300 ${
                      activeIndex === index ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                      activeIndex === index 
                        ? 'bg-brand-500 text-white' 
                        : 'bg-white/5 group-hover:bg-white/10 text-zinc-500 group-hover:text-white'
                    }`}>
                      <Plus 
                        className={`w-5 h-5 transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : ''}`}
                      />
                    </div>
                  </button>
                  <div 
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: activeIndex === index ? '500px' : '0' }}
                  >
                    <div className="pb-6 text-zinc-500 font-light leading-relaxed pr-8 whitespace-pre-wrap">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="hidden lg:block relative w-full aspect-square reveal delay-200">
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/5">
            <Image 
              src="/local-autoglass-mobile-windscreen-repair-technicians.jpg" 
              alt="Local Autoglass Mobile Windscreen Repair Technicians" 
              className="object-cover"
              fill
              sizes="50vw"
            />
            {/* Subtle overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
