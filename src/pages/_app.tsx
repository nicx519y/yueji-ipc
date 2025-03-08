import type { AppProps } from 'next/app';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-[#e5e5e5] min-h-screen">
      <div className="w-[1024px] mx-auto">
        <Navigation />
        <div className="h-[16px]"></div>
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <div className="h-[16px]"></div>
        <Footer />
      </div>
    </div>
  );
} 