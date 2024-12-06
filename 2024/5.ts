function main(input: string): { score: number } {

  const { rules, updates } = parseInput(input);
  const preRulesMap = new Map();
  rules.forEach(([a, b]) => {
    const preArr = (preRulesMap.get(b) ?? []);
    preArr.push(a);
    preRulesMap.set(b, preArr);
  })

  let score = 0;

  for (const update of updates) {
    const sorted = [...update].sort((a, b) => {
      if(preRulesMap.get(a)?.includes(b)) {
        return 1;
      }

      if(preRulesMap.get(b)?.includes(a)) {
        return -1;
      }

      return 0;
    });

    // check if match after sort
    if(update.join(",") === sorted.join(",")) {
      console.log("success");
      score += update[Math.floor(update.length / 2)]!
    } else {
      console.log("error");
    }
  }

  return { score }
}

function parseInput(input: string) {
  const lines = input.split(/\r?\n/);
  const breaklineIndex = lines.findIndex(l => l.trim() === "");

  const rules = lines.slice(0, breaklineIndex).map(l => l.split("|").map(Number));
  const updates = lines.slice(breaklineIndex+1).map(l => l.split(",").map(Number));

  return {
    rules,
    updates
  }
}

import * as fs from "node:fs";

const data = fs.readFileSync("./inputs/5.txt", "utf8");
main(data);