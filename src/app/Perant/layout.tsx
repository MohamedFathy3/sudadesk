'use client'

import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './ErrorBoundary';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import MainLayout from '@/components/MainLayout';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      setIsLoading(false);
      NProgress.done(); 
    }, 2000);

    return () => {
      NProgress.done();
    clearTimeout(timer);

    };
    
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {isLoading && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'transparent',
              zIndex: 9999,
              backdropFilter: 'blur(5px)', 
            }}
          />
        )} 
        <MainLayout>  <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
              <Toaster position="top-right" reverseOrder={false} />
            </ThemeProvider>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider></MainLayout>
      
      </body>
    </html>
  );
}
