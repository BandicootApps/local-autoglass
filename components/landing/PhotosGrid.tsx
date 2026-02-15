"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export interface Photo {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  category?: string;
  createdAt: string;
}

interface PhotosGridProps {
  photos: Photo[];
}

export function PhotosGrid({ photos }: PhotosGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  if (photos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
          <Search className="w-8 h-8 text-zinc-500" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">No Photos Yet</h3>
        <p className="text-zinc-500 max-w-md mx-auto">
          We are currently updating our gallery. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] [grid-auto-flow:dense]">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`group relative rounded-2xl overflow-hidden bg-dark-900 border border-white/5 cursor-pointer hover:border-brand-500/30 transition-all duration-500 ${
              // Make every 7th item span 2 columns if on large screens for variety
              index % 7 === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
            }`}
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex items-end justify-between gap-4">
                <div>
                  {photo.category && (
                    <span className="inline-block px-2 py-1 mb-2 text-xs font-medium text-brand-300 bg-brand-500/10 border border-brand-500/20 rounded-md backdrop-blur-sm">
                      {photo.category}
                    </span>
                  )}
                  <p className="text-sm text-zinc-300 font-medium truncate drop-shadow-md max-w-[200px]">
                    {new Date(photo.createdAt).toLocaleDateString('en-AU', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors">
                  <ZoomIn className="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="[&>button]:hidden max-w-[95vw] md:max-w-[90vw] h-[90vh] p-0 border-none bg-transparent shadow-none overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center bg-transparent">
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {selectedPhoto && (
              <div className="relative w-full h-full max-h-[85vh] rounded-xl overflow-hidden bg-black/90 border border-white/10 ring-1 ring-white/10 shadow-2xl">
                <Image
                  src={selectedPhoto.url}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  priority
                  sizes="90vw"
                  unoptimized
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      {selectedPhoto.category && (
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {selectedPhoto.category}
                        </h3>
                      )}
                      <p className="text-sm text-zinc-400">
                        Added on {new Date(selectedPhoto.createdAt).toLocaleDateString('en-AU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
