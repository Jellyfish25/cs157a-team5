import { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  const { mediaTitle } = req.body;
  const result: any = await query(
    `SELECT * from media WHERE title='${mediaTitle}'`
  );
  res.status(200).json(result[0]);
};

export default handler;
