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
import { LanguageProvider } from "@/contexts/LanguageContext";
import MainLayout from '@/components/MainLayout';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    NProgress.start();

    setTimeout(() => {
      setIsLoading(false);
      NProgress.done(); 
    }, 2000);

    return () => {
      NProgress.done();
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
        <LanguageProvider>  <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <MainLayout>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
              <Toaster position="top-right" reverseOrder={false} />
            </ThemeProvider>
            </MainLayout>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider></LanguageProvider>
      
        
      
      </body>
    </html>
  );
}
