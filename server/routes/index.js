const express = require('express');
const jwt =  require('jsonwebtoken');
const router = express.Router();

const auth = require('./../db/auth');
const expenses = require('../db/expenses');

//---------------------------------------------------------------------------------------------------------

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.API_ACCESS_TOKEN_KEY, (err, user) => {
    if(err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

const generateToken = (user) => {
  return jwt.sign(user, process.env.API_ACCESS_TOKEN_KEY, { expiresIn: '1m' });
}

//---------------------------------------------------------------------------------------------------------
// AUTH endpoints

router.post('/login', async (req, res, next) => {
  try {
    const { id, email } = await auth.login(req.body);

    if(id && email){
      const user = { userId: id, email }; 
      const accessToken = generateToken(user);
      return res.json({...user, accessToken});
    }
    return res.sendStatus(401);
  } catch(e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const result = await auth.register(req.body);
    return res.json(result);
  } catch(e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

router.put('/resetPassword', async (req, res, next) => {
  try {
    const result = await auth.resetPassword();
    return res.json(result);
  } catch(e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

// end of AUTH endpoints
//---------------------------------------------------------------------------------------------------------

router.get('/:tableAlias', authenticateToken, async (req, res, next) => {
  try {
    const result = await expenses.all(req.params.tableAlias);
    return res.json(result);
  } catch(e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

router.get('/:tableAlias/:id', authenticateToken, async (req, res, next) => {
  try {
    const result = await expenses.one(req.params.tableAlias, req.params.id);
    return res.json(result);
  } catch(e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

router.post('/:tableAlias', authenticateToken, async (req, res, next) => {
  try {
    const result = await expenses.create(req.params.tableAlias, req.body);
    return res.json(result);
  } catch(e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

router.put('/:tableAlias/:id', authenticateToken, async (req, res, next) => {
  try {
    const result = await expenses.update(req.params.tableAlias, req.params.id, req.body);
    return res.json(result);
  } catch(e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

router.delete('/:tableAlias/:id', authenticateToken, async (req, res, next) => {
  try {
    const result = await expenses.delete(req.params.tableAlias, req.params.id);
    return res.json(result);
  } catch(e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

//---------------------------------------------------------------------------------------------------------

module.exports = router;
