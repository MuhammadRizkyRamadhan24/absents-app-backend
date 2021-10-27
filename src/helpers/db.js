const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
});

// connection.connect()
connection.connect((error) => {
  if (error) {
    console.log(error);
  }
  console.log("You're now connected...");
});

module.exports = connection;
