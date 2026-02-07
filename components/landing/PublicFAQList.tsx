'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Search, Plus } from 'lucide-react';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  clicks: number;
  category?: string;
}

interface PublicFAQListProps {
  faqs: FAQItem[];
}

export function PublicFAQList({ faqs }: PublicFAQListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const supabase = createClient();

  const filteredFaqs = faqs.filter((faq) => {
    const query = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      (faq.category && faq.category.toLowerCase().includes(query))
    );
  });

  const toggleFAQ = async (index: number, faqId: string) => {
    const isOpening = activeIndex !== index;
    setActiveIndex(isOpening ? index : null);

    if (isOpening) {
      // Increment clicks in Supabase
      try {
        const { error } = await supabase.rpc('increment_faq_clicks', { faq_id: faqId });
        
        if (error) {
          // Fallback if RPC doesn't exist
           const { data } = await supabase
            .from('faqs')
            .select('clicks')
            .eq('id', faqId)
            .single();
            
            if (data) {
              await supabase
                .from('faqs')
                .update({ clicks: (data.clicks || 0) + 1 })
                .eq('id', faqId);
            }
        }
      } catch (err) {
        console.error('Error incrementing FAQ clicks:', err);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="relative max-w-lg mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-zinc-500" />
        </div>
        <input
          type="text"
          className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all"
          placeholder="Search for a question..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col border-t border-b border-white/5 divide-y divide-white/5">
        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center text-zinc-500">
            <p>No questions found matching your search.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className={`group cursor-pointer transition-colors duration-300 ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index, faq.id)}
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
  );
}
