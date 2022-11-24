import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUserCookie } from '../../hooks';

export function Navbar() {
  const { userCookie, deleteUserCookie } = useUserCookie();
  const router = useRouter();

  const doSignOut = async () => {
    deleteUserCookie();
    router.push('/');
  };

  const [user, setUser] = useState(false);
  useEffect(() => {
    if (!userCookie) {
      setUser(false);
    }
    setUser(true);
  }, [userCookie]);

  return !user ? (
    <nav>
      <button onClick={() => router.push('/login')}>Sign In</button>
      <button onClick={() => router.push('/register')}>Register</button>
    </nav>
  ) : (
    <nav>
      <button onClick={doSignOut}>Sign Out</button>
    </nav>
  );
}
