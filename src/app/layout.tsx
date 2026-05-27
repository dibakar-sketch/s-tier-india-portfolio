import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'S-Tier India | Creative Agency Portfolio',
  description: 'World-class creative agency specializing in podcast production, AI filmmaking, reel editing, graphic design, and branding.',
  keywords: 'creative agency, portfolio, podcast, filmmaking, branding, design',
  openGraph: {
    title: 'S-Tier India | Creative Agency Portfolio',
    description: 'Premium creative services for modern brands.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-luxury-black text-luxury-white">
        {children}
      </body>
    </html>
  );
}
