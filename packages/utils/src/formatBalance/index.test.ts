import BN from "bn.js";
import { formatBalance } from "./index";

const testData = [
  {
    input: "123456789",
    decimals: 2,
    expectedOutput: "1,234,567.89",
  },
  {
    input: "987654321",
    decimals: 4,
    expectedOutput: "98,765.4321",
  },
  {
    input: new BN("123456789"),
    decimals: 2,
    expectedOutput: "1,234,567.89",
  },
  {
    input: new BN("987654321"),
    decimals: 4,
    expectedOutput: "98,765.4321",
  },
  {
    input: 123456789,
    decimals: 2,
    expectedOutput: "1,234,567.89",
  },
  {
    input: 987654321,
    decimals: 4,
    expectedOutput: "98,765.4321",
  },
];

testData.forEach(({ input, decimals, expectedOutput }) => {
  test(`formatBalance(${input}, ${decimals}) returns "${expectedOutput}"`, () => {
    expect(formatBalance(input, decimals)).toBe(expectedOutput);
  });
});
