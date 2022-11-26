import { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  try {
    const { mediaTitle, customerUsername } = req.body;
    await query(
      `INSERT INTO rented VALUES('${customerUsername}', '${mediaTitle}', DATE_ADD(curdate(), INTERVAL 1 WEEK))`
    );
    await query(
      `UPDATE media SET inventory=inventory-1 WHERE title='${mediaTitle}'`
    );
    res.status(200).end();
  } catch (e) {
    const error: any = e;
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).end();
    }
  }
};

export default handler;
