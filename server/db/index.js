const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'password',
  user: 'root',
  database: 'expenses',
  host: 'localhost',
  port: 3306
});

let expensesdb = {};

expensesdb.all = (tableAlias) => {
  switch(tableAlias){
    case 'expenseType': case 'expense-type':
      return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM expense_type`, (err, result) => {
          if(err){
            return reject(err);
          }
          return resolve(result);
        });
      });

    case 'expenseEntry': case 'expense-entry':
      return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM expense_entry`, (err, result) => {
          if(err){
            return reject(err);
          }
          return resolve(result);
        });
      });

    default:return { error:'Unknown URL!' };
  }
}

expensesdb.one = (tableAlias, id) => {
  const ZERO = 0;
  switch(tableAlias){
    case 'expenseType': case 'expense-type':
      return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM expense_type WHERE id = ? LIMIT 1`, [id], (err, result) => {
          if(err){
            return reject(err);
          }
          return resolve(result[ZERO]);
        });
      });

    case 'expenseEntry': case 'expense-entry':
      return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM expense_entry WHERE id = ? LIMIT 1`, [id], (err, result) => {
          if(err){
            return reject(err);
          }
          return resolve(result[ZERO]);
        });
      });
    default:return { error:'Unknown URL!' };
  }
    
}

expensesdb.create = (tableAlias, payload) => {
  const { name, comment, date, value, expense_type_id } = payload;
  switch(tableAlias){
    case 'expenseType': case 'expense-type':
      return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO expense_type COLUMN(name, comment) VALUES(?, ?)`, [name, comment], (err, result) => {
          if(err){
            return reject(err);
          }
          return resolve(result);
        });
      });

    case 'expenseEntry': case 'expense-entry':
      return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO expense_entry (expense_type_id, date, value, comment) VALUES(?, ?, ?, ?)`, [expense_type_id, date, value, comment], (err, result) => {
          if(err){
            return reject(err);
          }
          return resolve(result);
        });
      });
    default:return { error:'Unknown URL endpoint!' };
  }
}

module.exports = expensesdb;
