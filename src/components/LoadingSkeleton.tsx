// components/LoadingSkeleton.tsx
export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="h-20 bg-gray-200"></div>
      
      {/* Hero Section Skeleton */}
      <div className="h-[80vh] bg-gray-300"></div>
      
      {/* Sections Skeleton */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="py-20">
          <div className="container mx-auto px-4">
            <div className="h-8 bg-gray-200 w-1/3 mb-6"></div>
            <div className="h-4 bg-gray-200 w-1/2 mb-4"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}