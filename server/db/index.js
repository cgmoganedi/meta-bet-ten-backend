const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.PORT
});

let expensesdb = {};

expensesdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM expense_type`, (err, result) =>{
      if(err){
        return reject(err);
      }
      return resolve(result);
    })
  });
}

expensesdb.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM expense_type WHERE id = ?`, [id], (err, result) =>{
      if(err){
        return reject(err);
      }
      return resolve(result[0]);
    })
  });
}

module.exports = expensesdb;