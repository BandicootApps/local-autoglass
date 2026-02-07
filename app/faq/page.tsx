import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { FAQPageLayout } from '@/components/landing/FAQPageLayout';
import { PublicFAQList } from '@/components/landing/PublicFAQList';

export const metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about our windscreen replacement services, pricing, and warranty in the Northern Rivers region.',
  openGraph: {
    title: 'Frequently Asked Questions | Local Auto Glass',
    description: 'Find answers to common questions about our windscreen replacement services, pricing, and warranty.',
    url: 'https://localautoglass.com.au/faq',
  },
  alternates: {
    canonical: 'https://localautoglass.com.au/faq',
  },
};

// Generate FAQPage JSON-LD schema
function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

async function FAQContent() {
  const supabase = await createClient();

  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('active', true)
    .order('clicks', { ascending: false });

  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500">
        <p>No FAQs available at the moment.</p>
      </div>
    );
  }

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PublicFAQList faqs={faqs} />
    </>
  );
}

function FAQSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-b border-white/5 py-6">
          <div className="h-6 bg-white/5 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-white/5 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
}

export default function FAQPage() {
  return (
    <FAQPageLayout>
      <Suspense fallback={<FAQSkeleton />}>
        <FAQContent />
      </Suspense>
    </FAQPageLayout>
  );
}
