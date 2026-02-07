import { Star } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    {
      initials: "JS",
      name: "John S.",
      location: "Ballina",
      text: "Nigel was fantastic. Came out to the farm to fix the tractor glass. saved me hauling it into town. Highly recommend."
    },
    {
      initials: "EM",
      name: "Emily M.",
      location: "Lismore",
      text: "Fast, friendly and affordable. I called in the morning and my windscreen was replaced at my work by lunch."
    },
    {
      initials: "DK",
      name: "David K.",
      location: "Byron Bay",
      text: "Great price compared to the big chains. Local family business that actually cares about the job. Thanks guys!"
    }
  ];

  return (
    <section className="py-24 bg-dark-950 border-t border-white/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500/5 via-transparent to-transparent opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center reveal">
        <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4">
          Local Reviews
        </h2>
        <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full opacity-70 mb-6"></div>
        <p className="text-zinc-400 font-light max-w-2xl mx-auto">
          What our Northern Rivers customers say.
        </p>
      </div>

      <div className="relative w-full">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {reviews.map((review, index) => (
            <div key={index} className="w-full p-8 rounded-3xl liquid-card flex flex-col gap-5 group transition-transform duration-500 hover:scale-[1.02]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-red-900 p-[2px]">
                  <div className="w-full h-full bg-dark-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.initials}
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold">{review.name}</div>
                  <div className="text-xs text-brand-500 uppercase tracking-wide">{review.location}</div>
                </div>
              </div>
              <p className="text-zinc-300 font-light leading-relaxed italic">
                &quot;{review.text}&quot;
              </p>
              <div className="flex gap-1 text-brand-500 mt-auto">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
