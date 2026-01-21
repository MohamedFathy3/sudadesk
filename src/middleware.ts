import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// المسارات اللي محتاجة authentication
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/admin',
  '/api/private',
    '/hr',
    '/teacher',
    '/reception',
        '/director',
        '/Account',
    '/Perant',
    

];

// المسارات العامة (بدون تسجيل)
const publicPaths = [
  '/',
  '/auth',
  '/login',
  '/register',
  '/forgot-password',
  '/schools',          // ⭐⭐ قائمة المدارس
  '/schools/[slug]',   // ⭐⭐ صفحة المدرسة التفصيلية
  '/api/auth',
  '/api/public'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // ⭐⭐ تحديد إذا كان المسار مدرسة تفصيلية
  const isSchoolDetailPage = pathname.match(/^\/schools\/[^\/]+$/);
  
  const isPublicPath = publicPaths.some(path => {
    if (path.includes('[slug]')) {
      // ⭐⭐ أي مسار يبدأ بـ /schools/ ويكون مستوى واحد فقط (مش /schools/xxx/yyy)
      return isSchoolDetailPage;
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  });

  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );

  // ⭐⭐ إذا كان مسار عام، اتركه يمر
  if (isPublicPath || isSchoolDetailPage) {
    return NextResponse.next();
  }

  // ⭐⭐ إذا كان مسار محمي، تحقق من authentication
  if (isProtectedPath) {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      const currentPath = pathname + request.nextUrl.search;
      const authUrl = new URL('/auth', request.url);
      authUrl.searchParams.set('redirect', currentPath);
      
      return NextResponse.redirect(authUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // ⭐⭐ استثني الملفات الثابتة فقط
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/).*)',
  ],
};