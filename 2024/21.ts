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


function codeToRobot(keypadMatrix, sequence) {
  let position = findInMatrix(keypadMatrix, "A");
  let obstacle = findInMatrix(keypadMatrix, "#");
  const result: string[] = [];

  for (const key of sequence) {
    const newPosition = findInMatrix(keypadMatrix, key);
    const dy = newPosition.y - position.y;
    const dx = newPosition.x - position.x

    const ymove = Array.from({length: Math.abs(dy)}).fill(dy > 0 ? "v" : "^");
    const xmove = Array.from({length: Math.abs(dx)}).fill(dx > 0 ? ">" : "<");

    let subsequence;
    if (newPosition.x === obstacle.x) {
      //first do y
      subsequence = [...ymove, ...xmove];
    } else {
      subsequence = [...xmove, ...ymove];
    }
    position = newPosition;

    result.push(...subsequence, "A");
  }

  return result;
}

function permute(permutation) {
  var length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0),
    i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}


function codeToRobotAll(keypadMatrix, sequence, index: number, position = findInMatrix(keypadMatrix, "A")) {
  const key = sequence[index];
  if(key === undefined) {
    return [];
  }

  if(key === "#") {
    return false;
  }

  const newPosition = findInMatrix(keypadMatrix, key);
  const dy = newPosition.y - position.y;
  const dx = newPosition.x - position.x

  const ymove = Array.from({length: Math.abs(dy)}).fill(dy > 0 ? "v" : "^");
  const xmove = Array.from({length: Math.abs(dx)}).fill(dx > 0 ? ">" : "<");

  const alreadySeen = new Set();
  const permutations = permute([...xmove, ...ymove]).filter(v => {
    if(alreadySeen.has(v.join(""))) {
      return false;
    }

    alreadySeen.add(v.join(""));
    return true;
  });


  const results = permutations.flatMap(p => {
    const res = [...p, "A"];
    const restPermutations = codeToRobotAll(keypadMatrix, sequence, index+1, newPosition);
    if(restPermutations === false) {
      return [];
    }

    if(restPermutations.length > 0) {
      return restPermutations.map(v => [...res, ...v]);
    }

    return [res];
  });

  return results;
}

const cacheGlobal = new Map<any, Map<string, string[]>>();
cacheGlobal.set(robotKeypad, new Map());
cacheGlobal.set(keypad, new Map());

function codeToRobotRecursive(keypadMatrix, sequence, index: number, position = findInMatrix(keypadMatrix, "A")) {
  const cacheKey = sequence.join("")+`:${index}:${position.x}${position.y}`;
  const cache = cacheGlobal.get(keypadMatrix);
  if(cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const key = sequence[index];
  if(key === undefined) {
    return [];
  }

  const currentKey = keypadMatrix[position.y][position.x];
  if(currentKey === "#") {
    return null;
  }

  const newPosition = findInMatrix(keypadMatrix, key);
  let result;
  if(newPosition.y === position.y && newPosition.x === position.x) {
    index++;
    const sub = codeToRobotRecursive(keypadMatrix, sequence, index, position);
    if(sub) {
      result = sub.length > 0 ? sub.map(v => ["A", ...v]): ["A"];
    } else {
      result = null;
    }
  } else {
    const dy = newPosition.y - position.y;
    const dx = newPosition.x - position.x
    result = [];

    const ymove = dy > 0 ? "v" : "^";
    const xmove = dx > 0 ? ">" : "<";

    let sub = [];
    if(Math.abs(dx) > 0) {
      sub = codeToRobotRecursive(keypadMatrix, sequence, index, {
        x: position.x + Math.sign(dx),
        y: position.y
      });
      if(sub) {
        result = [
          ...result,
          ...sub.length > 0 ? sub.map(v => [xmove, ...v]): [xmove],
        ]
      }
    }

    if(Math.abs(dy) > 0) {
      sub = codeToRobotRecursive(keypadMatrix, sequence, index, {
        x: position.x,
        y: position.y + Math.sign(dy)
      });
      if(sub) {
        result = [
          ...result,
          ...sub.length > 0 ? sub.map(v => [ymove, ...v]) : [ymove],
        ]
      }
    }
  }

  cache.set(cacheKey, result);
  return result;
}

function reverseRobotSequence(matrix, sequence) {

  let currentPosition = findInMatrix(matrix, "A");
  let output = [];

  for (let sign of sequence) {
    if (sign === ">") {
      currentPosition.x++;
    } else if (sign === "<") {
      currentPosition.x--;
    } else if (sign === "^") {
      currentPosition.y--;
    } else if (sign === "v") {
      currentPosition.y++;
    } else if (sign === "A") {
      output.push(matrix[currentPosition.y][currentPosition.x]);
    }
  }

  return output;
}

function combinePartials(arr: Array<string[]>) {

  const [
    first,
    ...rest
  ] = arr;

  if(first === undefined) {
    return null;
  }

  return first.flatMap(v => {
    const res = combinePartials(rest);
    if(res) {
      return res.map(p => [v, ...p])
    }
    else {
      return [[v]];
    }
  })
}

function main(input: string) {
  const inputs = parseInput(input);

  let score = 0;
  for(const { keys, number } of inputs) {
    const p = codeToRobotRecursive(keypad, keys, 0).flatMap(a1 => {
      return codeToRobotRecursive(robotKeypad, a1, 0)
        .flatMap(a2 => {
          return [codeToRobot(robotKeypad, a2, 0)];
        })
    })

    const shortest = p.sort((a, b) => a.length - b.length)[0];
    console.log(number, shortest.length);
    score += number * shortest.length;
  }

  return score;
}


import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/21.txt", "utf8");

console.log(main(input));