import BN from "bn.js";

export const formatBalance = (
  value: BN | number | string,
  decimals: number
): string => {
  const base = new BN(10).pow(new BN(decimals));
  const bnValue =
    typeof value === "number" || typeof value === "string"
      ? new BN(value)
      : value;

  const baseValue = bnValue.div(base);
  const remainder = bnValue.mod(base).toString().padStart(decimals, "0");

  return `${baseValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${remainder}`;
};
