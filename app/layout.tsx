import GoogleAnalytics from '@/components/GoogleAnalystics';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Review Beautifier - Customer Review Image Generator for LinkedIn & Instagram',
  description:
    'Transform your customer reviews (Malt, Google, Trustpilot) into professional images for social media. Free tool for freelancers and e-commerce. No watermark.',
  keywords: [
    'review generator',
    'testimonial maker',
    'review beautifier',
    'linkedin image',
    'freelance tools',
    'social proof',
    'customer review image',
    'testimonial card',
    'review card generator',
    'générateur avis',
    'mise en forme témoignage',
  ],
  authors: [{ name: 'Review Beautifier' }],
  creator: 'Review Beautifier',
  publisher: 'Review Beautifier',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR'],
    url: 'https://review-beautifier.netlify.app/',
    title: 'Review Beautifier - Customer Review Image Generator for LinkedIn & Instagram',
    description:
      'Transform your customer reviews (Malt, Google, Trustpilot) into professional images for social media. Free tool for freelancers and e-commerce. No watermark.',
    siteName: 'Review Beautifier',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Review Beautifier - Customer Review Image Generator',
    description:
      'Transform your customer reviews into professional images for social media. Free tool for freelancers. No watermark.',
  },
  alternates: {
    canonical: 'https://review-beautifier.netlify.app/',
    languages: {
      'en': 'https://review-beautifier.netlify.app/',
      'fr': 'https://review-beautifier.netlify.app/',
      'x-default': 'https://review-beautifier.netlify.app/',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Review Beautifier',
  applicationCategory: 'WebApplication',
  operatingSystem: 'Web',
  description:
    'Transform your customer reviews (Malt, Google, Trustpilot) into professional images for social media. Free tool for freelancers and e-commerce. No watermark.',
  url: 'https://review-beautifier.netlify.app/',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    ratingCount: '1',
  },
  featureList: [
    'Testimonial image generation',
    'Design customization',
    'High-quality PNG export',
    'Free and no watermark',
    'LinkedIn and Instagram ready',
  ],
  inLanguage: ['en', 'fr'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col h-screen overflow-hidden`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <main className="flex-1 flex min-h-0 overflow-hidden">{children}</main>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-XK0QV0VLGJ" />
      </body>
    </html>
  );
}
