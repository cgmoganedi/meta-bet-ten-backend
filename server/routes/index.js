const express = require('express');
const expenses = require('../db/expenses');

const router = express.Router();

router.get('/:tableAlias', async (req, res, next) => {
  try {
    const result = await expenses.all(req.params.tableAlias);
    res.json(result);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/:tableAlias/:id', async (req, res, next) => {
  try {
    const result = await expenses.one(req.params.tableAlias, req.params.id);
    res.json(result);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/:tableAlias', async (req, res, next) => {
  try {
    const result = await expenses.create(req.params.tableAlias, req.body);
    res.json(result);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put('/:tableAlias/:id', async (req, res, next) => {
  try {
    const result = await expenses.update(req.params.tableAlias, req.params.id, req.body);
    res.json(result);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete('/:tableAlias/:id', async (req, res, next) => {
  try {
    const result = await expenses.delete(req.params.tableAlias, req.params.id);
    res.json(result);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
