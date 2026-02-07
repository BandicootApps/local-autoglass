import { ServicesPageLayout } from '@/components/landing/ServicesPageLayout';
import { ServicesList } from '@/components/landing/ServicesList';

export const metadata = {
  title: 'Our Services | Mobile Windscreen Replacement Northern Rivers',
  description: 'Professional, on-site windscreen replacement for cars, trucks, tractors, and heavy machinery across the Northern Rivers. We come to you — no workshop visit needed.',
  openGraph: {
    title: 'Our Services | Local Auto Glass',
    description: 'Professional mobile windscreen replacement for cars, trucks, tractors, and heavy machinery. We come to you anywhere in the Northern Rivers.',
    url: 'https://localautoglass.com.au/services',
  },
  alternates: {
    canonical: 'https://localautoglass.com.au/services',
  },
};

// Service page JSON-LD schema
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Windscreen Replacement',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Local Auto Glass',
    telephone: '+61466140195',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Northern Rivers, NSW',
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
          description: 'Mobile windscreen replacement for all makes and models. Australian Standard certified glass.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Trucks, Tractors & Heavy Machinery',
          description: 'On-site windscreen replacement at your depot, farm, or construction site.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'ADAS Windscreen Calibration',
          description: 'Professional recalibration of safety camera systems after windscreen replacement.',
        },
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServicesPageLayout>
        <ServicesList />
      </ServicesPageLayout>
    </>
  );
}
