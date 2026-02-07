import { MessageCircle } from 'lucide-react';

export default function AIChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white mb-2">AI Chat</h1>
        <p className="text-zinc-400">Chat with our AI assistant</p>
      </div>

      <div className="h-[600px] rounded-xl glass-card p-6 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-brand-500" />
            </div>
            <p className="text-zinc-400">AI Chat interface coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
