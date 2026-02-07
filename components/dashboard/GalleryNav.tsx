"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Gallery Items", href: "/protected/gallery" },
  { name: "Images", href: "/protected/gallery/images" },
];

export function GalleryNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-zinc-800">
      <nav className="flex gap-1" aria-label="Gallery tabs">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                isActive
                  ? "text-brand-400 border-brand-500"
                  : "text-zinc-400 border-transparent hover:text-white hover:border-zinc-600"
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
