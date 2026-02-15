import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { GalleryImagesTable, type GalleryImageWithJob } from "@/components/dashboard/GalleryImagesTable";
import { AddImageDialog } from "@/components/dashboard/AddImageDialog";

function TableSkeleton() {
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
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b border-zinc-800 animate-pulse">
                <td className="px-6 py-4">
                  <div className="h-16 w-16 bg-zinc-800 rounded-lg" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-32 bg-zinc-800 rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-40 bg-zinc-800 rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-32 bg-zinc-800 rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-8 bg-zinc-800 rounded mx-auto" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-20 bg-zinc-800 rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-8 w-20 bg-zinc-800 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

async function ImagesTableLoader() {
  const supabase = await createClient();

  const { data: images, error } = await supabase
    .from("gallery_images")
    .select(`
      id,
      job_id,
      image_url,
      image_order,
      created_at,
      filename,
      alt_text,
      gallery_jobs (
        header
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching gallery images:", error);
    return (
      <div className="rounded-xl glass-card p-8 text-center">
        <p className="text-red-400">Failed to load images: {error.message}</p>
      </div>
    );
  }

  // Transform the data to include job header
  const transformedImages: GalleryImageWithJob[] = (images || []).map((img: any) => ({
    id: img.id,
    job_id: img.job_id,
    image_url: img.image_url,
    image_order: img.image_order,
    created_at: img.created_at,
    job_header: img.gallery_jobs?.header || "Unknown",
    filename: img.filename,
    alt_text: img.alt_text,
  }));

  return <GalleryImagesTable images={transformedImages} />;
}

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Gallery Management</h1>
          <p className="text-zinc-400">Manage all images in your gallery</p>
        </div>
        <AddImageDialog />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <ImagesTableLoader />
      </Suspense>
    </div>
  );
}
