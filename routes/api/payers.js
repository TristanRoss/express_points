const express = require('express');
const router = express.Router();

const balances = [
  { payer: 'DANNON', points: -100 },
  { payer: 'UNILEVER', points: -200 },
  { payer: 'MILLER COORS', points: -4700 },
];

const transactions = [];

router.get('/', (req, res) => res.json(balances));

module.exports = router;
