import { createContext, useEffect, useState } from 'react';
import type { User } from '../types';
import type { ReactNode } from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookie] = useCookies(['username']);

  return (
    <AuthContext.Provider value={cookie.username ? (cookie as User) : null}>
      {children}
    </AuthContext.Provider>
  );
};
