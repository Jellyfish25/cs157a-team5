import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUserCookie } from '../hooks';

export function forwardOnAuth(Page: NextPage) {
  return function SkipOnAuth() {
    const { userCookie } = useUserCookie();
    const router = useRouter();
    const [user, setUser] = useState(false);
    useEffect(() => {
      if (!userCookie) {
        setUser(false);
        return;
      }
      const { userType } = userCookie;
      if (userType === 'customer') {
        router.replace('/customerHome');
      } else if (userType === 'employee') {
        router.replace('/employeeHome');
      } else if (userType === 'contentCreator') {
        router.replace('/contentCreatorHome');
      }
    }, [userCookie, router]);
    return !user ? <Page /> : null;
  };
}
