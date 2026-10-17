// src/debtSolver.js

function computePayoff({ balance, annualRate, monthlyPayment, maxMonths = 600 }) {
  if (balance <= 0) return { months: 0, totalInterest: 0, schedule: [] };

  const monthlyRate = (annualRate || 0) / 12 / 100;
  if (monthlyPayment <= balance * monthlyRate) {
    throw new Error('Monthly payment is too small to ever pay down the balance (payment <= monthly interest). Increase monthlyPayment.');
  }

  let month = 0;
  let totalInterest = 0;
  const schedule = [];
  let current = balance;

  while (current > 0 && month < maxMonths) {
    month += 1;
    const interest = +(current * monthlyRate).toFixed(2);
    const principalPayment = Math.min(+(monthlyPayment - interest).toFixed(2), +current.toFixed(2));
    const payment = +(interest + principalPayment).toFixed(2);
    totalInterest = +(totalInterest + interest).toFixed(2);
    current = +(current + interest - payment).toFixed(2);
    if (current < 0) current = 0;

    schedule.push({ month, interest, payment, balance: current });
  }

  if (month === maxMonths && current > 0) {
    throw new Error('Reached maxMonths without paying off the balance. Consider increasing monthlyPayment or maxMonths.');
  }

  return { months: month, totalInterest, schedule };
}

module.exports = { computePayoff };
