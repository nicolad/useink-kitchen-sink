import BN from "bn.js";

export const toPrecision = (value: BN, sigFig: number): string => {
  const base = new BN(10).pow(new BN(sigFig - 1));
  const exponent = value.abs().toString().length - sigFig;

  if (exponent < -15 || value.eq(new BN(0))) {
    return value.toString();
  }

  if (exponent < 0) {
    const quotient = value.div(base);

    return `${quotient.toString()}e${exponent}`;
  }

  const remainder = value
    .mod(base)
    .toString()
    .padStart(sigFig - exponent, "0");
  const quotient = value.div(base).toString();

  return `${quotient}.${remainder}`;
};
