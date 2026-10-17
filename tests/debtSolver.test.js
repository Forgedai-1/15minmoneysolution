// tests/debtSolver.test.js

const { computePayoff } = require('../src/debtSolver');

test('computePayoff pays off a small balance', () => {
  const result = computePayoff({ balance: 1000, annualRate: 12, monthlyPayment: 100 });
  expect(result.months).toBeGreaterThan(0);
  expect(result.totalInterest).toBeGreaterThanOrEqual(0);
  expect(result.schedule.length).toBe(result.months);
  // final balance should be zero
  expect(result.schedule[result.schedule.length - 1].balance).toBe(0);
});

test('computePayoff throws when payment too small', () => {
  expect(() => computePayoff({ balance: 1000, annualRate: 12, monthlyPayment: 1 })).toThrow();
});
