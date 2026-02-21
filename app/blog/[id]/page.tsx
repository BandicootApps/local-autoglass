import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { NavigationClient } from '@/components/landing/NavigationClient';
import { Footer } from '@/components/landing/Footer';
import { ScrollReveal } from '@/components/landing/ScrollReveal';

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: blog } = await supabase
    .from('gallery_jobs')
    .select('header, sub_header, created_at, gallery_images(image_url)')
    .eq('id', id)
    .single();

  if (!blog) {
    return {
      title: 'Blog Article Not Found',
    };
  }

  const title = blog.header;
  const description = blog.sub_header || `Read about ${blog.header} by Local Auto Glass.`;
  const mainImage = blog.gallery_images?.[0]?.image_url;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Local Auto Glass`,
      description,
      type: 'article',
      publishedTime: blog.created_at,
      images: mainImage ? [{ url: mainImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Local Auto Glass`,
      description,
      images: mainImage ? [mainImage] : [],
    },
    alternates: {
      canonical: `https://localautoglass.com.au/blog/${id}`,
    },
  };
}

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogPostSkeleton() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-6 w-32 bg-zinc-800 rounded mb-8 animate-pulse" />
        <div className="mb-8">
          <div className="flex gap-4 mb-6">
            <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-20 bg-zinc-800 rounded animate-pulse" />
          </div>
          <div className="h-12 w-3/4 bg-zinc-800 rounded mb-4 animate-pulse" />
          <div className="h-6 w-1/2 bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="aspect-video bg-zinc-800 rounded-2xl mb-12 animate-pulse" />
        <div className="space-y-4">
          <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

async function BlogContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: blog, error } = await supabase
    .from('gallery_jobs')
    .select(`
      *,
      gallery_images (
        id,
        image_url,
        image_order
      )
    `)
    .eq('id', id)
    .eq('active', true)
    .single();

  if (error || !blog) {
    notFound();
  }

  // Sort images
  const images = blog.gallery_images?.sort((a: any, b: any) => a.image_order - b.image_order) || [];
  const mainImage = images[0]?.image_url;
  const galleryImages = images.slice(1);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.header,
    description: blog.sub_header,
    image: mainImage ? [mainImage] : [],
    datePublished: blog.created_at,
    dateModified: blog.updated_at || blog.created_at,
    author: {
      '@type': 'Person',
      name: 'Local Auto Glass',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Local Auto Glass',
      logo: {
        '@type': 'ImageObject',
        url: 'https://localautoglass.com.au/favicon.ico',
      },
    },
  };

  return (
    <article className="pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.created_at)}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>3 min read</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            {blog.header}
          </h1>
          
          <p className="text-xl text-zinc-400 font-light leading-relaxed">
            {blog.sub_header}
          </p>
        </div>

        {/* Main Image */}
        {mainImage && (
          <div className="rounded-2xl overflow-hidden mb-12 border border-white/5 relative aspect-video bg-zinc-900">
            <Image
              src={mainImage}
              alt={blog.header}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              unoptimized
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none text-zinc-300">
          {blog.story ? (
            blog.story.split('\n').map((paragraph: string, idx: number) => (
              <p key={idx} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-zinc-500 italic">No content available.</p>
          )}
        </div>

        {/* Additional Gallery Images */}
        {galleryImages.length > 0 && (
          <div className="mt-16 pt-16 border-t border-white/5">
            <h3 className="text-2xl font-semibold text-white mb-8">Image Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryImages.map((img: any) => (
                <div key={img.id} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-white/5 group">
                  <Image
                    src={img.image_url}
                    alt={`${blog.header} gallery image`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="bg-dark-950 text-zinc-300 font-sans selection:bg-brand-500 selection:text-white overflow-x-hidden">
      <NavigationClient />
      <ScrollReveal>
        <main>
          <Suspense fallback={<BlogPostSkeleton />}>
            <BlogContent params={params} />
          </Suspense>

          {/* Share / CTA */}
          <section className="py-16 bg-dark-900 border-t border-white/5">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h3 className="text-2xl font-semibold text-white mb-4">Need Auto Glass Help?</h3>
              <p className="text-zinc-400 mb-8">
                Our team covers the entire Northern Rivers region. Get a free quote today.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/#contact"
                  className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Get a Quote
                </Link>
                <Link
                  href="tel:0466140195"
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Call Now
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </ScrollReveal>
    </div>
  );
}
