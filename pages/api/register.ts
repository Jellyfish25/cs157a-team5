// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../database';

type Data = {
  message: string;
};

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method != 'POST') {
    res.status(405).json({ message: 'Wrong Method' });
  }

  const { email, password, userType } = req.body;
  await query(
    `INSERT INTO team5.users(email, password, userType) VALUES('${email}', '${password}', '${userType}')`
  );
  res.status(200).end();
}
