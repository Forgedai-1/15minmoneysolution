# 15min.debtsolution

A small, focused service to produce quick debt payoff plans — "15 minute debt solution".

This repository was renamed from `15min.moneysolution` to `15min.debtsolution` to better reflect the purpose: helping users create simple, actionable debt payoff plans fast.

Contents
- src/
  - debtSolver.js — core payoff calculator
  - index.js — tiny HTTP API exposing the solver
- tests/
  - debtSolver.test.js — unit tests for the solver
- package.json — project metadata and scripts

Quick start

1. Install dependencies

   npm install

2. Run tests

   npm test

3. Start the API locally

   npm start

API

POST /payoff
- Request JSON: { "balance": number, "annualRate": number (percent), "monthlyPayment": number }
- Response JSON: { "months": number, "totalInterest": number, "schedule": [ { month, interest, payment, balance } ] }

Example

curl -s -X POST http://localhost:3000/payoff \
  -H "Content-Type: application/json" \
  -d '{"balance":5000,"annualRate":12,"monthlyPayment":200}' | jq

Notes on repository rename

To rename the GitHub repository from `15minmoneysolution` to `15mindebtsolution` (recommended because GitHub repo names normally don’t include dots):
1. Go to: https://github.com/Forgedai-1/15minmoneysolution/settings
2. Under "Repository name", change the name to `15mindebtsolution` and click "Rename".
3. Update any remote URLs locally with `git remote set-url origin git@github.com:Forgedai-1/15mindebtsolution.git` (or the HTTPS equivalent).

If you prefer the repo name to include a dot in a display manner, you can keep the GitHub repo name as `15mindebtsolution` and use the project display name `15min.debtsolution` in the README and app UI.

License

This project is provided as-is. Add a LICENSE file if you want to specify terms.
