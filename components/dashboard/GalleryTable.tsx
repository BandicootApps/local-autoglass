"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { EditGalleryDialog } from "./EditGalleryDialog";

export interface GalleryImage {
  id: string;
  job_id: string;
  image_url: string;
  image_order: number;
  created_at: string;
}

export interface GalleryJob {
  id: string;
  display_order: number;
  header: string;
  sub_header: string;
  story: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  gallery_images: GalleryImage[];
}

interface GalleryTableProps {
  jobs: GalleryJob[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function GalleryRow({ job }: { job: GalleryJob }) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(job.active);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingActive, setIsUpdatingActive] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const imageCount = job.gallery_images?.length || 0;
  const firstImage = job.gallery_images?.[0]?.image_url;

  const handleActiveToggle = async (checked: boolean) => {
    setIsUpdatingActive(true);
    setIsActive(checked);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("gallery_jobs")
        .update({ active: checked, updated_at: new Date().toISOString() })
        .eq("id", job.id);

      if (error) {
        console.error("Failed to update active status:", error);
        setIsActive(!checked); // Revert on error
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to update active status:", err);
      setIsActive(!checked); // Revert on error
    } finally {
      setIsUpdatingActive(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const supabase = createClient();
      
      // Delete images from storage first
      if (job.gallery_images && job.gallery_images.length > 0) {
        const filePaths = job.gallery_images.map((img) => {
          // Extract the path from the full URL
          const url = new URL(img.image_url);
          const pathParts = url.pathname.split('/storage/v1/object/public/gallery/');
          return pathParts[1] || '';
        }).filter(Boolean);

        if (filePaths.length > 0) {
          await supabase.storage.from('gallery').remove(filePaths);
        }
      }

      // Delete the job (cascade will delete gallery_images records)
      const { error } = await supabase
        .from("gallery_jobs")
        .delete()
        .eq("id", job.id);

      if (error) {
        console.error("Failed to delete gallery job:", error);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to delete gallery job:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <tr className="hover:bg-white/[0.02] transition-colors border-b border-zinc-800">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400 font-mono">
          {job.display_order}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {firstImage ? (
            <img
              src={firstImage}
              alt={job.header}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-zinc-600" />
            </div>
          )}
        </td>
        <td className="px-6 py-4 text-sm text-white font-medium max-w-xs">
          <p className="line-clamp-1">{job.header}</p>
        </td>
        <td className="px-6 py-4 text-sm text-zinc-400 max-w-xs">
          <p className="line-clamp-1">{job.sub_header}</p>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-500/20 text-brand-400 border border-brand-500/30">
            {imageCount}/6
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <Checkbox
            checked={isActive}
            onCheckedChange={handleActiveToggle}
            disabled={isUpdatingActive}
            className="data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
          {formatDate(job.created_at)}
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

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:text-white"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-white/[0.01]">
          <td colSpan={8} className="px-6 py-4">
            <div className="space-y-4">
              {job.story && (
                <div className="text-sm text-zinc-300 pl-4 border-l-2 border-brand-500">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Story</p>
                  <p className="whitespace-pre-wrap">{job.story}</p>
                </div>
              )}
              {job.gallery_images && job.gallery_images.length > 0 && (
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Images</p>
                  <div className="flex gap-3 flex-wrap">
                    {job.gallery_images
                      .sort((a, b) => a.image_order - b.image_order)
                      .map((image) => (
                        <img
                          key={image.id}
                          src={image.image_url}
                          alt={`${job.header} - ${image.image_order + 1}`}
                          className="w-24 h-24 rounded-lg object-cover border border-zinc-700"
                        />
                      ))}
                  </div>
                </div>
              )}
              {!job.story && (!job.gallery_images || job.gallery_images.length === 0) && (
                <p className="text-sm text-zinc-500 italic">No additional details</p>
              )}
            </div>
          </td>
        </tr>
      )}

      <EditGalleryDialog
        job={job}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </>
  );
}

export function GalleryTable({ jobs }: GalleryTableProps) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-xl glass-card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8 text-brand-500" />
        </div>
        <p className="text-zinc-400">No gallery items found. Add your first gallery item to get started.</p>
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
                Order
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Thumbnail
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Header
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Sub Header
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Images
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Active
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <GalleryRow key={job.id} job={job} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
