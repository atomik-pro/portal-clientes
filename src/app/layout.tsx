import type { Metadata } from 'next';
import '../styles/globals.css';
import { cn } from '../../lib/utils';
import { Providers } from './Providers';

export const metadata: Metadata = {
  title: 'Atomik - Portal de Clientes',
  description:
    'Esta aplicación permite gestionar tu información como cliente de Atomik.',
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://portal-clientes.atomik.dev',
    title: 'Atomik - Portal de Clientes',
    description:
      'Esta aplicación permite gestionar tu información como cliente de Atomik.',
    images: [
      {
        url: '/favicon.ico',
        width: 1200,
        height: 630,
        alt: 'Atomik - Portal de Clientes'
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(`min-h-screen font-poppins`)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
