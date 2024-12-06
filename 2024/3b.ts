import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/3.txt", "utf8");

function computeResult(matches: string[], regex: RegExp) {
  let res = 0;
  for (const match of matches) {
    let innerMatches = match.matchAll(regex) as unknown as [[string, string, string]];
    const [[_, a, b]] = [...innerMatches];
    if (a.length > 3 || b.length > 3) {
      continue;
    }
    res += Number(a) * Number(b);
  }
  return res;
}

function findFiltered(input: string) {
  const regMul = /mul\((\d+),(\d+)\)/g
  const regDo = /((don't)|(do))\(\)/g

  let blocked = false;
  const res = [];
  let match: ReturnType<(typeof regMul)["exec"]> ;
  let doMatch: ReturnType<(typeof regMul)["exec"]> = regDo.exec(input);
  while(match = regMul.exec(input)) {
    console.log(match.index);
    while(doMatch && (doMatch?.index ?? 0) < match.index) {
      blocked = doMatch?.[0] === "don't()";
      doMatch = regDo.exec(input);
    }
    if(!blocked) {
      res.push(match?.[0]);
    }
  }

  return res;
}

async function main() {
  const regex = /mul\((\d+),(\d+)\)/g
  const matches = findFiltered(input);

  const res = computeResult(matches, regex);

  return {
    res
  }
}

console.log(main());