import type { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  // TODO: make it so it only shows approved media
  // Also, make it so reviewed table has mediaTitle be unique
  const media = await query(`SELECT DISTINCT mediaTitle FROM reviewed WHERE decision='approved'`);
  res.status(200).json(media);
};
export default handler;
