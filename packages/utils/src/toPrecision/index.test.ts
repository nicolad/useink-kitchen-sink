import BN from "bn.js";
import { toPrecision } from "./index";

const testData = [
  {
    input: new BN("12345678"),
    precision: 3,
    expectedOutput: "123456.78",
  },
  {
    input: new BN("987654321"),
    precision: 2,
    expectedOutput: "98765432.1",
  },
  {
    input: new BN("123456789"),
    precision: 8,
    expectedOutput: "12.3456789",
  },
];

testData.forEach(({ input, precision, expectedOutput }) => {
  test(`toPrecision(${input}, ${precision}) returns "${expectedOutput}"`, () => {
    expect(toPrecision(input, precision)).toBe(expectedOutput);
  });
});
