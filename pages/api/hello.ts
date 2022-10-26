// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../database';

type User = {
  id: number;
  name: string;
  password: string;
  userType: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = (await query(`SELECT * FROM users`)) as User[];

  const resultMap = result.map((result) => ({
    email: result.name,
    password: result.password,
  }));
  res.status(200).end();
}
