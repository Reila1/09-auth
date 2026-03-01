import { NextRequest, NextResponse } from 'next/server';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPrivate = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuth = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (accessToken) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
  if (refreshToken) {
    try {
      const user = await checkSession();
      if (user) {
        if (isAuth) {
          return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
      }
    } catch {
      if (isPrivate) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
      return NextResponse.next();
    }
  }

  if (isPrivate) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};