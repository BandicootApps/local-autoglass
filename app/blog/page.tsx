import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { NavigationClient } from '@/components/landing/NavigationClient';
import { Footer } from '@/components/landing/Footer';
import { ScrollReveal } from '@/components/landing/ScrollReveal';

export const metadata: Metadata = {
  title: 'Auto Glass News & Tips | Local Auto Glass Blog',
  description: 'Latest news, tips, and insights about windscreen replacement, ADAS calibration, and auto glass care in the Northern Rivers.',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden animate-pulse">
          <div className="aspect-[16/10] bg-zinc-800" />
          <div className="flex-1 p-6 space-y-4">
            <div className="flex gap-4">
              <div className="h-4 w-20 bg-zinc-800 rounded" />
              <div className="h-4 w-16 bg-zinc-800 rounded" />
            </div>
            <div className="h-6 w-3/4 bg-zinc-800 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-zinc-800 rounded" />
              <div className="h-4 w-5/6 bg-zinc-800 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function BlogGrid() {
  const supabase = await createClient();

  const { data: blogs, error } = await supabase
    .from('gallery_jobs')
    .select(`
      *,
      gallery_images (
        id,
        image_url,
        image_order
      )
    `)
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500 text-lg">No articles found just yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => {
        const thumbnail = blog.gallery_images?.sort((a: any, b: any) => a.image_order - b.image_order)[0]?.image_url;

        return (
          <Link 
            href={`/blog/${blog.id}`} 
            key={blog.id}
            className="group flex flex-col bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Thumbnail */}
            <div className="aspect-[16/10] bg-zinc-800 relative overflow-hidden">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={blog.header}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 text-zinc-600">
                  No Image
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-60" />
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col">
              <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(blog.created_at)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>3 min read</span>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-brand-400 transition-colors line-clamp-2">
                {blog.header}
              </h2>
              
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                {blog.sub_header}
              </p>

              <div className="flex items-center gap-2 text-brand-500 text-sm font-medium mt-auto">
                Read Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="bg-dark-950 text-zinc-300 font-sans selection:bg-brand-500 selection:text-white overflow-x-hidden">
      <NavigationClient />
      <ScrollReveal>
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 bg-dark-950 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
              <div className="reveal">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
                  News & Insights
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-6">
                  Latest From The Workshop
                </h1>
                <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto mb-8">
                  Tips, guides, and updates from your local auto glass experts in the Northern Rivers.
                </p>
              </div>
            </div>
          </section>

          {/* Blog Grid */}
          <section className="py-16 bg-dark-900 border-t border-white/5 min-h-[50vh]">
            <div className="max-w-7xl mx-auto px-6">
              <Suspense fallback={<BlogGridSkeleton />}>
                <BlogGrid />
              </Suspense>
            </div>
          </section>
        </main>
        <Footer />
      </ScrollReveal>
    </div>
  );
}
