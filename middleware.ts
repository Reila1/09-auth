import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isPrivate = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuth = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPrivate && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuth && token) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};