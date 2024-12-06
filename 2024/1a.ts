async function main(input: string): Promise<void> {
  const [left, right] = input.split("\n").reduce<[number[], number[]]>(([left, right], line) => {
    const vals = line.split(" ").filter(v => v !== "").map(v => Number(v.trim()));
    left.push(vals[0]);
    right.push(vals[1]);
    return [left, right];
  }, [[],[]])


  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let diffsSum = 0;
  for (let i = 0; i < right.length; i++) {
    diffsSum += Math.abs(left[i] - right[i]);
  }

  console.log(diffsSum);
}

import * as fs from "node:fs"

const input = fs.readFileSync("./inputs/1.txt", "utf8");
main(input);