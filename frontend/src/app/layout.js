import { Baloo_2, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-baloo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'KAPO | Gestión de inventario para tu negocio',
  description:
    'Registra ingresos, ventas, ajustes de stock y pedidos de tu negocio en un solo lugar.',
  icons: {
    icon: '/brand/favicon-32.png',
    apple: '/brand/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${baloo.variable} ${inter.variable} ${plexMono.variable} font-body bg-surface-app text-ink-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
