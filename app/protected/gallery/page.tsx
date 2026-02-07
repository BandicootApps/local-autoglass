import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { GalleryTable, type GalleryJob } from "@/components/dashboard/GalleryTable";
import { AddGalleryDialog } from "@/components/dashboard/AddGalleryDialog";
import { GalleryNav } from "@/components/dashboard/GalleryNav";

function TableSkeleton() {
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
            {[...Array(3)].map((_, i) => (
              <tr key={i} className="border-b border-zinc-800 animate-pulse">
                <td className="px-6 py-4">
                  <div className="h-4 w-8 bg-zinc-800 rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-12 w-12 bg-zinc-800 rounded-lg" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-32 bg-zinc-800 rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-28 bg-zinc-800 rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 w-12 bg-zinc-800 rounded-full" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-4 bg-zinc-800 rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-20 bg-zinc-800 rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-8 w-24 bg-zinc-800 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

async function GalleryTableLoader() {
  const supabase = await createClient();

  const { data: jobs, error } = await supabase
    .from("gallery_jobs")
    .select(`
      *,
      gallery_images (
        id,
        job_id,
        image_url,
        image_order,
        created_at
      )
    `)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching gallery jobs:", error);
    return (
      <div className="rounded-xl glass-card p-8 text-center">
        <p className="text-red-400">Failed to load gallery items: {error.message}</p>
      </div>
    );
  }

  return <GalleryTable jobs={(jobs as GalleryJob[]) || []} />;
}

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Gallery Management</h1>
          <p className="text-zinc-400">Manage your work gallery and images</p>
        </div>
        <AddGalleryDialog />
      </div>

      <GalleryNav />

      <Suspense fallback={<TableSkeleton />}>
        <GalleryTableLoader />
      </Suspense>
    </div>
  );
}
