import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocationPage } from '@/components/landing/LocationPage';
import { locations, getLocationBySlug } from '@/data/locations';

const baseUrl = 'https://localautoglass.com.au';

interface LocationPageParams {
  params: Promise<{ location: string }>;
}

export async function generateStaticParams() {
  return locations.map((loc) => ({
    location: loc.slug,
  }));
}

export async function generateMetadata({ params }: LocationPageParams): Promise<Metadata> {
  const { location: slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: 'Location Not Found',
    };
  }

  const title = `Windscreen Replacement ${location.name}`;
  const description = `Mobile windscreen replacement in ${location.name}, ${location.region}. Professional on-site service for cars, trucks, and machinery. Call 0466 140 195 for a free quote.`;

  return {
    title,
    description,
    keywords: [
      `windscreen replacement ${location.name}`,
      `mobile windscreen ${location.name}`,
      `auto glass ${location.name}`,
      `windscreen repair ${location.name}`,
      `${location.name} windscreen`,
      'Northern Rivers windscreen',
      'mobile windscreen replacement',
    ],
    openGraph: {
      title: `${title} | Local Auto Glass`,
      description,
      url: `${baseUrl}/services/${location.slug}`,
      siteName: 'Local Auto Glass',
      locale: 'en_AU',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Mobile Windscreen Replacement in ${location.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Local Auto Glass`,
      description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `${baseUrl}/services/${location.slug}`,
    },
  };
}

function generateLocationSchema(location: NonNullable<ReturnType<typeof getLocationBySlug>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Windscreen Replacement',
    name: `Mobile Windscreen Replacement in ${location.name}`,
    description: `Professional mobile windscreen replacement service in ${location.name}, ${location.region}. We come to your home or workplace.`,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/#organization`,
      name: 'Local Auto Glass',
      telephone: '+61466140195',
      email: 'local.autoglass.nr@gmail.com',
    },
    areaServed: {
      '@type': 'City',
      name: location.name,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: location.latitude,
        longitude: location.longitude,
      },
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Northern Rivers, NSW',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Windscreen Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Car & Ute Windscreen Replacement',
            description: `Mobile windscreen replacement for all makes and models in ${location.name}.`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Truck & Heavy Machinery Windscreen Replacement',
            description: `On-site windscreen replacement for trucks and heavy machinery in ${location.name}.`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'ADAS Calibration',
            description: `Professional ADAS recalibration after windscreen replacement in ${location.name}.`,
          },
        },
      ],
    },
  };
}

function generateFAQSchema(location: NonNullable<ReturnType<typeof getLocationBySlug>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: location.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default async function LocationServicePage({ params }: LocationPageParams) {
  const { location: slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const locationSchema = generateLocationSchema(location);
  const faqSchema = generateFAQSchema(location);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LocationPage location={location} />
    </>
  );
}
