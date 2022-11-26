import type { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  const pending = await query(
    `SELECT mediaTitle FROM reviewed WHERE decision = \'pending\'`
  );
  console.log(pending);
  res.status(200).json(pending);
};
export default handler;
