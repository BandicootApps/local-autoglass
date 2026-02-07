import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { GalleryPageLayout } from '@/components/landing/GalleryPageLayout';
import { PublicGalleryList } from '@/components/landing/PublicGalleryList';
import { type GalleryJob } from '@/components/dashboard/GalleryTable';

export const metadata = {
  title: 'Our Recent Work',
  description: 'View our portfolio of windscreen replacements across the Northern Rivers. See the quality workmanship from Local Auto Glass.',
  openGraph: {
    title: 'Our Recent Work | Local Auto Glass',
    description: 'Browse through our gallery of windscreen replacements and repairs across the Northern Rivers region.',
    url: 'https://localautoglass.com.au/gallery',
  },
  alternates: {
    canonical: 'https://localautoglass.com.au/gallery',
  },
};

async function GalleryContent() {
  const supabase = await createClient();

  const { data: jobs } = await supabase
    .from('gallery_jobs')
    .select(`
      *,
      gallery_images (
        id,
        job_id,
        image_url,
        image_order,
        created_at
      )
    `)
    .eq('active', true)
    .order('display_order', { ascending: true });

  return <PublicGalleryList jobs={(jobs as GalleryJob[]) || []} />;
}

function GallerySkeleton() {
  return (
    <div className="space-y-12">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-dark-900/30 rounded-3xl border border-white/5 p-8 md:p-10 space-y-8 animate-pulse">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="h-8 bg-white/5 rounded w-1/3"></div>
              <div className="h-6 bg-white/5 rounded w-32"></div>
            </div>
            <div className="h-6 bg-white/5 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-white/5 rounded w-full"></div>
              <div className="h-4 bg-white/5 rounded w-5/6"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="aspect-video bg-white/5 rounded-xl"></div>
            <div className="aspect-video bg-white/5 rounded-xl"></div>
            <div className="aspect-video bg-white/5 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GalleryPage() {
  return (
    <GalleryPageLayout>
      <Suspense fallback={<GallerySkeleton />}>
        <GalleryContent />
      </Suspense>
    </GalleryPageLayout>
  );
}
