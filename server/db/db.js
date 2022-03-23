const mysql = require("mysql2/promise");
require('dotenv/config');


async function query(sql) {
  console.log(sql);
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    connectionLimit: 10,
    //port: process.env.DB_PORT,
  });

  const [result] = await connection.execute(sql);
  connection.end()
  return result;
}

module.exports = {
  query,
};
