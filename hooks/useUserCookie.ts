import { useCookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';
import type { User } from '../types';
export const useUserCookie = (): {
  userCookie: User;
  setUserCookie: (newCookie: User, options?: CookieSetOptions) => void;
  deleteUserCookie: (options?: CookieSetOptions) => void;
} => {
  const [userCookie, setCookie, deleteCookie] = useCookies<
    'user',
    { user: User }
  >();

  const setUserCookie = (newCookie: User, options?: CookieSetOptions) => {
    return setCookie('user', newCookie, options);
  };
  const deleteUserCookie = (options?: CookieSetOptions) => {
    return deleteCookie('user', options);
  };
  return { userCookie: userCookie.user, setUserCookie, deleteUserCookie };
};
