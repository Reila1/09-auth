'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkSession, logout } from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';

const privateRoutes = ['/profile', '/notes'];

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { setUser, clearIsAuthenticated, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const isPrivate = privateRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (!isPrivate) {
      setIsLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else {
          await logout();
          clearIsAuthenticated();
          router.push('/sign-in');
        }
      } catch {
        await logout();
        clearIsAuthenticated();
        router.push('/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [pathname]);

  if (isLoading && privateRoutes.some((route) => pathname.startsWith(route))) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;