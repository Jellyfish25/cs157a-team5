import type { NextApiHandler } from 'next';
import query from '../../database';

type Response = {
  username: string;
};

type Error = {
  error: string;
};

export const whoAmIHandler: NextApiHandler<Response | Error> = async (
  req,
  res
) => {
  const { username } = JSON.parse(req.body);
  const result = await query(
    `SELECT username FROM user WHERE username='${username}'`
  );
  res
    .status(200)
    .json((result as Response[])[0] || { error: 'No username found' });
};

export default whoAmIHandler;
