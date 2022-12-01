import { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  const { customer, mediaTitle, type, newCost } = req.body;
  if (type != '') {
    await query(
        `UPDATE media SET cost = ${newCost}, type = '${type}' WHERE title = '${mediaTitle}'`
    );
  }
  else {
    await query(
        `UPDATE media SET cost = ${newCost} WHERE title = '${mediaTitle}'`
    );
  }
    res.status(200).end();
};

export default handler;
