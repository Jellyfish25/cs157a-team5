import type { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  //const pending = (await query(`UPDATE mediaTitle FROM reviewed WHERE decision = \'pending\'`));
  for (const title of req.body.titles) {
    await query(
      `UPDATE reviewed SET decision = \'${
        req.body.decision
      }\', employeeUsername = \'${req.body.eUsername}\', reason = \'${
        req.body.decision == 'approved'
          ? 'No Problems'
          : 'Inappropriate Content.'
      }\' WHERE mediaTitle = \'${title}\'`
    );
  }
  //console.log(update);
  res.status(200).end();
};
export default handler;
