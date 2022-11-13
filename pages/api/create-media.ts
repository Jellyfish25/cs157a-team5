// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, cost, type } = JSON.parse(req.body);
  if (!title || !cost || !type) {
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
    res.status(201).json({ message: 'Success! Rediecting you to homepage...' });
    return;
  } catch (e) {
    if (!(e instanceof Error)) throw e;
    if ('code' in e) {
      if (e.code == 'ER_DUP_ENTRY') {
        res.status(500).json({
          error: `'${title}' is already taken! Please try a different name.`,
        });
      }
      return;
    }
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
