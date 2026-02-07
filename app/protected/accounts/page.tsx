import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { UsersTable, type User } from "@/components/dashboard/UsersTable";
import { AddUserDialog } from "@/components/dashboard/AddUserDialog";

async function UsersTableLoader() {
  const supabase = await createClient();
  
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-xl glass-card p-6">
        <p className="text-red-400">Error loading users: {error.message}</p>
      </div>
    );
  }

  return <UsersTable users={(users as User[]) || []} />;
}

function TableSkeleton() {
  return (
    <div className="rounded-xl glass-card p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-zinc-800 rounded w-full"></div>
        <div className="h-4 bg-zinc-800 rounded w-full"></div>
        <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
      </div>
    </div>
  );
}

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">User Management</h1>
          <p className="text-zinc-400">Manage users and their roles</p>
        </div>
        <AddUserDialog />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <UsersTableLoader />
      </Suspense>
    </div>
  );
}
