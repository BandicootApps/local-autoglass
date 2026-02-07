'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Shield, Phone, Menu } from 'lucide-react';

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-950/90 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="group relative flex items-center justify-center gap-2 transition-all duration-300">
          <Shield className="w-8 h-8 text-brand-500 group-hover:rotate-12 transition-transform" />
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold uppercase tracking-tight text-white group-hover:text-brand-400 text-glow-hover transition-colors leading-none">
              LOCAL
            </span>
            <span className="font-display text-xl font-bold uppercase tracking-tight text-brand-500 transition-colors leading-none">
              AUTOGLASS
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 shadow-lg">
          <Link href="/" className="text-sm font-medium text-white hover:text-brand-400 transition-colors">Home</Link>
          <Link href="/services" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Services</Link>
          <Link href="/faq" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">FAQ</Link>
          <Link href="/gallery" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Recent Work</Link>
        </nav>
        
        <a href="tel:0466140195" className="hidden md:flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all group shadow-lg shadow-brand-500/20">
          <Phone className="w-5 h-5" />
          <span>0466 140 195</span>
        </a>
        
        <button
          id="mobile-menu-btn"
          onClick={onMobileMenuToggle}
          className="md:hidden text-white hover:text-brand-400 transition-colors"
        >
          <Menu className="w-8 h-8" />
        </button>
      </div>
    </header>
  );
}
