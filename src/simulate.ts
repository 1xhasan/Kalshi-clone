// simulate.ts
import type { Market } from "./market.js";
import  { getPrices, costToBuy } from "./lmsr.js";

function buyYes(market: Market, delta: number) {
  const cost = costToBuy(market, "yes", delta);
  market.q_yes += delta;
  const prices = getPrices(market);

  console.log(`Bought ${delta} YES shares for $${cost.toFixed(2)}`);
  console.log(`New prices : YES: ${(prices.pYes * 100).toFixed(2)}c, NO: ${(prices.pNo * 100).toFixed(2)}c`);
}

const market: Market = {
  id: "m1",
  question: "Will it rain tomorrow?",
  q_yes: 0,
  q_no: 0,
  b: 100,
};

console.log("Initial prices:", getPrices(market));
buyYes(market, 10);
buyYes(market, 20);
