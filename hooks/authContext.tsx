import { createContext, useEffect, useState } from 'react';
import type { User } from '../types';
import type { ReactNode } from 'react';
import { useUserCookie } from './useUserCookie';

export const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserCookie().userCookie;

  return (
    <AuthContext.Provider value={user ? user : null}>
      {children}
    </AuthContext.Provider>
  );
};
