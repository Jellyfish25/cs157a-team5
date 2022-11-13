import { createContext, useEffect, useState } from 'react';
import type { User } from '../types';
import type { ReactNode } from 'react';
import { useUserCookie } from './useUserCookie';

export const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { userCookie } = useUserCookie();

  return (
    <AuthContext.Provider value={userCookie || null}>
      {children}
    </AuthContext.Provider>
  );
};
