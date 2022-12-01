import { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  const { customer, mediaTitle, newInventory } = req.body;
    await query(
        `UPDATE media SET inventory = ${newInventory} WHERE title = '${mediaTitle}'`
    );
    res.status(200).end();
};

export default handler;
