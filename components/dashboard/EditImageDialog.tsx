"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditImageDialogProps {
  image: {
    id: string;
    filename: string | null;
    alt_text: string | null;
    image_url: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditImageDialog({ image, open, onOpenChange }: EditImageDialogProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filename, setFilename] = useState(image.filename || "");
  const [altText, setAltText] = useState(image.alt_text || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("gallery_images")
        .update({
          filename: filename || null,
          alt_text: altText || null,
        })
        .eq("id", image.id);

      if (error) {
        console.error("Failed to update image:", error);
      } else {
        router.refresh();
        onOpenChange(false);
      }
    } catch (err) {
      console.error("Failed to update image:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dark-900 border-zinc-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Image Details</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <img
            src={image.image_url}
            alt={altText || "Preview"}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="filename" className="text-zinc-300">
              Filename
            </Label>
            <Input
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="e.g., windscreen-replacement-toyota.jpg"
              className="bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
            <p className="text-xs text-zinc-500">
              A descriptive name for the image file
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alt_text" className="text-zinc-300">
              Alt Text
            </Label>
            <Input
              id="alt_text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="e.g., Technician replacing windscreen on Toyota Hilux"
              className="bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
            <p className="text-xs text-zinc-500">
              Describes the image for accessibility and SEO
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-zinc-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
