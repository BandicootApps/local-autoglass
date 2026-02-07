"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Upload, Trash2, Loader2, Check } from "lucide-react";
import type { GalleryJob, GalleryImage } from "./GalleryTable";

interface ImagePreview {
  file: File;
  preview: string;
}

type UploadStatus = "pending" | "uploading" | "complete" | "error";

interface EditGalleryDialogProps {
  job: GalleryJob;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditGalleryDialog({ job, open, onOpenChange }: EditGalleryDialogProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [header, setHeader] = useState(job.header);
  const [subHeader, setSubHeader] = useState(job.sub_header);
  const [story, setStory] = useState(job.story || "");
  const [displayOrder, setDisplayOrder] = useState(job.display_order);
  const [active, setActive] = useState(job.active);
  
  // Existing images from the database
  const [existingImages, setExistingImages] = useState<GalleryImage[]>(
    job.gallery_images || []
  );
  const [imagesToDelete, setImagesToDelete] = useState<GalleryImage[]>([]);
  
  // New images to upload
  const [newImages, setNewImages] = useState<ImagePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Upload progress tracking
  const [uploadProgress, setUploadProgress] = useState<{
    currentStep: string;
    imagesUploaded: number;
    totalImages: number;
    imageStatuses: UploadStatus[];
  } | null>(null);

  // Reset form when dialog opens with new job data
  useEffect(() => {
    if (open) {
      setHeader(job.header);
      setSubHeader(job.sub_header);
      setStory(job.story || "");
      setDisplayOrder(job.display_order);
      setActive(job.active);
      setExistingImages(job.gallery_images || []);
      setImagesToDelete([]);
      setNewImages([]);
      setError(null);
    }
  }, [open, job]);

  const totalImages = existingImages.length + newImages.length;

  const addFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter((file) => file.type.startsWith("image/"));
    
    const remainingSlots = 6 - totalImages;
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    const newPreviews: ImagePreview[] = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewImages((prev) => [...prev, ...newPreviews]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    addFiles(files);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (totalImages < 6) {
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

    if (totalImages >= 6) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      addFiles(files);
    }
  };

  const removeExistingImage = (image: GalleryImage) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== image.id));
    setImagesToDelete((prev) => [...prev, image]);
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const uploadImage = async (
    supabase: ReturnType<typeof createClient>,
    file: File,
    jobId: string,
    index: number
  ): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${jobId}/${index}-${Date.now()}.${fileExt}`;

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
    setError(null);
    setIsLoading(true);

    try {
      const supabase = createClient();

      // Update the gallery job
      const { error: jobError } = await supabase
        .from("gallery_jobs")
        .update({
          header,
          sub_header: subHeader,
          story: story || null,
          display_order: displayOrder,
          active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", job.id);

      if (jobError) throw jobError;

      // Delete removed images from storage and database
      if (imagesToDelete.length > 0) {
        // Delete from storage
        const filePaths = imagesToDelete.map((img) => {
          const url = new URL(img.image_url);
          const pathParts = url.pathname.split('/storage/v1/object/public/gallery/');
          return pathParts[1] || '';
        }).filter(Boolean);

        if (filePaths.length > 0) {
          await supabase.storage.from('gallery').remove(filePaths);
        }

        // Delete from database
        const imageIds = imagesToDelete.map((img) => img.id);
        await supabase.from("gallery_images").delete().in("id", imageIds);
      }

      // Upload new images with progress tracking
      if (newImages.length > 0) {
        const initialStatuses: UploadStatus[] = newImages.map(() => "pending");
        setUploadProgress({
          currentStep: `Uploading images (0/${newImages.length})...`,
          imagesUploaded: 0,
          totalImages: newImages.length,
          imageStatuses: initialStatuses,
        });

        const startIndex = existingImages.length;
        const imageRecords: { job_id: string; image_url: string; image_order: number }[] = [];

        for (let index = 0; index < newImages.length; index++) {
          const img = newImages[index];
          
          // Update status to uploading for current image
          setUploadProgress((prev) => {
            if (!prev) return null;
            const newStatuses = [...prev.imageStatuses];
            newStatuses[index] = "uploading";
            return {
              ...prev,
              currentStep: `Uploading image ${index + 1} of ${newImages.length}...`,
              imageStatuses: newStatuses,
            };
          });

          try {
            const imageUrl = await uploadImage(supabase, img.file, job.id, startIndex + index);
            imageRecords.push({
              job_id: job.id,
              image_url: imageUrl,
              image_order: startIndex + index,
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
      }

      // Update image order for remaining existing images
      if (existingImages.length > 0) {
        await Promise.all(
          existingImages.map((img, index) =>
            supabase
              .from("gallery_images")
              .update({ image_order: index })
              .eq("id", img.id)
          )
        );
      }

      // Clean up previews
      newImages.forEach((img) => URL.revokeObjectURL(img.preview));

      setUploadProgress(null);
      onOpenChange(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to update gallery item:", err);
      setError(err instanceof Error ? err.message : "Failed to update gallery item");
      setUploadProgress(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      newImages.forEach((img) => URL.revokeObjectURL(img.preview));
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Gallery Item</DialogTitle>
          <DialogDescription>
            Update the gallery item details and images.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-header" className="text-zinc-300">
                Header (Vehicle Type/Model)
              </Label>
              <Input
                id="edit-header"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                placeholder="e.g., 2023 Toyota Camry"
                required
                className="bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-subHeader" className="text-zinc-300">
                Sub Header (What happened?)
              </Label>
              <Input
                id="edit-subHeader"
                value={subHeader}
                onChange={(e) => setSubHeader(e.target.value)}
                placeholder="e.g., Windshield Replacement"
                required
                className="bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-story" className="text-zinc-300">
                Story (Optional)
              </Label>
              <textarea
                id="edit-story"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Tell the story of this job..."
                rows={4}
                className="flex w-full rounded-md border border-zinc-700 bg-dark-800 px-3 py-2 text-sm text-white shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-displayOrder" className="text-zinc-300">
                Display Order
              </Label>
              <Input
                id="edit-displayOrder"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                min={0}
                className="bg-dark-800 border-zinc-700 text-white w-32"
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="edit-active"
                checked={active}
                onCheckedChange={(checked) => setActive(checked === true)}
                className="data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500"
              />
              <Label htmlFor="edit-active" className="text-zinc-300 cursor-pointer">
                Active (Show on website)
              </Label>
            </div>

            {/* Image Management Section */}
            <div className="grid gap-2">
              <Label className="text-zinc-300">
                Images ({totalImages}/6)
              </Label>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Current Images</p>
                  <div className="grid grid-cols-3 gap-3">
                    {existingImages
                      .sort((a, b) => a.image_order - b.image_order)
                      .map((img, index) => (
                        <div key={img.id} className="relative group">
                          <img
                            src={img.image_url}
                            alt={`Image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-zinc-700"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(img)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3 text-white" />
                          </button>
                          <span className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                            {index + 1}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* New Images to Upload */}
              {newImages.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">New Images</p>
                  <div className="grid grid-cols-3 gap-3">
                    {newImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.preview}
                          alt={`New ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-brand-500/50"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                        <span className="absolute bottom-1 left-1 bg-brand-500/70 text-white text-xs px-1.5 py-0.5 rounded">
                          New
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Button with Drag & Drop */}
              {totalImages < 6 && (
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
                    {6 - totalImages} slot{6 - totalImages !== 1 ? "s" : ""} remaining
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

              {/* Pending Deletions Notice */}
              {imagesToDelete.length > 0 && (
                <p className="text-xs text-amber-500">
                  {imagesToDelete.length} image{imagesToDelete.length !== 1 ? "s" : ""} will be deleted when you save.
                </p>
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
              disabled={isLoading}
              className="bg-brand-500 hover:bg-brand-400 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
