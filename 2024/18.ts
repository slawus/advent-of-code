enum DIRECTION {
  N = 1 << 0,
  E = 1 << 1,
  S = 1 << 2 ,
  W = 1 << 3,
}

// const WIDTH = 7;
// const HEIGHT = 7;
// const BYTES = 12;

const WIDTH = 71;
const HEIGHT = 71;
const BYTES = 2957;

function nextDirection(d: DIRECTION, counter: boolean = false) {
  return (counter ? (((d >> 1) & 15) || DIRECTION.W) : (((d << 1) & 15)) || DIRECTION.N);
}

function processInput(input: string) {
  const positions = input.split("\n").map(line => {
    return  line.split(",").map(Number);
  })

  const matrix = Array.from({ length: HEIGHT }).map(() => {
    return Array.from({length: WIDTH}).fill(0);
  })

  for (const position of positions.slice(0, BYTES)) {
    matrix[position[1]][position[0]] = -1;
  }

  return {
    positions,
    matrix,
  }
}

function vector(direction: DIRECTION) {
  switch (direction) {
    case DIRECTION.N:
      return { x: 0, y: -1 };
    case DIRECTION.S:
      return { x: 0, y: 1 };
    case DIRECTION.E:
      return { x: 1, y: 0 };
    case DIRECTION.W:
      return { x: -1, y: 0 };
  }

  return { x: 0, y: 0 };
}

function main(text: string) {

  const { matrix  } = processInput(text);
  const start = {
    x: 0,
    y: 0,
  }

  const costs = JSON.parse(JSON.stringify(matrix));
  const queue = [{ position: start, cost: 0 }];
  const solutions = [];
  let current;
  while((current = queue.shift()) !== undefined) {
    if(current.position.y === HEIGHT - 1 && current.position.x === WIDTH - 1) {
      solutions.push(current);
      break;
    }

    if(costs[current.position.y]?.[current.position.x] ?? -1 < current.cost) {
      continue;
    }

    costs[current.position.y][current.position.x] = current.cost;

    let direction = DIRECTION.N;
    for (let i = 0; i < 4; i++) {
      const v = vector(direction);
      pushToQueue({
        position: {
          x: current.position.x + v.x,
          y: current.position.y + v.y,
        },
        cost: current.cost + 1
      });
      direction = nextDirection(direction);
    }
  }

  function pushToQueue(a) {
    // queue is already sorted
    const index = (queue.findIndex(v => v.cost >= a.cost) ?? 0);

    queue.splice(index, 0, a);
  }

  return solutions[0]?.cost ?? -1;
}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/18.txt", "utf8");
console.log(main(input));