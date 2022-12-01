// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../database';

type SQLError = Error & { code: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, title, cost, type } = JSON.parse(req.body);
  if (!title || !cost || !type || !username) {
    res
      .status(400)
      .json({ error: 'Invalid data! Title, Cost, or Type are empty.' });
    return;
  }

  if (req.method != 'POST') {
    res.status(405).json({ error: 'Wrong method' });
  }
  try {
    await query(
      `INSERT INTO media VALUES('${title}', ${Number(cost)}, 100, '${type}')`
    );
    await query(
      `INSERT INTO created VALUES('${username}', '${title}', '${new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')}')`
    );

    await query(
      `INSERT INTO reviewed VALUES('Ruthanne', '${title}', 'pending', '')`
    );

    res
      .status(201)
      .json({ message: 'Success! Redirecting you to homepage...' });
    return;
  } catch (error) {
    const e = error as SQLError;
    if (e.code == 'ER_DUP_ENTRY') {
      res.status(500).json({
        error: `'${title}' is already taken! Please try a different name.`,
      });
    }
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
