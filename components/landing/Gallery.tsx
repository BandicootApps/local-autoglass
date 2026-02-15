'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface GalleryImage {
  id: string;
  image_url: string;
}

// Grid span patterns for visual variety
const spanPatterns = [
  "md:col-span-2 md:row-span-2", // Large featured
  "",                              // Normal
  "",                              // Normal
  "md:col-span-2",                // Wide
];

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const supabase = createClient();
      
      // Fetch images from active gallery jobs only
      const { data: jobs } = await supabase
        .from('gallery_jobs')
        .select('id')
        .eq('active', true);
      
      if (!jobs || jobs.length === 0) {
        setIsLoading(false);
        return;
      }

      const jobIds = jobs.map(j => j.id);

      // Fetch all images from active jobs
      const { data: allImages } = await supabase
        .from('gallery_images')
        .select('id, image_url')
        .in('job_id', jobIds);

      if (allImages && allImages.length > 0) {
        // Shuffle and pick random images (up to 4 for the grid)
        const shuffled = [...allImages].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 4);
        setImages(selected);
      }

      setIsLoading(false);
    };

    fetchImages();
  }, []);

  // Fallback images if no images in database
  const fallbackImages = [
    { id: '1', image_url: "https://lh3.googleusercontent.com/sitesv/AAzXCkddthBGWfMFjh1jD6DxR7hAblPBaNyjOF35I1EWLVek4rhbflSbKFmD56T08i9LkNsP9FwiY2LfVmyMqqGgxUV-zGOk8ZC6fe2ovI9e6CyBW6qRwoFvJurpgpOlza8dH2Csa2z_sMrXDrKUP8ZtbQSBrTKYT1SNkKVJMlkBfdOdxFsmCT0PsjJQBaxL4QljHktWm2-uoF-AFLbD5OUZ65L3pOACynrNPU1SvCM=w1280" },
    { id: '2', image_url: "https://lh3.googleusercontent.com/sitesv/AAzXCke1TIpA39YtcicQ36JdxpbofWNMXKQvN9jD2rvbQLue0CR0-QZfO4h6_sRa2HYZ8h5CaW7t0kuVqwOu9rYEkbzIOhG94QKe7EN8xYh5KcuEOtdxTHEKyKmSBW9F2_pTXbpf1aVYOA4NtEOrbZR7NEKjOoKK_sBsWK5uKix8aYxoqBjt2yYEXy9LU1CAK7GbXzQ2EowPdHdNvt_7txAvzzYRJ0ljwqf8MINUBtA=w1280" },
    { id: '3', image_url: "https://lh3.googleusercontent.com/sitesv/AAzXCkdwV_T098iKcWLBalxUSGDkyUTZS0xOIeQ4GzeKbZFAf-e1432G7AqzhJ9Ih5IpWLxd5KwU3B9KQPm-q5JFgVKYn_0UcoKNfLbUEbc_pd8blsxfBDMOE8nNpkPFL2d1HRYGD9-sHvytG9AE9oUtWtWYCayU8479HwntdPVk-5Fpf2ELYBsiOOZU4kqVIjQvchCoobfPc9wtaf_et7_lkNRB_YgefP-AjdQS=w1280" },
    { id: '4', image_url: "https://lh3.googleusercontent.com/sitesv/AAzXCke2RPLjl6wBK2urphSyrR6GantS9NF2KDHoR0ug5ynG8a4jN6I_wDV2859Bb5xPidieTFoG1wPpoHEHfKlzjjZgZGZZc366oWOqPQeY9u7LSGw31cWCCLILRKHs7zW4_rq5cOr9SBso9Pm787CagNvaVVmY0OIfXjwr-G6AuKNr8iRVtaWINyg-li5SqDGmc22HoUtwcFS4gW6MTuPhj3IgZtMh3ckJBi_xlG0=w1280" },
  ];

  const displayImages = images.length > 0 ? images : fallbackImages;

  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4">
            Recent Work
          </h2>
          <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full opacity-70"></div>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
            Take a look at some of our recent windscreen replacements and repairs.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] reveal delay-100 mb-12">
          {isLoading ? (
            // Skeleton loading state
            <>
              {[0, 1, 2, 3].map((index) => (
                <div 
                  key={index} 
                  className={`rounded-xl overflow-hidden glass-card relative bg-white/5 animate-pulse ${spanPatterns[index]}`}
                />
              ))}
            </>
          ) : (
            displayImages.map((image, index) => (
              <div 
                key={image.id} 
                className={`rounded-xl overflow-hidden glass-card relative group ${spanPatterns[index] || ''}`}
              >
                <Image 
                  src={image.image_url} 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={`Local AutoGlass windscreen replacement - Gallery image ${index + 1}`}
                  fill
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))
          )}
        </div>

        <div className="text-center reveal delay-200">
          <Link 
            href="/photos" 
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium transition-all hover:scale-105 border border-white/10"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
