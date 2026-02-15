"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Search, X, Check, Image as ImageIcon, Loader2 } from "lucide-react";

export interface GalleryImage {
  id: string;
  image_url: string;
  filename: string | null;
  alt_text: string | null;
  created_at: string;
}

interface GalleryImagePickerProps {
  selectedImages: GalleryImage[];
  onImagesChange: (images: GalleryImage[]) => void;
  maxImages?: number;
}

export function GalleryImagePicker({
  selectedImages,
  onImagesChange,
  maxImages = 6,
}: GalleryImagePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch all gallery images on mount
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from("gallery_images")
        .select("id, image_url, filename, alt_text, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch gallery images:", error);
        setIsLoading(false);
        return;
      }

      setAllImages(data || []);
      setFilteredImages(data || []);
      setIsLoading(false);
    };

    fetchImages();
  }, []);

  // Filter images based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredImages(allImages);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allImages.filter((img) => {
      const filename = img.filename?.toLowerCase() || "";
      const altText = img.alt_text?.toLowerCase() || "";
      return filename.includes(query) || altText.includes(query);
    });
    setFilteredImages(filtered);
  }, [searchQuery, allImages]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isSelected = (imageId: string) => {
    return selectedImages.some((img) => img.id === imageId);
  };

  const toggleImage = (image: GalleryImage) => {
    if (isSelected(image.id)) {
      // Remove image
      onImagesChange(selectedImages.filter((img) => img.id !== image.id));
    } else if (selectedImages.length < maxImages) {
      // Add image
      onImagesChange([...selectedImages, image]);
    }
  };

  const removeImage = (imageId: string) => {
    onImagesChange(selectedImages.filter((img) => img.id !== imageId));
  };

  const remainingSlots = maxImages - selectedImages.length;

  return (
    <div className="space-y-3">
      {/* Selected Images Preview */}
      {selectedImages.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {selectedImages.map((img, index) => (
            <div key={img.id} className="relative group">
              <img
                src={img.image_url}
                alt={img.alt_text || img.filename || `Image ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-zinc-700"
              />
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <span className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Search Dropdown */}
      {remainingSlots > 0 && (
        <div ref={dropdownRef} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search gallery images by filename or alt text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
              className="pl-10 bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
            {isLoading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 animate-spin" />
            )}
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-50 w-full mt-2 bg-dark-800 border border-zinc-700 rounded-lg shadow-xl max-h-72 overflow-y-auto">
              {filteredImages.length === 0 ? (
                <div className="p-4 text-center text-zinc-500">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Loading images...</span>
                    </div>
                  ) : searchQuery ? (
                    <span>No images found matching &quot;{searchQuery}&quot;</span>
                  ) : (
                    <span>No images in gallery. Upload some first.</span>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 p-2">
                  {filteredImages.map((image) => {
                    const selected = isSelected(image.id);
                    const disabled = !selected && remainingSlots === 0;

                    return (
                      <button
                        key={image.id}
                        type="button"
                        onClick={() => !disabled && toggleImage(image)}
                        disabled={disabled}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selected
                            ? "border-brand-500 ring-2 ring-brand-500/30"
                            : disabled
                            ? "border-zinc-700 opacity-50 cursor-not-allowed"
                            : "border-zinc-700 hover:border-zinc-500"
                        }`}
                      >
                        <img
                          src={image.image_url}
                          alt={image.alt_text || image.filename || "Gallery image"}
                          className="w-full h-full object-cover"
                        />
                        {selected && (
                          <div className="absolute inset-0 bg-brand-500/20 flex items-center justify-center">
                            <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                        {image.filename && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1 py-0.5">
                            <p className="text-[10px] text-white truncate">
                              {image.filename}
                            </p>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Helper text */}
      <p className="text-xs text-zinc-500">
        {remainingSlots > 0 ? (
          <>
            <ImageIcon className="w-3 h-3 inline mr-1" />
            {remainingSlots} slot{remainingSlots !== 1 ? "s" : ""} remaining. Search and select from your gallery.
          </>
        ) : (
          <>Maximum of {maxImages} images selected.</>
        )}
      </p>
    </div>
  );
}
