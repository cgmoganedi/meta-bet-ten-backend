
let authdb = {};

authdb.auth = (payload) => {
  return new Promise((resolve, reject) => {
    pool.query(``, (err, result) => {
      if(err){
        return reject(false);
      }
      return resolve(true);
    });
  });
};

authdb.login = (payload) => {
  return new Promise((resolve, reject) => {
    pool.query(``, (err, result) => {
      if(err){
        return reject(err);
      }
      return resolve(result);
    });
  });
};

authdb.register = (payload) => {
  return new Promise((resolve, reject) => {
    pool.query(``, (err, result) => {
      if(err){
        return reject(err);
      }
      return resolve(result);
    });
  });
};

authdb.logout = (payload) => {
  return new Promise((resolve, reject) => {
    pool.query(``, (err, result) => {
      if(err){
        return reject(err);
      }
      return resolve(result);
    });
  });
};

export default authdb;
