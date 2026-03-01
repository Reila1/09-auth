'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { checkSession, getMe } from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';

const privateRoutes = ['/profile', '/notes'];

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { setUser, clearIsAuthenticated } = useAuthStore();

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
        const session = await checkSession();
        if (session) {
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
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