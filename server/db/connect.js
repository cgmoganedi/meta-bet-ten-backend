const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'password',
  user: 'root',
  database: 'expenses',
  host: 'localhost',
  port: 3306
});

module.exports = pool;
