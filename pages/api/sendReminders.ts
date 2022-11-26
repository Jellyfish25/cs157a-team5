import type { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  //const today = Date().toString().slice(0, 19).replace('T', ' ');
  const { names, username } = req.body;
  for (const name of names) {
    const lateName = await query(`SELECT customerUsername FROM reminded WHERE customerUsername = '${name}`);
    // if name is not in reminded table
    if(lateName == '') {
        //  insert into table a tuple
        await query(`INSERT INTO reminded VALUES('${username}, ${name}, 1, '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')`);
    }
    else {
    // else
    //  update reminderCount,lastDateReminded, and employeeUsername for the name that will be reminded
    const lateUsers = await query(
        `UPDATE reminded SET reminderCount = reminderCount + 1, lastDateReminded = '${new Date().toISOString().slice(0, 19).replace('T', ' ')}', 
        employeeUsername = '${username}' WHERE customerUsername = '${name}'`);
    }
  }
  res.status(200).end();
};
export default handler; 
