'use client';

import { useState, useEffect, StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './ErrorBoundary';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      setIsLoading(false);
      NProgress.done();
    }, 2000);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backdropFilter: 'blur(5px)',
          }}
        />
      )}

      <StrictMode>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
              >
                <ErrorBoundary>
                  {children}
                </ErrorBoundary>

                <Toaster
                  position="top-right"
                  reverseOrder={false}
                />
              </ThemeProvider>
            </AuthProvider>

            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </LanguageProvider>
      </StrictMode>
    </>
  );
}
