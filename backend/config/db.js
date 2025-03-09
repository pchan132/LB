const mysql = require('mysql2/promise');

const db = async () => {
  try {
    conn = await mysql.createConnection({
      host : "localhost",
      user : "root",
      password : "1234",
      database : "lb_letters",
      port : 3306
    });
    console.log("Connected to the database");
    return conn;
  } catch (err) {
    console.log(err);
  }
}

module.exports = db; // ต้องมี