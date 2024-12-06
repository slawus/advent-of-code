async function main(input: string) {
  const [left, right] = input.split("\n").reduce<[number[], number[]]>(([left, right], line) => {
    const vals = line.split(" ").filter(v => v !== "").map(v => Number(v.trim()));
    left.push(vals[0]);
    right.push(vals[1]);
    return [left, right];
  }, [[],[]])


  let sum = 0;
  const countInRight = countMap(right);
  for (const el of left) {
    sum += el * (countInRight.get(el) ?? 0)
  }

  console.log({
    sum
  })
}

function countMap(list: number[]) {
  const map = new Map();
  for(const el of list) {
    map.set(el, (map.get(el) ?? 0) + 1)
  }

  return map;
}

import * as fs from "node:fs"

const input = fs.readFileSync("./inputs/1.txt", "utf8");
main(input);