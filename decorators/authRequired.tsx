import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../hooks';

export function roleRequired(
  role: 'customer' | 'employee' | 'contentCreator',
  Page: NextPage
) {
  return function ProtectedRoute() {
    const user = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        window.location.replace('/login');
      }
    }, [user, router]);

    return user ? <Page /> : null;
  };
}
