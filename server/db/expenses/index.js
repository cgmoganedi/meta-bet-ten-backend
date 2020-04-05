const pool = require('../connect');

let expenses = {};

expenses.all = (tableAlias) => {
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
};

expenses.one = (tableAlias, id) => {
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
};

expenses.create = (tableAlias, payload) => {
  const { name, comment, date, value, expense_type_id } = payload;
  switch(tableAlias){
    case 'expenseType': case 'expense-type':
      return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO expense_type (name, comment) VALUES(?, ?)`, [name, comment], (err, result) => {
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
};

expenses.update = (tableAlias, id, payload) => {
  const { name, comment, date, value, expense_type_id } = payload;
  switch(tableAlias){
    case 'expenseType': case 'expense-type':
      return new Promise((resolve, reject) => {
        pool.query(`UPDATE expense_type SET name = ?, comment = ?, WHERE id = ?`, [name, comment, id], (err, result) => {
          if(err){
            return reject(err);
          }
          return resolve(result);
        });
      });

    case 'expenseEntry': case 'expense-entry':
      return new Promise((resolve, reject) => {
        pool.query(`UPDATE expense_entry SET expense_type_id = ?, date = ?, value = ?, comment = ? WHERE id = ?`, [expense_type_id, date, value, comment, id], (err, result) => {
          if(err){
            return reject(err);
          }
          return resolve(result);
        });
      });

    default:return { error:'Unknown URL endpoint!' };
  }
};

expenses.delete = (tableAlias, id) => {
  switch(tableAlias){
    case 'expenseType': case 'expense-type':
      return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM expense_entry WHERE expense_type_id = ?`, [id], (err, result) => {
          if(err){
            return reject(err);
          }
          pool.query(`DELETE FROM expense_type WHERE id = ?`, [id], (err, result) => {
            if(err){
              return reject(err);
            }
            return resolve(result);
          });
      });
    });

    case 'expenseEntry': case 'expense-entry':
      return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM expense_entry WHERE id = ?`, [id], (err, result) => {
          if(err){
            return reject(err);
          }
          return resolve(result);
        });
      });
      
    default:return { error:'Unknown URL endpoint!' };
  }
};

module.exports = expenses;
