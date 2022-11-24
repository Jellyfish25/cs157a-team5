import { Media, User } from '../types';

export const register = async (formState: User & { password: string }) => {
  const res = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    body: JSON.stringify(formState),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { res, data: await res.json() };
};

export const createMedia = async (username: string, formState: Media) => {
  const res = await fetch('http://localhost:3000/api/create-media', {
    method: 'POST',
    body: JSON.stringify({ username, ...formState }),
  });
  return { res, data: await res.json() };
};

export const login = async (formState: {}) => {};
