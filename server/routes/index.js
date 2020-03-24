const express = require('express');
const db = require('./../db');

const router = express.Router();

router.get('/:tableAlias', async (req, res, next) => {
  try {
    const result = await db.all(req.params.tableAlias);
    res.json(result);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/:tableAlias/:id', async (req, res, next) => {
  try {
    const result = await db.one(req.params.tableAlias, req.params.id);
    res.json(result);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/:tableAlias', async (req, res, next) => {
  try {
    const result = await db.create(req.params.tableAlias, req.body);
    res.json(result);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put('/:tableAlias/:id', async (req, res, next) => {});

router.delete('/:tableAlias/:id', async (req, res, next) => {});

module.exports = router;
