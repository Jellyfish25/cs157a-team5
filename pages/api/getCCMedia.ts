import type { NextApiHandler } from 'next';
import query from '../../database';

const handler : NextApiHandler = async (req,res) => {
    const pending = (await query(`SELECT mediaTitle FROM created WHERE creatorUsername = \'${req.body.creatorUsername}\'`));
    console.log(pending);
    res.status(200).json(pending);
}
export default handler;