// lmsr.ts
import type { Market } from "./models/market.js"

// LMSR cost function
export function costFunction(qYes: number, qNo: number, b: number): number {
  return b * Math.log(Math.exp(qYes / b) + Math.exp(qNo / b));
}

// LMSR price calculation
export function getPrices(market: Market) {
  const { q_yes, q_no, b } = market;

  const expYes = Math.exp(q_yes / b);
  const expNo = Math.exp(q_no / b);
  const total = expYes + expNo;

  const pYes = expYes / total;
  const pNo = expNo / total;

  return { pYes, pNo };
}

// Cost to buy d-qYes or d-qNo shares
export function costToBuy(market: Market, outcome: "yes" | "no", delta: number): number {
  const { q_yes, q_no, b } = market;

  const newQYes = outcome === "yes" ? q_yes + delta : q_yes;
  const newQNo = outcome === "no" ? q_no + delta : q_no;

  const newCost = costFunction(newQYes, newQNo, b);
  const oldCost = costFunction(q_yes, q_no, b);

  return newCost - oldCost;
}
