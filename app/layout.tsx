import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Revolut Converter',
  description: 'BYN to PLN converter based on Revolut API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Header></Header>
        <main className='container'>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
