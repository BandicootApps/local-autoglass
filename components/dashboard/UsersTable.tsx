"use client";

import { cn } from "@/lib/utils";

export type UserStatus = "Admin" | "Manager" | "Employee";

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  created_at: string;
}

interface UsersTableProps {
  users: User[];
}

function getStatusStyles(status: UserStatus): string {
  switch (status) {
    case "Admin":
      return "bg-brand-500/20 text-brand-400 border-brand-500/30";
    case "Manager":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    case "Employee":
      return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
    default:
      return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function UsersTable({ users }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-xl glass-card p-8 text-center">
        <p className="text-zinc-400">No users found. Add your first user to get started.</p>
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
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 font-mono">
                  {user.id.slice(0, 8)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                      getStatusStyles(user.status)
                    )}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                  {formatDate(user.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
