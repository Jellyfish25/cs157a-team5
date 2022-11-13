import { NextPage } from 'next';
import { useEffect } from 'react';
import { useUserCookie } from '../hooks';

export function forwardOnAuth(Page: NextPage) {
  return function SkipOnAuth() {
    const { userCookie } = useUserCookie();
    useEffect(() => {
      if (!userCookie) return;
      const { userType } = userCookie.user;
      if (userType === 'customer') {
        window.location.replace('/customerHome');
      } else if (userType === 'employee') {
        window.location.replace('/employeeHome');
      } else if (userType === 'contentCreator') {
        window.location.replace('/contentCreatorHome');
      }
    }, [userCookie]);
    if (!userCookie) return <Page />;
  };
}
