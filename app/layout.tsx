import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cecília & Ivo — 25.07.26',
  description: 'Você está convidado para o casamento de Cecília e Ivo. 25 de julho de 2026.',
  openGraph: {
    title: 'Cecília & Ivo — 25.07.26',
    description: 'Você está convidado para o casamento de Cecília e Ivo.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
