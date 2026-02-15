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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { GalleryImagePicker, GalleryImage } from "./GalleryImagePicker";

export function AddBlogDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [header, setHeader] = useState("");
  const [subHeader, setSubHeader] = useState("");
  const [story, setStory] = useState("");
  const [active, setActive] = useState(true);
  const [selectedImages, setSelectedImages] = useState<GalleryImage[]>([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

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

      // Create the blog job first
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

      // Link selected images to this blog post by updating their job_id
      if (selectedImages.length > 0) {
        const imageUpdates = selectedImages.map((img, index) => ({
          id: img.id,
          job_id: job.id,
          image_order: index,
        }));

        // Update each image to associate with this job
        for (const update of imageUpdates) {
          const { error: updateError } = await supabase
            .from("gallery_images")
            .update({ job_id: update.job_id, image_order: update.image_order })
            .eq("id", update.id);

          if (updateError) {
            console.error("Failed to link image:", updateError);
          }
        }
      }

      // Reset form
      setHeader("");
      setSubHeader("");
      setStory("");
      setActive(true);
      setSelectedImages([]);
      setOpen(false);

      router.refresh();
    } catch (err) {
      console.error("Failed to add blog post:", err);
      setError(err instanceof Error ? err.message : "Failed to add blog post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when closing
      setSelectedImages([]);
      setError(null);
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-brand-500 hover:bg-brand-400 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Blog Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Blog Post</DialogTitle>
          <DialogDescription>
            Add a new blog post and select up to 6 images from your gallery.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="header" className="text-zinc-300">
                Header (Title)
              </Label>
              <Input
                id="header"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                placeholder="e.g., Latest Project Completion"
                required
                className="bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subHeader" className="text-zinc-300">
                Sub Header (Summary)
              </Label>
              <Input
                id="subHeader"
                value={subHeader}
                onChange={(e) => setSubHeader(e.target.value)}
                placeholder="e.g., A brief description of the post"
                required
                className="bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="story" className="text-zinc-300">
                Content (Optional)
              </Label>
              <textarea
                id="story"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Write your blog content here..."
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

            {/* Image Selection Section */}
            <div className="grid gap-2">
              <Label className="text-zinc-300">
                Images ({selectedImages.length}/6)
              </Label>
              <GalleryImagePicker
                selectedImages={selectedImages}
                onImagesChange={setSelectedImages}
                maxImages={6}
              />
            </div>

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
                  Creating...
                </>
              ) : (
                "Add Blog Post"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
