import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { type FAQ } from "@/components/dashboard/FAQTable";
import { FAQTableWithSearch } from "@/components/dashboard/FAQTableWithSearch";
import { AddFAQDialog } from "@/components/dashboard/AddFAQDialog";

async function FAQTableLoader() {
  const supabase = await createClient();

  const { data: faqs, error } = await supabase
    .from("faqs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-xl glass-card p-6">
        <p className="text-red-400">Error loading FAQs: {error.message}</p>
      </div>
    );
  }

  return <FAQTableWithSearch faqs={(faqs as FAQ[]) || []} />;
}

function TableSkeleton() {
  return (
    <div className="rounded-xl glass-card p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-zinc-800 rounded w-full"></div>
        <div className="h-4 bg-zinc-800 rounded w-full"></div>
        <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
        <div className="h-4 bg-zinc-800 rounded w-full"></div>
        <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">FAQ Management</h1>
          <p className="text-zinc-400">Manage frequently asked questions</p>
        </div>
        <AddFAQDialog />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <FAQTableLoader />
      </Suspense>
    </div>
  );
}
