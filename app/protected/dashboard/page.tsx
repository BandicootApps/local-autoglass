import { BarChart3, Users, Star } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">Dashboard</h1>
        <p className="text-zinc-400">Welcome to your dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards */}
        <div className="p-6 rounded-xl glass-card">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-brand-500" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Total Views</p>
              <p className="text-2xl font-semibold text-white">0</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl glass-card">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-brand-500" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Active Users</p>
              <p className="text-2xl font-semibold text-white">0</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl glass-card">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center">
              <Star className="w-6 h-6 text-brand-500" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Rating</p>
              <p className="text-2xl font-semibold text-white">5.0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl glass-card">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <p className="text-zinc-400">No recent activity to display.</p>
      </div>
    </div>
  );
}
