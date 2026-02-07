import Link from 'next/link';
import { Shield, Phone, Mail, MapPin, BadgeCheck, Facebook, Instagram } from 'lucide-react';
import { CurrentYear } from './CurrentYear';

export function Footer() {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="max-w-sm">
            <Link href="/" className="group flex items-center gap-2 mb-6 w-fit">
              <Shield className="w-6 h-6 text-brand-500" />
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-zinc-400 transition-all duration-100 group-hover:text-brand-500 text-glow-hover">
                LOCAL AUTOGLASS
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-light">
              Owned and operated by a local family. Reliable, affordable, and hassle-free windscreen replacements across the Northern Rivers.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61584732189662"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all group"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/local_autoglass/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all group"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 md:gap-24">
            <div>
              <h4 className="text-white font-medium mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-zinc-500 font-light">
                <li><Link href="/" className="hover:text-brand-500 transition-colors">Home</Link></li>
                <li><Link href="/services" className="hover:text-brand-500 transition-colors">Services</Link></li>
                <li><Link href="/faq" className="hover:text-brand-500 transition-colors">FAQ</Link></li>
                <li><Link href="/gallery" className="hover:text-brand-500 transition-colors">Recent Work</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-zinc-500 font-light">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-500" />
                  <a href="tel:0466140195" className="text-white hover:text-brand-500">0466 140 195</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-500" />
                  <a href="mailto:local.autoglass.nr@gmail.com" className="hover:text-brand-500">local.autoglass.nr@gmail.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-500" />
                  <span>Northern Rivers, NSW</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-zinc-600 text-xs font-light">
            © <CurrentYear /> Local Auto Glass. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-xs text-zinc-500 font-light">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 rounded-full border border-white/5">
              <BadgeCheck className="w-3.5 h-3.5 text-brand-500" />
              <span>MVRL63433</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 rounded-full border border-white/5">
              <BadgeCheck className="w-3.5 h-3.5 text-brand-500" />
              <span>MVTC192290</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
