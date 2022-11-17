// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../database';

type User = {
  id: number;
  username: string;
  password: string;
  userType: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;
  const result = (await query(
    `SELECT username FROM user WHERE username='${username}' AND password='${password}'`
  )) as User[];
  console.log(req.body);
  if (result) {
    const result1 = (await query(
      `SELECT username FROM customer WHERE username='${username}'`
    )) as User[];
    const result2 = (await query(
      `SELECT username FROM employee WHERE username='${username}'`
    )) as User[];
    const result3 = (await query(
      `SELECT username FROM contentCreator WHERE username='${username}'`
    )) as User[];
    let userType;
    userType = result1 ? 'customer' : result2 ? 'employee' : 'contentCreator';
    res.status(200).json({ username: result[0].username, userType });
  } else {
    res.status(403).end();
  }
}
