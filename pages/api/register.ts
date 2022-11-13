// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../database';

type Error = {
  error: string;
};

type Data = {
  message: string;
};

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method != 'POST') {
    res.status(405).json({ error: 'Wrong Method' });
    return;
  }
  const { username, password, userType } = req.body;
  if (!username || !password || !userType) {
    res
      .status(400)
      .json({ error: 'Username, Password, or UserType is missing!' });
    return;
  }
  try {
    await query(`INSERT INTO team5.user VALUES('${username}', '${password}')`);
    if (userType === 'customer') {
      await query(
        `INSERT INTO team5.customer VALUES('${username}', '${
          ['credit card', 'debit card', 'gift card'][
            Math.floor(Math.random() * 3)
          ]
        }')`
      );
    } else if (userType === 'employee') {
      await query(
        `INSERT INTO team5.employee VALUES('${username}', ${
          Math.round((Math.random() * 3 + 15) * 100) / 100
        })`
      );
    } else if (userType === 'contentCreator') {
      await query(
        `INSERT INTO team5.contentCreator VALUES('${username}', ${
          Math.round((Math.random() * 4 + 1) * 100) / 100
        })`
      );
    } else {
      throw Error('User Type is invalid!');
    }
    res.status(200).json({ message: 'Registration Success!' });
    return;
  } catch (e) {
    if (!(e instanceof Error)) throw e;
    res.status(500).json({ error: e.message });
    return;
  }
}
