'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, HelpCircle, Images, FileText, UserCircle, X, LogOut, type LucideIcon } from 'lucide-react';
import { Logo } from '@/components/Logo';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  comingSoon?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/protected/dashboard', icon: Home, comingSoon: true },
  { name: 'AI Chat', href: '/protected/ai-chat', icon: MessageCircle, comingSoon: true },
  { name: 'FAQ', href: '/protected/faq', icon: HelpCircle },
  { name: 'Gallery', href: '/protected/gallery', icon: Images },
  { name: 'Blogs', href: '/protected/blogs', icon: FileText },
  { name: 'Accounts', href: '/protected/accounts', icon: UserCircle },
];

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-dark-900 border-r border-white/5 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-white/5">
            <Logo />
            
            {/* Close button for mobile */}
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-6 right-6 lg:hidden text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon 
                    className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-brand-400'}`}
                  />
                  <span className="font-medium">{item.name}</span>
                  {item.comingSoon && (
                    <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30">
                      SOON
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Section / Logout */}
          <div className="p-4 border-t border-white/5">
            <form action="/auth/sign-out" method="post">
              <button
                type="submit"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-all duration-200 w-full group"
              >
                <LogOut className="w-5 h-5 group-hover:text-brand-400" />
                <span className="font-medium">Logout</span>
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
