import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://localautoglass.com.au';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/protected/', '/auth/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
