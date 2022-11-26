import type { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  const media = await query(`SELECT * FROM media`);
  console.log(media);
  res.status(200).json(media);
};
export default handler;
