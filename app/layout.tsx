import type { Metadata } from "next";
import { Inter, Audiowide } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const baseUrl = "https://localautoglass.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Local Auto Glass | Mobile Windscreen Replacement Northern Rivers",
    template: "%s | Local Auto Glass",
  },
  description: "Best Price. Best Service. Mobile windscreen replacement for cars, trucks, tractors, and machinery across the Northern Rivers region. Call Nigel on 0466 140 195 for a free quote.",
  keywords: [
    "windscreen replacement",
    "mobile windscreen",
    "auto glass",
    "Northern Rivers",
    "Lismore",
    "Ballina",
    "Byron Bay",
    "Alstonville",
    "Mullumbimby",
    "Bangalow",
    "windscreen repair",
    "car windscreen",
    "truck windscreen",
    "ADAS calibration",
  ],
  authors: [{ name: "Local Auto Glass" }],
  creator: "Local Auto Glass",
  publisher: "Local Auto Glass",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: baseUrl,
    siteName: "Local Auto Glass",
    title: "Local Auto Glass | Mobile Windscreen Replacement Northern Rivers",
    description: "Best Price. Best Service. Mobile windscreen replacement for cars, trucks, tractors, and machinery across the Northern Rivers region. Call Nigel on 0466 140 195.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Local Auto Glass - Mobile Windscreen Replacement Northern Rivers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Auto Glass | Mobile Windscreen Replacement Northern Rivers",
    description: "Best Price. Best Service. Mobile windscreen replacement for cars, trucks, tractors, and machinery across the Northern Rivers region.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "2q9c9fv-rf8mxc6oDh4K2voMQjRqce6tjzQdZJ8HDtc",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
});

// LocalBusiness JSON-LD Schema
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${baseUrl}/#organization`,
  name: "Local Auto Glass",
  alternateName: "Local Autoglass",
  description: "Mobile windscreen replacement for cars, trucks, tractors, and machinery across the Northern Rivers region.",
  url: baseUrl,
  telephone: "+61466140195",
  email: "local.autoglass.nr@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lismore",
    addressRegion: "NSW",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -28.8133,
    longitude: 153.2749,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Lismore",
      geo: { "@type": "GeoCoordinates", latitude: -28.8133, longitude: 153.2749 },
    },
    {
      "@type": "City",
      name: "Ballina",
      geo: { "@type": "GeoCoordinates", latitude: -28.8667, longitude: 153.5667 },
    },
    {
      "@type": "City",
      name: "Byron Bay",
      geo: { "@type": "GeoCoordinates", latitude: -28.6436, longitude: 153.6150 },
    },
    {
      "@type": "City",
      name: "Alstonville",
      geo: { "@type": "GeoCoordinates", latitude: -28.8417, longitude: 153.4417 },
    },
    {
      "@type": "City",
      name: "Mullumbimby",
      geo: { "@type": "GeoCoordinates", latitude: -28.5500, longitude: 153.5000 },
    },
    {
      "@type": "City",
      name: "Bangalow",
      geo: { "@type": "GeoCoordinates", latitude: -28.6833, longitude: 153.5333 },
    },
  ],
  serviceArea: {
    "@type": "AdministrativeArea",
    name: "Northern Rivers, NSW",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "85",
    bestRating: "5",
    worstRating: "1"
  },
  priceRange: "$$",
  image: `${baseUrl}/og-image.jpg`,
  sameAs: [
    "https://www.facebook.com/profile.php?id=61584732189662",
    "https://www.instagram.com/local_autoglass/",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Windscreen Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Car & Ute Windscreen Replacement",
          description: "Mobile windscreen replacement for all makes and models of cars and utes.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Truck & Heavy Machinery Windscreen Replacement",
          description: "On-site windscreen replacement for trucks, tractors, and heavy machinery.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ADAS Calibration",
          description: "Professional recalibration of Advanced Driver Assistance Systems after windscreen replacement.",
        },
      },
    ],
  },
  founder: {
    "@type": "Person",
    name: "Nigel Swift",
  },
  knowsAbout: [
    "Windscreen replacement",
    "Auto glass repair",
    "ADAS calibration",
    "Mobile automotive services",
  ],
  slogan: "Best Price. Best Service.",
  paymentAccepted: ["Cash", "Credit Card", "EFTPOS"],
  currenciesAccepted: "AUD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${audiowide.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
