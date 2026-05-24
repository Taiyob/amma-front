import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {getRoleFromPath} from '@/lib/getRoleFromPath';

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const role = getRoleFromPath(pathname);

  if (pathname.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/patient') && role !== 'PATIENT') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/staff') && role !== 'STAFF') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/shared')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/patient/:path*',
    '/staff/:path*',
    '/shared/:path*',
  ],
};
