import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: process.env.DB_SCHEMA || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
  },
});

// Initialize db
db.query('CREATE DATABASE IF NOT EXISTS team5');
db.query('USE team5');

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
