"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, Image as ImageIcon, ExternalLink, Pencil } from "lucide-react";
import { EditImageDialog } from "./EditImageDialog";

export interface GalleryImageWithJob {
  id: string;
  job_id: string;
  image_url: string;
  image_order: number;
  created_at: string;
  job_header: string;
  filename: string | null;
  alt_text: string | null;
}

interface GalleryImagesTableProps {
  images: GalleryImageWithJob[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatFileSize(url: string): string {
  // We can't get actual file size from URL, so just return a placeholder
  return "—";
}

function getFileName(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    return pathParts[pathParts.length - 1] || 'Unknown';
  } catch {
    return 'Unknown';
  }
}

function ImageRow({ image }: { image: GalleryImageWithJob }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const supabase = createClient();
      
      // Extract the path from the full URL
      const url = new URL(image.image_url);
      const pathParts = url.pathname.split('/storage/v1/object/public/gallery/');
      const filePath = pathParts[1] || '';

      // Delete from storage
      if (filePath) {
        await supabase.storage.from('gallery').remove([filePath]);
      }

      // Delete the record
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", image.id);

      if (error) {
        console.error("Failed to delete image:", error);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to delete image:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <tr className="hover:bg-white/[0.02] transition-colors border-b border-zinc-800">
        <td className="px-6 py-4 whitespace-nowrap">
          <img
            src={image.image_url}
            alt={image.alt_text || `Image from ${image.job_header}`}
            className="w-16 h-16 rounded-lg object-cover"
          />
        </td>
        <td className="px-6 py-4 text-sm text-white font-medium max-w-xs">
          <p className="line-clamp-1">{image.job_header}</p>
        </td>
        <td className="px-6 py-4 text-sm text-zinc-400 font-mono max-w-xs">
          <p className="line-clamp-1 text-xs">{image.filename || getFileName(image.image_url)}</p>
        </td>
        <td className="px-6 py-4 text-sm text-zinc-500 max-w-xs">
          <p className="line-clamp-2 text-xs">{image.alt_text || <span className="italic text-zinc-600">No alt text</span>}</p>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400 text-center">
          {image.image_order + 1}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
          {formatDate(image.created_at)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:text-white"
              onClick={() => setEditDialogOpen(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:text-white"
              onClick={() => window.open(image.image_url, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-red-400"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-dark-800 border-zinc-700">
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer"
                >
                  Confirm Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </td>
      </tr>

      <EditImageDialog
        image={{
          id: image.id,
          filename: image.filename,
          alt_text: image.alt_text,
          image_url: image.image_url,
        }}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </>
  );
}

export function GalleryImagesTable({ images }: GalleryImagesTableProps) {
  if (images.length === 0) {
    return (
      <div className="rounded-xl glass-card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8 text-brand-500" />
        </div>
        <p className="text-zinc-400">No images found. Add images to your gallery items to see them here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Preview
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Blog Post
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Filename
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Alt Text
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Uploaded
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <ImageRow key={image.id} image={image} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
