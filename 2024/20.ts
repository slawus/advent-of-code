import * as fs from "node:fs";

enum DIRECTION {
  N = 1 << 0,
  E = 1 << 1,
  S = 1 << 2,
  W = 1 << 3,
}

function nextDirection(d: DIRECTION, counter: boolean = false) {
  return (counter ? (((d >> 1) & 15) || DIRECTION.W) : (((d << 1) & 15)) || DIRECTION.N);
}

function vector(direction: DIRECTION) {
  switch (direction) {
    case DIRECTION.N:
      return {x: 0, y: -1};
    case DIRECTION.S:
      return {x: 0, y: 1};
    case DIRECTION.E:
      return {x: 1, y: 0};
    case DIRECTION.W:
      return {x: -1, y: 0};
  }

  return {x: 0, y: 0};
}


function parseInput(input: string): string[][] {
  return input
    .split('\n')
    .filter(Boolean)
    .map(line => line.split(''));
}

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

function solve(matrix: unknown[][], start: { x: number, y: number }, end: { x: number, y: number }) {
  const costs = Array.from({length: matrix.length}).map(() => Array.from({length: matrix[0].length}).fill(Number.MAX_SAFE_INTEGER)) as Number[][];
  const queue = [{position: start, cost: 0, prev: []}];
  const solutions = [];
  let current;
  while ((current = queue.shift()) !== undefined) {
    if ((matrix[current.position.y]?.[current.position.x] ?? "#") === "#") {
      continue;
    }

    if (costs[current.position.y][current.position.x] < current.cost) {
      continue;
    }

    costs[current.position.y][current.position.x] = current.cost;

    if (current.position.y === end.y && current.position.x === end.x) {
      solutions.push({
        ...current,
        prev: [...current.prev, current.position],
      });
      break;
    }

    let direction = DIRECTION.N;
    for (let i = 0; i < 4; i++) {
      const v = vector(direction);
      pushToQueue({
        position: {
          x: current.position.x + v.x,
          y: current.position.y + v.y,
        },
        cost: current.cost + 1,
        prev: [...current.prev, current.position],
      });
      direction = nextDirection(direction);
    }
  }

  function pushToQueue(a) {
    // queue is already sorted
    const index = (queue.findIndex(v => v.cost >= a.cost) ?? 0);
    queue.splice(index, 0, a);
  }

  return {
    solutions,
    costs
  }
}


function part1(solutions: any[], costs: Number[][]) {
  let part1 = 0;
  const path = solutions[0].prev;
  const gains = [];
  for (const pos of path) {
    if (pos.x === 8 && pos.y === 7) {
      console.log("NOW");
    }

    // check all neighbours
    let dir = DIRECTION.N;
    for (let i = 0; i < 4; i++) {
      const v = vector(dir);
      const shortcut = {
        x: pos.x + 2 * v.x,
        y: pos.y + 2 * v.y,
      }

      if ((costs[shortcut.y]?.[shortcut.x] ?? Number.MAX_SAFE_INTEGER) === Number.MAX_SAFE_INTEGER) {
        dir = nextDirection(dir)
        continue;
      }

      const gain = costs[shortcut.y][shortcut.x]! - costs[pos.y][pos.x] - 2;
      gains.push(gain);
      if (gain >= 100) {
        part1++;
      }
      dir = nextDirection(dir)
    }
  }
  return part1;
}

function part2(solutions: any[], costs: Number[][]) {
  const minGain = 100;
  const maxJump = 20;
  const path = solutions[0].prev;
  let count = 0;
  for (let index = 0; index < path.length; index++) {
    const from = path[index];
    for(let j = index + minGain; j < path.length; j++) {
      const to =  path[j];
      const distance = Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
      const gain = j - index - distance;
      if (distance <= maxJump && gain >= minGain) {
        count++;
      }
    }
  }

  return count;
}

function main(input: string) {
  const matrix = parseInput(input);

  // Find start and end positions
  const start = findInMatrix(matrix, 'S');
  const end = findInMatrix(matrix, 'E');

  const {costs, solutions} = solve(matrix, start, end);

  return {
    part1: part1(solutions, costs),
    part2: part2(solutions, costs),
  };
}

const input = fs.readFileSync('inputs/20.txt', 'utf-8');
const result = main(input);
console.log('Result:', result); 