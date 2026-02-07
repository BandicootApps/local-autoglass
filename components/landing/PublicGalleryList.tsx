import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { type GalleryJob } from '@/components/dashboard/GalleryTable';

interface PublicGalleryListProps {
  jobs: GalleryJob[];
}

function GalleryItem({ job }: { job: GalleryJob }) {
  const images = job.gallery_images?.sort((a, b) => a.image_order - b.image_order) || [];

  return (
    <div className="bg-dark-900/30 rounded-3xl border border-white/5 overflow-hidden hover:border-white/10 transition-colors duration-500">
      <div className="p-8 md:p-10 space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-2xl font-semibold text-white tracking-tight">
              {job.header}
            </h3>
            <span className="text-sm font-medium text-zinc-500 bg-white/5 px-3 py-1 rounded-full border border-white/5 w-fit">
              {new Date(job.created_at).toLocaleDateString("en-AU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg text-brand-400 font-medium">
              {job.sub_header}
            </h4>
            {job.story && (
              <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap max-w-4xl">
                {job.story}
              </p>
            )}
          </div>
        </div>

        {images.length > 0 && (
          <div className={`grid grid-cols-1 ${images.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-4`}>
            {images.map((image, index) => (
              <div key={image.id} className="relative aspect-video rounded-xl overflow-hidden group bg-dark-950">
                <Image
                  src={image.image_url}
                  alt={`${job.header} - windscreen replacement image ${index + 1}`}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl group-hover:ring-white/20 transition-colors"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function PublicGalleryList({ jobs }: PublicGalleryListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
          <ImageIcon className="w-8 h-8 text-zinc-500" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Gallery Coming Soon</h3>
        <p className="text-zinc-500 max-w-md mx-auto">
          We are currently updating our gallery with our latest work. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {jobs.map((job) => (
        <GalleryItem key={job.id} job={job} />
      ))}
    </div>
  );
}
