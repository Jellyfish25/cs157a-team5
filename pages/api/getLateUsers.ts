import type { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ').split(" ")[0];
  const lateUsers = await query(
    `SELECT DISTINCT customerUsername FROM rented WHERE dueDate < '${date}'
    AND customerUsername NOT IN (SELECT customerUsername FROM Reminded WHERE lastDateReminded >= '${date}')`);
  console.log(lateUsers);
  console.log(date);
  res.status(200).json(lateUsers);
};
export default handler;
