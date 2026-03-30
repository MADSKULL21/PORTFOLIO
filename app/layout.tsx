import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Space_Grotesk, Syne } from 'next/font/google';
import './globals.css';

const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const headingFont = Syne({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shaunak-lad.vercel.app'),
  title: {
    default: 'Shaunak Lad | AI/ML Engineer Portfolio',
    template: '%s | Shaunak Lad',
  },
  description:
    'Portfolio of Shaunak Lad featuring AI/ML projects, internship experience, production-oriented engineering, and interactive stats widgets.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: 'Shaunak Lad | AI/ML Engineer Portfolio',
    description:
      'Production-focused AI/ML portfolio with projects, internship experience, and interactive widgets.',
    images: [
      {
        url: '/images/stonecold.png',
        width: 1024,
        height: 1024,
        alt: 'Shaunak Lad Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shaunak Lad | AI/ML Engineer Portfolio',
    description:
      'Production-focused AI/ML portfolio with projects, internship experience, and interactive widgets.',
    images: ['/images/stonecold.png'],
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#070604' },
    { media: '(prefers-color-scheme: light)', color: '#f8f5ee' },
  ],
};

const bootstrapThemeScript = `
(() => {
  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const theme = savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.body.dataset.vision = 'clean';
  } catch {
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
    document.body.dataset.vision = 'clean';
  }
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: bootstrapThemeScript }} />
        {children}
      </body>
    </html>
  );
}
