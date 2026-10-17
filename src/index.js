// src/index.js

const express = require('express');
const bodyParser = require('express').json;
const { computePayoff } = require('./debtSolver');

const app = express();
app.use(bodyParser());

app.post('/payoff', (req, res) => {
  try {
    const { balance, annualRate, monthlyPayment } = req.body || {};
    if (typeof balance !== 'number' || typeof monthlyPayment !== 'number') {
      return res.status(400).json({ error: 'Request must include numeric balance and monthlyPayment (annualRate optional).' });
    }

    const result = computePayoff({ balance, annualRate: annualRate || 0, monthlyPayment });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`15min.debtsolution API listening on port ${PORT}`);
});
