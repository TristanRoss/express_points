const express = require('express');
const router = express.Router();

let balances = {};

const transactions = [];

router.get('/', (req, res) => res.send(balances));

router.post('/add', (req, res) => {
  const newTransaction = {
    ...req.body,
  };

  if (
    !newTransaction.payer ||
    !newTransaction.points ||
    !newTransaction.timestamp
  ) {
    return res.status(400).json({
      msg: 'Please include a payer, points, and a timestamp',
    });
  }

  transactions.push(newTransaction);
  res.json({ msg: 'Transaction added', transaction: newTransaction });
});

router.post('/spend', (req, res) => {
  const pointsReq = {
    ...req.body,
  };

  if (!pointsReq.points) {
    return res.status(400).json({ msg: 'Please include points' });
  }

  let points = pointsReq.points;
  const transactionsCopy = transactions.slice(0);
  transactionsCopy.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const spent = [];
  while (transactionsCopy.length > 0) {
    const current = transactionsCopy.pop();

    if (balances[current.payer] == null) {
      if (current.points >= 0) {
        balances[current.payer] = current.points;
        if (points > current.points) {
          points -= current.points;
          let s = {};
          s['payer'] = current.payer;
          s['points'] = -current.points;
          spent.push(s);
          balances[current.payer] = 0;
        } else {
          balances[current.payer] -= points;
          let s = {};
          s['payer'] = current.payer;
          s['points'] = -points;
          spent.push(s);
          points = 0;
        }
      } else {
        balances = {};
        return res
          .status(400)
          .json({ msg: 'Cannot enter a new payer with a negative balance' });
      }
    } else {
      let index = spent.findIndex((obj) => obj.payer === current.payer);
      if (current.points < 0) {
        let s = spent[index];
        if (s['points'] - current.points > 0) {
          balances = {};
          return res
            .status(400)
            .json({ msg: 'Cannot allow a payer to have negative points' });
        } else {
          s['points'] -= current.points;
          balances[current.payer] += current.points;
          points -= current.points;
        }
      } else {
        balances[current.payer] = current.points;

        if (points > current.points) {
          points -= current.points;
          let s = spent[index];
          s['points'] -= current.points;
          balances[current.payer] = 0;
        } else {
          balances[current.payer] -= points;
          let s = spent[index];
          s['points'] -= points;
          points = 0;
        }
      }
    }
  }

  res.json(spent);
});

module.exports = router;
