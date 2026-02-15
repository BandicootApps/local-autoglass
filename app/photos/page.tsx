import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { GalleryPageLayout } from '@/components/landing/GalleryPageLayout';
import { PhotosGrid, type Photo } from '@/components/landing/PhotosGrid';
import { Images } from 'lucide-react';

export const metadata = {
  title: 'Gallery | Local Auto Glass',
  description: 'Browse our complete photo gallery of windscreen replacements and auto glass repairs.',
  openGraph: {
    title: 'Gallery | Local Auto Glass',
    description: 'Browse our complete photo gallery of windscreen replacements and auto glass repairs.',
    url: 'https://localautoglass.com.au/photos',
  },
  alternates: {
    canonical: 'https://localautoglass.com.au/photos',
  },
};

async function PhotosContent() {
  const supabase = await createClient();

  // Fetch ALL images directly - no join needed
  const { data: images, error } = await supabase
    .from('gallery_images')
    .select('id, image_url, alt_text, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching photos:', error);
    return (
      <div className="text-center py-20">
        <p className="text-red-400">Failed to load photos. Please try again later.</p>
      </div>
    );
  }

  const photos: Photo[] = (images || []).map((img: any) => ({
    id: img.id,
    url: img.image_url,
    alt: img.alt_text || 'Gallery image',
    createdAt: img.created_at,
  }));

  return <PhotosGrid photos={photos} />;
}

function PhotosSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="aspect-[4/3] rounded-2xl bg-dark-900/50 border border-white/5 animate-pulse">
          <div className="w-full h-full bg-white/5" />
        </div>
      ))}
    </div>
  );
}

export default function PhotosPage() {
  return (
    <GalleryPageLayout>
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">All Photos</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          A complete collection of our work, from windshield replacements to side glass repairs.
        </p>
      </div>
      
      <Suspense fallback={<PhotosSkeleton />}>
        <PhotosContent />
      </Suspense>
    </GalleryPageLayout>
  );
}
