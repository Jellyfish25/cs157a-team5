// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { titles, username } = req.body;
  for (const title of titles) {
    await query(
      `DELETE FROM created WHERE mediaTitle='${title}' AND creatorUsername='${username}'`
    );
    await query(`DELETE FROM rented WHERE mediaTitle='${title}'`);
    await query(`DELETE FROM evaluated WHERE mediaTitle='${title}'`);
    await query(`DELETE FROM reviewed WHERE mediaTitle='${title}'`);
    await query(`DELETE FROM media WHERE title='${title}'`);
  }
  res.status(200).end();
}
