import type { AppProps } from 'next/app';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import Head from 'next/head';

// 不需要通用布局的页面路径
const noLayoutPages = ['/login', '/register', '/forgot-password', '/404'];

export default function App({ Component, pageProps, router }: AppProps) {
  // 检查是否是 404 页面
  if (pageProps.statusCode === 404) {
    return <Component {...pageProps} />;
  }

  // 检查当前页面是否需要通用布局
  const needsLayout = !noLayoutPages.includes(router.pathname);

  if (!needsLayout) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        <title>悦己—悦健康，悦自在</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
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
    </>
  );
} 