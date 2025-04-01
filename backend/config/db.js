require("dotenv").config(); // Load environment variables from .env file
const mysql = require("mysql2/promise");
console.log('DB_HOST:', process.env.MYSQLHOST);
console.log('DB_USER:', process.env.MYSQLUSER);
console.log('DB_PASS:', process.env.MYSQLPASSWORD);
console.log('DB_URL:', process.env.MYSQL_URL);
// const HOST = process.env.DB_HOST;
// const USER = process.env.DB_USER;
// const PASSWORD = process.env.DB_PASSWORD;
// const DATABASE = process.env.DB_DATABASE;
// const PORT = process.env.DB_PORT;
// const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:3306/${process.env.MYSQL_DATABASE}`;
const db = async () => {
  try {
    // conn = await mysql.createConnection({
    //   host: process.env.MYSQLHOST,
    //   user: process.env.MYSQLUSER,
    //   password: process.env.MYSQLPASSWORD,
    //   database: process.env.MYSQL_DATABASE,
    //   port: process.env.MYSQLPORT,
    // });
    conn = await mysql.createConnection(process.env.MYSQL_URL);
    console.log("Connected to the database");
    return conn;
  } catch (err) {
    console.log(err);
  }
};

module.exports = db; // ต้องมี
