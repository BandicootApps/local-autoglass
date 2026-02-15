'use client';

import Link from 'next/link';
import { X, Phone } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 bg-dark-950/95 backdrop-blur-2xl z-40 transform transition-transform duration-300 flex items-center justify-center ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-white/5 p-2 rounded-full border border-white/5 transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="w-full max-w-md px-6 flex flex-col items-center">
        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent rounded-full mb-10"></div>

        <Link href="/" onClick={onClose} className="mobile-link group w-full max-w-xs mb-4 relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-500/30 backdrop-blur-md py-4 px-6 text-center transition-all duration-300">
          <span className="text-lg font-medium text-white tracking-tight group-hover:text-brand-400 transition-colors">Home</span>
        </Link>

        <Link href="/services" onClick={onClose} className="mobile-link group w-full max-w-xs mb-4 relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-500/30 backdrop-blur-md py-4 px-6 text-center transition-all duration-300">
          <span className="text-lg font-medium text-zinc-300 tracking-tight group-hover:text-white transition-colors">Services</span>
        </Link>

        <Link href="/faq" onClick={onClose} className="mobile-link group w-full max-w-xs mb-4 relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-500/30 backdrop-blur-md py-4 px-6 text-center transition-all duration-300">
          <span className="text-lg font-medium text-zinc-300 tracking-tight group-hover:text-white transition-colors">FAQ</span>
        </Link>

        <Link href="/photos" onClick={onClose} className="mobile-link group w-full max-w-xs mb-4 relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-500/30 backdrop-blur-md py-4 px-6 text-center transition-all duration-300">
          <span className="text-lg font-medium text-zinc-300 tracking-tight group-hover:text-white transition-colors">Gallery</span>
        </Link>

        <Link href="/blog" onClick={onClose} className="mobile-link group w-full max-w-xs mb-4 relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-500/30 backdrop-blur-md py-4 px-6 text-center transition-all duration-300">
          <span className="text-lg font-medium text-zinc-300 tracking-tight group-hover:text-white transition-colors">Blog</span>
        </Link>

        <a href="tel:0466140195" onClick={onClose} className="mobile-link group w-full max-w-xs mt-4 relative overflow-hidden rounded-2xl bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/20 py-4 px-6 text-center transition-all duration-300">
          <div className="flex items-center justify-center gap-3">
            <Phone className="w-5 h-5 text-white" />
            <span className="text-lg font-semibold text-white tracking-tight">0466 140 195</span>
          </div>
        </a>
      </div>
    </div>
  );
}
