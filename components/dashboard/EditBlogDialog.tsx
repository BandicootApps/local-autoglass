"use client";

import { useState, useEffect } from "react";
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
import { Trash2, Loader2 } from "lucide-react";
import { GalleryImagePicker, GalleryImage } from "./GalleryImagePicker";
import type { BlogJob, BlogImage } from "./BlogsTable";

interface EditBlogDialogProps {
  job: BlogJob;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditBlogDialog({ job, open, onOpenChange }: EditBlogDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [header, setHeader] = useState(job.header);
  const [subHeader, setSubHeader] = useState(job.sub_header);
  const [story, setStory] = useState(job.story || "");
  const [displayOrder, setDisplayOrder] = useState(job.display_order);
  const [active, setActive] = useState(job.active);
  
  // Existing images from the database (associated with this job)
  const [existingImages, setExistingImages] = useState<BlogImage[]>(
    job.gallery_images || []
  );
  const [imagesToRemove, setImagesToRemove] = useState<BlogImage[]>([]);
  
  // New images selected from gallery to add
  const [newSelectedImages, setNewSelectedImages] = useState<GalleryImage[]>([]);

  // Reset form when dialog opens with new job data
  useEffect(() => {
    if (open) {
      setHeader(job.header);
      setSubHeader(job.sub_header);
      setStory(job.story || "");
      setDisplayOrder(job.display_order);
      setActive(job.active);
      setExistingImages(job.gallery_images || []);
      setImagesToRemove([]);
      setNewSelectedImages([]);
      setError(null);
    }
  }, [open, job]);

  const totalImages = existingImages.length + newSelectedImages.length;
  const remainingSlotsForPicker = 6 - existingImages.length;

  const removeExistingImage = (image: BlogImage) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== image.id));
    setImagesToRemove((prev) => [...prev, image]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const supabase = createClient();

      // Update the blog job
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

      // Unlink removed images (set job_id to null instead of deleting)
      if (imagesToRemove.length > 0) {
        const imageIds = imagesToRemove.map((img) => img.id);
        await supabase
          .from("gallery_images")
          .update({ job_id: null, image_order: 0 })
          .in("id", imageIds);
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

      // Link newly selected images to this blog post
      if (newSelectedImages.length > 0) {
        const startIndex = existingImages.length;
        
        for (let index = 0; index < newSelectedImages.length; index++) {
          const img = newSelectedImages[index];
          await supabase
            .from("gallery_images")
            .update({ 
              job_id: job.id, 
              image_order: startIndex + index 
            })
            .eq("id", img.id);
        }
      }

      onOpenChange(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to update blog post:", err);
      setError(err instanceof Error ? err.message : "Failed to update blog post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
          <DialogDescription>
            Update the blog post details and images.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-header" className="text-zinc-300">
                Header (Title)
              </Label>
              <Input
                id="edit-header"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                placeholder="e.g., Latest Project Completion"
                required
                className="bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-subHeader" className="text-zinc-300">
                Sub Header (Summary)
              </Label>
              <Input
                id="edit-subHeader"
                value={subHeader}
                onChange={(e) => setSubHeader(e.target.value)}
                placeholder="e.g., A brief description of the post"
                required
                className="bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-story" className="text-zinc-300">
                Content (Optional)
              </Label>
              <textarea
                id="edit-story"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Write your blog content here..."
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
            <div className="grid gap-4">
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

              {/* Pending Removals Notice */}
              {imagesToRemove.length > 0 && (
                <p className="text-xs text-amber-500">
                  {imagesToRemove.length} image{imagesToRemove.length !== 1 ? "s" : ""} will be unlinked when you save (they&apos;ll remain in the gallery).
                </p>
              )}

              {/* Add Images from Gallery */}
              {remainingSlotsForPicker > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Add Images from Gallery</p>
                  <GalleryImagePicker
                    selectedImages={newSelectedImages}
                    onImagesChange={setNewSelectedImages}
                    maxImages={remainingSlotsForPicker}
                  />
                </div>
              )}
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
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
