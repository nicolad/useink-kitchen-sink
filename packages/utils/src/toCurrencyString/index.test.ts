import BN from "bn.js";
import { toCurrencyString } from "./index";

const testData = [
  {
    input: "123456789",
    decimals: 2,
    expectedOutput: "1,234,567.89 ROC",
  },
  {
    input: "987654321",
    decimals: 4,
    expectedOutput: "98,765.4321 ROC",
  },
  {
    input: new BN("123456789"),
    decimals: 2,
    expectedOutput: "1,234,567.89 ROC",
  },
  {
    input: new BN("987654321"),
    decimals: 4,
    expectedOutput: "98,765.4321 ROC",
  },
  {
    input: 123456789,
    decimals: 2,
    expectedOutput: "1,234,567.89 ROC",
  },
  {
    input: 987654321,
    decimals: 4,
    expectedOutput: "98,765.4321 ROC",
  },
  {
    input: new BN("1000000000000000000"),
    decimals: 2,
    currency: "DOT",
    expectedOutput: "10,000,000,000,000,000.00 DOT",
  },
  {
    input: new BN("1000000000000000000000"),
    decimals: 4,
    currency: "ROC",
    expectedOutput: "100,000,000,000,000,000.0000 ROC",
  },
  {
    input: new BN("12345678901234567890"),
    decimals: 2,
    currency: "KSM",
    expectedOutput: "123,456,789,012,345,678.90 KSM",
  },
];

testData.forEach(({ input, decimals, currency, expectedOutput }) => {
  test(`toCurrencyString(${input}, ${decimals}, ${currency}) returns "${expectedOutput}"`, () => {
    expect(toCurrencyString(input, decimals, currency)).toBe(expectedOutput);
  });
});
