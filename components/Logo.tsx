import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group relative flex items-center justify-center gap-2 transition-all duration-300 ${className}`}>
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
  );
}
