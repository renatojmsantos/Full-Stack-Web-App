const mysql = require("mysql2/promise");
require('dotenv/config');

exports.query = async function query(sql) {
  console.log(sql);
  
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    connectionLimit: 10,
  });

  const [result] = await connection.execute(sql);
  connection.end();

  return result;
}
