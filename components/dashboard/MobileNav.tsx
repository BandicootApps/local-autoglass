'use client';

import { Menu, Shield } from 'lucide-react';

interface MobileNavProps {
  onMenuToggle: () => void;
}

export function MobileNav({ onMenuToggle }: MobileNavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-dark-900 border-b border-white/5 lg:hidden">
      <div className="flex items-center justify-between h-full px-4">
        <button
          onClick={onMenuToggle}
          className="p-2 text-zinc-400 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-brand-500" />
          <div className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold uppercase tracking-tight text-white">
              LOCAL
            </span>
            <span className="font-display text-sm font-bold uppercase tracking-tight text-brand-500">
              AUTOGLASS
            </span>
          </div>
        </div>

        <div className="w-10"></div> {/* Spacer for centering */}
      </div>
    </header>
  );
}
