import BN from "bn.js";

type Symbol = "DOT" | "ROC" | string;

export const toCurrencyString = (
  value: BN | number | string,
  decimals = 12,
  symbol: Symbol = "ROC"
): string => {
  const base = new BN(10).pow(new BN(decimals));
  const baseValue = new BN(value).div(base);
  const remainder = new BN(value).mod(base).toString().padStart(decimals, "0");

  return `${baseValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${remainder} ${symbol}`;
};
