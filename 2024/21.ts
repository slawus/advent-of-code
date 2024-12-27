import {memoize} from "lodash";

function parseInput(input: string) {
  return input.split("\n").map(line => {
    const keys = line.split("");
    const str = keys.filter((v) => !isNaN(v)).join("");
    const number = parseInt(str);
    return {
      keys,
      number,
    }
  })
}


const keypad = `
789
456
123
#0A
`.split("\n").filter(Boolean).map(line => line.split(""));

const robotKeypad = `
#^A
<v>
`.split("\n").filter(Boolean).map(line => line.split(""));


function findInMatrix(matrix: string[][], target: string): { x: number, y: number } | null {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === target) {
        return {y, x};
      }
    }
  }
  return null;
}

function path(matrix, a, b)  {
  let ap = findInMatrix(matrix, a);
  let bp = findInMatrix(matrix, b);
  let obstacle = findInMatrix(matrix, "#");

  const dy = bp.y - ap.y;
  const dx = bp.x - ap.x

  const ymove = Array.from({length: Math.abs(dy)}).fill(dy > 0 ? "v" : "^");
  const xmove = Array.from({length: Math.abs(dx)}).fill(dx > 0 ? ">" : "<");

  let paths;
  //take only L-shaped paths
  if(Math.abs(dx) > 0 && Math.abs(dy) > 0) {
    if(bp.x === obstacle.x && ap.y === obstacle.y) {
      // only go y
      paths = [
        [...ymove, ...xmove, "A"]
      ];
    } else if (bp.y === obstacle.y && ap.x === obstacle.x) {
      paths = [
        [...xmove, ...ymove, "A"]
      ];
    } else {
      paths = [
        [...ymove, ...xmove, "A"],
        [...xmove, ...ymove, "A"],
      ]
    }
  } else {
    paths = [[...xmove, ...ymove, "A"]];
  }


  return paths;
}

const memoPaths = memoize(path, (...args) => [args[0].length, args[1], args[2]].join("_"))

const caches = new Map<any, Map<string, number>>();
caches.set(keypad, new Map());
caches.set(robotKeypad, new Map());

function countInDepth(matrix: string[][], depth: number, code: string[]): number {
  if(depth === 0) {
    return code.length;
  }

  const cache = caches.get(matrix);
  const cacheKey = [depth, code.join(",")].join("_");
  if(cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  let total = 0;
  let prev = "A";
  for (const current of code) {
    const allPaths = memoPaths(matrix, prev, current);
    const costs = allPaths.map(path => countInDepth(robotKeypad, depth -1, path));
    total += Math.min(...costs);
    prev = current;
  }

  cache.set(cacheKey, total);
  return total;
}


function main(input: string) {
  const inputs = parseInput(input);

  let part1 = 0;
  for(const { keys, number } of inputs) {
    const total = countInDepth(keypad, 3, keys);
    part1 += number * total;
  }

  let part2 = 0;
  for(const { keys, number } of inputs) {
    const total = countInDepth(keypad, 26, keys);
    part2 += number * total;
  }

  return { part1, part2 };
}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/21.txt", "utf8");

console.log(main(input));