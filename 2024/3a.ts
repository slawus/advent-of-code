import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/3.txt", "utf8");

async function main() {
  const regex = /mul\((\d+),(\d+)\)/g
  const matches = input.match(regex)
  let res = 0;
  for(const match of matches) {
    let innerMatches = match.matchAll(regex) as unknown as [[string, string, string]];
    const [[_, a, b]] = [...innerMatches];
    if(a.length > 3 || b.length > 3) {
      console.log("TOO BIG NUMBER");
      continue;
    }
    res += Number(a) * Number(b);
  }

  return {
    res
  }
}


console.log(main());