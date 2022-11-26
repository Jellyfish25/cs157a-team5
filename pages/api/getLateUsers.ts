import type { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  const lateUsers = await query(
    `SELECT DISTINCT customerUsername FROM rented WHERE dueDate < '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
    AND customerUsername NOT IN (SELECT customerUsername FROM Reminded WHERE lastDateReminded = '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')`);
  console.log(lateUsers);
  res.status(200).json(lateUsers);
};
export default handler;
