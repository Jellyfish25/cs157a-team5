import { useContext } from 'react';
import { AuthContext, useUserCookie } from '../../hooks';

export function Navbar() {
  const user = useContext(AuthContext);
  const { deleteUserCookie } = useUserCookie();

  const doSignOut = async () => {
    deleteUserCookie();
    window.location.href = '/';
  };

  return user ? (
    <nav>
      <button onClick={doSignOut}>Sign Out</button>
    </nav>
  ) : (
    <nav>
      <button onClick={() => (window.location.href = '/login')}>Sign In</button>
      <button onClick={() => (window.location.href = '/register')}>
        Register
      </button>
    </nav>
  );
}
