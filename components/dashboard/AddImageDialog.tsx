"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, X, Upload, Loader2, Check } from "lucide-react";

interface ImagePreview {
  file: File;
  preview: string;
  filename: string;
  altText: string;
}

type UploadStatus = "pending" | "uploading" | "complete" | "error";

export function AddImageDialog() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Upload progress tracking
  const [uploadProgress, setUploadProgress] = useState<{
    currentStep: string;
    imagesUploaded: number;
    totalImages: number;
    imageStatuses: UploadStatus[];
  } | null>(null);

  const addFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter((file) => file.type.startsWith("image/"));
    
    const remainingSlots = 10 - images.length;
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    const newImages: ImagePreview[] = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      filename: file.name,
      altText: "",
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    addFiles(files);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length < 10) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (images.length >= 10) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      addFiles(files);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const updateImageFilename = (index: number, filename: string) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], filename };
      return newImages;
    });
  };

  const updateImageAltText = (index: number, altText: string) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], altText };
      return newImages;
    });
  };

  const uploadImage = async (
    supabase: ReturnType<typeof createClient>,
    file: File,
    index: number
  ): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `standalone/${Date.now()}-${index}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("gallery").getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (images.length === 0) {
      setError("Please add at least one image");
      return;
    }

    setError(null);
    setIsLoading(true);

    // Initialize upload progress
    const initialStatuses: UploadStatus[] = images.map(() => "pending");
    setUploadProgress({
      currentStep: `Uploading images (0/${images.length})...`,
      imagesUploaded: 0,
      totalImages: images.length,
      imageStatuses: initialStatuses,
    });

    try {
      const supabase = createClient();

      const imageRecords: { image_url: string; image_order: number; filename: string | null; alt_text: string | null }[] = [];

      for (let index = 0; index < images.length; index++) {
        const img = images[index];
        
        // Update status to uploading for current image
        setUploadProgress((prev) => {
          if (!prev) return null;
          const newStatuses = [...prev.imageStatuses];
          newStatuses[index] = "uploading";
          return {
            ...prev,
            currentStep: `Uploading image ${index + 1} of ${images.length}...`,
            imageStatuses: newStatuses,
          };
        });

        try {
          const imageUrl = await uploadImage(supabase, img.file, index);
          imageRecords.push({
            image_url: imageUrl,
            image_order: index,
            filename: img.filename || null,
            alt_text: img.altText || null,
          });

          // Update status to complete for current image
          setUploadProgress((prev) => {
            if (!prev) return null;
            const newStatuses = [...prev.imageStatuses];
            newStatuses[index] = "complete";
            return {
              ...prev,
              imagesUploaded: index + 1,
              imageStatuses: newStatuses,
            };
          });
        } catch (uploadErr) {
          // Mark as error but continue with other images
          setUploadProgress((prev) => {
            if (!prev) return null;
            const newStatuses = [...prev.imageStatuses];
            newStatuses[index] = "error";
            return { ...prev, imageStatuses: newStatuses };
          });
          console.error(`Failed to upload image ${index + 1}:`, uploadErr);
        }
      }

      if (imageRecords.length > 0) {
        setUploadProgress((prev) => prev ? {
          ...prev,
          currentStep: "Saving image records...",
        } : null);

        const { error: imagesError } = await supabase
          .from("gallery_images")
          .insert(imageRecords);

        if (imagesError) throw imagesError;
      }

      // Clean up previews
      images.forEach((img) => URL.revokeObjectURL(img.preview));

      // Reset form
      setImages([]);
      setUploadProgress(null);
      setOpen(false);

      router.refresh();
    } catch (err) {
      console.error("Failed to add images error object:", err);
      if (typeof err === 'object' && err !== null) {
        console.error("Error details:", JSON.stringify(err, null, 2));
      }

      // specific handling for Supabase errors which might be objects
      let errorMessage = "Failed to add images";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        // Try to extract message from Supabase error object
        const supabaseError = err as { message?: string, code?: string, details?: string, hint?: string };
        if (supabaseError.message) {
          errorMessage = `Error: ${supabaseError.message}`;
          if (supabaseError.code) errorMessage += ` (Code: ${supabaseError.code})`;
        } else {
          errorMessage = `Unknown error: ${JSON.stringify(err)}`;
        }
      }
      
      setError(errorMessage);
      setUploadProgress(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Clean up previews when closing
      images.forEach((img) => URL.revokeObjectURL(img.preview));
      setImages([]);
      setError(null);
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-brand-500 hover:bg-brand-400 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Images
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Images</DialogTitle>
          <DialogDescription>
            Upload images to your gallery. You can add up to 10 images at once.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Image Upload Section */}
            <div className="grid gap-2">
              <Label className="text-zinc-300">
                Images ({images.length}/10)
              </Label>
              
              {/* Image Previews with metadata */}
              {images.length > 0 && (
                <div className="space-y-3 mb-3">
                  {images.map((img, index) => (
                    <div key={index} className="flex gap-3 p-3 rounded-lg bg-dark-800 border border-zinc-700">
                      <div className="relative flex-shrink-0">
                        <img
                          src={img.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                      <div className="flex-1 space-y-2">
                        <Input
                          value={img.filename}
                          onChange={(e) => updateImageFilename(index, e.target.value)}
                          placeholder="Filename"
                          className="bg-dark-900 border-zinc-700 text-white placeholder:text-zinc-500 h-9 text-sm"
                        />
                        <Input
                          value={img.altText}
                          onChange={(e) => updateImageAltText(index, e.target.value)}
                          placeholder="Alt text (optional)"
                          className="bg-dark-900 border-zinc-700 text-white placeholder:text-zinc-500 h-9 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button with Drag & Drop */}
              {images.length < 10 && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? "border-brand-500 bg-brand-500/10"
                      : "border-zinc-700 hover:border-brand-500 hover:bg-brand-500/5"
                  }`}
                >
                  <Upload className={`w-8 h-8 mx-auto mb-2 transition-colors ${
                    isDragging ? "text-brand-500" : "text-zinc-500"
                  }`} />
                  <p className={`text-sm transition-colors ${
                    isDragging ? "text-brand-400" : "text-zinc-400"
                  }`}>
                    {isDragging ? "Drop images here" : "Click or drag images here"}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {10 - images.length} slot{10 - images.length !== 1 ? "s" : ""} remaining
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {/* Upload Progress */}
            {uploadProgress && (
              <div className="space-y-3 p-4 rounded-lg bg-dark-800 border border-zinc-700">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-brand-500 animate-spin" />
                  <span className="text-sm text-zinc-300">{uploadProgress.currentStep}</span>
                </div>
                
                {uploadProgress.totalImages > 0 && (
                  <>
                    {/* Progress bar */}
                    <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-brand-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(uploadProgress.imagesUploaded / uploadProgress.totalImages) * 100}%` 
                        }}
                      />
                    </div>
                    
                    {/* Individual image status */}
                    <div className="flex gap-2 flex-wrap">
                      {uploadProgress.imageStatuses.map((status, idx) => (
                        <div 
                          key={idx}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium border ${
                            status === "complete" 
                              ? "bg-green-500/20 border-green-500/50 text-green-400" 
                              : status === "uploading"
                              ? "bg-brand-500/20 border-brand-500/50 text-brand-400"
                              : status === "error"
                              ? "bg-red-500/20 border-red-500/50 text-red-400"
                              : "bg-zinc-800 border-zinc-700 text-zinc-500"
                          }`}
                        >
                          {status === "complete" ? (
                            <Check className="w-4 h-4" />
                          ) : status === "uploading" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : status === "error" ? (
                            <X className="w-4 h-4" />
                          ) : (
                            idx + 1
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || images.length === 0}
              className="bg-brand-500 hover:bg-brand-400 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                `Upload ${images.length > 0 ? images.length : ""} Image${images.length !== 1 ? "s" : ""}`
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
