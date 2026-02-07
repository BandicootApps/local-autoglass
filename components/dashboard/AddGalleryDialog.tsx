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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, X, Upload, Image as ImageIcon, Loader2, Check } from "lucide-react";

interface ImagePreview {
  file: File;
  preview: string;
}

type UploadStatus = "pending" | "uploading" | "complete" | "error";

export function AddGalleryDialog() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [header, setHeader] = useState("");
  const [subHeader, setSubHeader] = useState("");
  const [story, setStory] = useState("");
  const [active, setActive] = useState(true);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Upload progress tracking
  const [uploadProgress, setUploadProgress] = useState<{
    currentStep: string;
    imagesUploaded: number;
    totalImages: number;
    imageStatuses: UploadStatus[];
  } | null>(null);

  // Fetch the next display order when dialog opens
  useEffect(() => {
    if (open) {
      const fetchNextOrder = async () => {
        const supabase = createClient();
        const { data } = await supabase
          .from("gallery_jobs")
          .select("display_order")
          .order("display_order", { ascending: false })
          .limit(1)
          .single();
        
        // Store it for use during submit, but don't need state
        // We'll fetch it again during submit for accuracy
      };
      fetchNextOrder();
    }
  }, [open]);

  const addFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter((file) => file.type.startsWith("image/"));
    
    const remainingSlots = 6 - images.length;
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    const newImages: ImagePreview[] = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
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
    if (images.length < 6) {
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

    if (images.length >= 6) return;

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

    // Initialize upload progress
    const initialStatuses: UploadStatus[] = images.map(() => "pending");
    setUploadProgress({
      currentStep: "Creating gallery item...",
      imagesUploaded: 0,
      totalImages: images.length,
      imageStatuses: initialStatuses,
    });

    try {
      const supabase = createClient();

      // Get the next display order
      const { data: maxOrderData } = await supabase
        .from("gallery_jobs")
        .select("display_order")
        .order("display_order", { ascending: false })
        .limit(1)
        .single();

      const nextOrder = maxOrderData ? maxOrderData.display_order + 1 : 0;

      // Create the gallery job first
      const { data: job, error: jobError } = await supabase
        .from("gallery_jobs")
        .insert({
          header,
          sub_header: subHeader,
          story: story || null,
          display_order: nextOrder,
          active,
        })
        .select()
        .single();

      if (jobError) throw jobError;

      // Upload images sequentially with progress updates
      if (images.length > 0) {
        setUploadProgress((prev) => prev ? {
          ...prev,
          currentStep: `Uploading images (0/${images.length})...`,
        } : null);

        const imageRecords: { job_id: string; image_url: string; image_order: number }[] = [];

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
            const imageUrl = await uploadImage(supabase, img.file, job.id, index);
            imageRecords.push({
              job_id: job.id,
              image_url: imageUrl,
              image_order: index,
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

      // Clean up previews
      images.forEach((img) => URL.revokeObjectURL(img.preview));

      // Reset form
      setHeader("");
      setSubHeader("");
      setStory("");
      setActive(true);
      setImages([]);
      setUploadProgress(null);
      setOpen(false);

      router.refresh();
    } catch (err) {
      console.error("Failed to add gallery item:", err);
      setError(err instanceof Error ? err.message : "Failed to add gallery item");
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
          Add Gallery Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Gallery Item</DialogTitle>
          <DialogDescription>
            Add a new gallery item with up to 6 images.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="header" className="text-zinc-300">
                Header (Vehicle Type/Model)
              </Label>
              <Input
                id="header"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                placeholder="e.g., 2023 Toyota Camry"
                required
                className="bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subHeader" className="text-zinc-300">
                Sub Header (What happened?)
              </Label>
              <Input
                id="subHeader"
                value={subHeader}
                onChange={(e) => setSubHeader(e.target.value)}
                placeholder="e.g., Windshield Replacement"
                required
                className="bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="story" className="text-zinc-300">
                Story (Optional)
              </Label>
              <textarea
                id="story"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Tell the story of this job..."
                rows={4}
                className="flex w-full rounded-md border border-zinc-700 bg-dark-800 px-3 py-2 text-sm text-white shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="active"
                checked={active}
                onCheckedChange={(checked) => setActive(checked === true)}
                className="data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500"
              />
              <Label htmlFor="active" className="text-zinc-300 cursor-pointer">
                Active (Show on website)
              </Label>
            </div>

            {/* Image Upload Section */}
            <div className="grid gap-2">
              <Label className="text-zinc-300">
                Images ({images.length}/6)
              </Label>
              
              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-zinc-700"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
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

              {/* Upload Button with Drag & Drop */}
              {images.length < 6 && (
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
                    {6 - images.length} slot{6 - images.length !== 1 ? "s" : ""} remaining
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
              disabled={isLoading}
              className="bg-brand-500 hover:bg-brand-400 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Add Gallery Item"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
