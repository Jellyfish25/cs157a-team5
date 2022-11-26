import type { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  //const today = Date().toString().slice(0, 19).replace('T', ' ');
  const { names, username } = req.body;
  try {
    for (const name of names) {
      const lateName: any = await query(
        `SELECT customerUsername FROM reminded WHERE customerUsername = '${name}'`
      );
      // if name is not in reminded table
      const date = new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
        .split(' ')[0];

      if (!lateName[0]) {
        //  insert into table a tuple
        //console.log(lateName);
        await query(
          `INSERT INTO reminded VALUES('${username}', '${name}', 1, '${date}')`
        );
      } else {
        // else
        //  update reminderCount,lastDateReminded, and employeeUsername for the name that will be reminded
        const lateUsers = await query(
          `UPDATE reminded SET reminderCount = reminderCount + 1, lastDateReminded = '${date}', 
        employeeUsername = '${username}' WHERE customerUsername = '${name}'`
        );
      }
    }
    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};
export default handler;
