const pool = require('../connect');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let authdb = {};

authdb.login = (payload) => {
  const { email, password } = payload;
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM user WHERE email = ? LIMIT 1`, [email], (err, result) => {
      if(err){
        return reject(err);
      }
      const user = result[0];
      if (!user){
        return resolve({});
      }
      if (!bcrypt.compareSync(password, user.password)){
        return resolve({});
      }
      return resolve(user);
    });
  });
};

authdb.register = (payload) => {
  const hashedPassword = bcrypt.hashSync(payload.password, saltRounds);
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO user (email, first_name, last_name, password) VALUES(?, ?, ?, ?)`, [payload.email, payload.first_name, payload.last_name, hashedPassword], (err, result) => {
      if(err){
        return reject(err);
      }
      return resolve(result);
    });
  });
};

authdb.resetPassword = (payload) => {
  return new Promise((resolve, reject) => {
    pool.query(``, (err, result) => {
      if(err){
        return reject(err);
      }
      return resolve(result);
    });
  });
};

module.exports = authdb;

