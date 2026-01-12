// app/[slug]/page.tsx - Client Component فقط
'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import SchoolContent from '@/components/SchoolContent';

export default function SchoolPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSkeleton />}>
        <SchoolContent slug={slug} />
      </Suspense>
    </ErrorBoundary>
  );
}