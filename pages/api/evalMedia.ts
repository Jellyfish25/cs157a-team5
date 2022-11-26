import { NextApiHandler } from 'next';
import query from '../../database';

const handler: NextApiHandler = async (req, res) => {
  const { customer, mediaTitle, rating, comment } = req.body;
  try {
    await query(
      `INSERT INTO evaluated VALUES('${customer}', '${mediaTitle}', ${rating}, '${comment}')`
    );
    res.status(200).end();
  } catch (e) {
    const error: any = e;
    if (error.code === 'ER_DUP_ENTRY') {
      await query(`UPDATE evaluated SET comment='${comment}', rating=${rating} WHERE customerUsername='${customer}' 
        AND mediaTitle='${mediaTitle}'`);
      res.status(200).end();
    }
  }
};

export default handler;
