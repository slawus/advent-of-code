function processInput(input: string) {
  return input.split(" ").map(Number);
}

const partialCache = new Map<string, number>();

function processNumber(nr: number, remaining: number = 25) {
  if(remaining == 0) {
    return 1;
  }
  const cacheKey = `${nr}.${remaining}`;

  if(partialCache.has(cacheKey)) {
    return partialCache.get(cacheKey);
  }

  remaining--;
  const str = nr.toString();
  let result: number = 0;
  if(nr === 0) {
    result = processNumber(1, remaining);
  } else if (str.length % 2 === 0) {
    const a = Number((str).slice(0, str.length / 2));
    const b = Number((str).slice(str.length / 2));
    result =  processNumber(a, remaining) + processNumber(b, remaining)
  } else {
    result = processNumber(nr * 2024, remaining);
  }

  partialCache.set(cacheKey, result);

  return result
}

function part1(input: string) {
  const line = processInput(input);
  const sub = line.map(nr => processNumber(nr, 25))

  const res = sub.reduce((acc, res) => acc + res, 0)
  return { res };
}

function part2(input: string) {
  const line = processInput(input);
  const sub = line.map(nr => processNumber(nr, 75))

  const res = sub.reduce((acc, res) => acc + res, 0)
  return { res };
}


import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/11.txt", "utf8");
console.log(part1(input));
console.log(part2(input));