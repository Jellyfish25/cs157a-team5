import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, useUserCookie } from '../hooks';

export function roleRequired(
  role: 'customer' | 'employee' | 'contentCreator',
  Page: NextPage
) {
  return function ProtectedRoute() {
    const { userCookie } = useUserCookie();
    const router = useRouter();
    const [user, setUser] = useState(false);

    useEffect(() => {
      if (!userCookie) {
        router.replace('/login');
        return;
      }
      if (userCookie.userType !== role) {
        router.replace('/');
        return;
      }
      setUser(true);
    }, [userCookie, router]);

    return user ? <Page /> : null;
  };
}
