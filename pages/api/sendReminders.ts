import type { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  //const today = Date().toString().slice(0, 19).replace('T', ' ');
  const { names, username } = req.body;
  for (const name of names) {
    const lateUsers = await query(
        `UPDATE reminded SET reminderCount = reminderCount + 1, lastDateReminded = '${new Date().toISOString().slice(0, 19).replace('T', ' ')}', employeeUsername = '${username}' WHERE customerUsername = '${name}'`);
  }
  res.status(200).end();
};
export default handler;
