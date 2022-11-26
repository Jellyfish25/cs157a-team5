import type { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  const { creatorUsername } = req.body;
  const pending = await query(
    `SELECT mediaTitle FROM created WHERE creatorUsername = \'${creatorUsername}\'`
  );
  res.status(200).json(pending);
};
export default handler;
