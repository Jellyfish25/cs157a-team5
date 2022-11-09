import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'password',
    port: 3306,
    database: process.env.DB || 'team5',
  },
});

/**
 *
 * @param queryStr the query to execute
 * @returns
 */
const query = async (queryStr: string) => {
  const result = await db.query(queryStr);
  await db.end();
  return result;
};

export default query;
