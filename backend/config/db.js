require("dotenv").config(); // Load environment variables from .env file
const mysql = require("mysql2/promise");

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DB_DATABASE;
const PORT = process.env.DB_PORT;
// mysql://root:KIKtKwsTcLArLUZMWEBWERdNeBbUCZDF@mysql.railway.internal:3306/railway
const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQL_DATABASE}`;
const db = async () => {
  try {
    // conn = await mysql.createConnection({
    //   // host: HOST,
    //   // user: USER,
    //   // password: PASSWORD,
    //   // database: DATABASE,
    //   // port: PORT,
    // });
    conn = await mysql.createConnection(urlDB);
    console.log("Connected to the database");
    return conn;
  } catch (err) {
    console.log(err);
  }
};

module.exports = db; // ต้องมี
