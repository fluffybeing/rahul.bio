import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import { SandpackCSS } from './blog/[slug]/sandpack';
import { Navbar } from './components/nav';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rahul.bio'),
  title: {
    default: 'Rahul Ranjan',
    template: '%s | RR',
  },
  description: 'Musing over the twists and turns of life.',
  openGraph: {
    title: 'Rahul Ranjan',
    description: 'Musing over the twists and turns of life.',
    url: 'https://rahul.bio',
    siteName: 'Rahul Ranjan',
    locale: 'en_US',
    type: 'website',
  },
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
  twitter: {
    title: 'Rahul Ranjan',
    card: 'summary_large_image',
  },
  verification: {
    google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    yandex: '14d2e73487fa6c71',
  },
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-emerald-100 dark:bg-zinc-950',
        inter.variable,
        robotoMono.variable
      )}
    >
      <head>
        <SandpackCSS />
        <GoogleTagManager gtmId="G-95G2YZC86T" />
      </head>
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto text-wrap:pretty">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
