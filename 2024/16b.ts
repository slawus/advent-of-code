enum DIRECTION {
  N = 1 << 0,
  E = 1 << 1,
  S = 1 << 2 ,
  W = 1 << 3,
}

function nextDirection(d: DIRECTION, counter: boolean = false) {
  return (counter ? (((d >> 1) & 15) || DIRECTION.W) : (((d << 1) & 15)) || DIRECTION.N);
}

function processInput(input: string) {
  const matrix = input.split("\n").map(line => {
    return  line.split("");
  })

  return {
    matrix,
  }
}

function findInMatrix(matrix, toFind: string, { startX = 0, endX = matrix[0].length - 1, startY = 0, endY = matrix.length - 1, blocker }: {startX?:number, endX?:number, startY?: number, endY?: number, blocker?: string} = {}) {
  const dirX = Math.sign(endX - startX) || 1;
  const dirY = Math.sign(endY - startY) || 1;

  for (let x = startX; x*dirX <= endX*dirX; x = x + dirX) {
    for (let y = startY; y*dirY <= endY*dirY; y = y + dirY) {
      if(matrix[y][x] === toFind) {
        return { y, x };
      }

      if(matrix[y][x] === blocker) {
        return null;
      }
    }
  }

  return null;
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

  const { matrix } = processInput(text);
  const start = findInMatrix(matrix, "S");
  const costs = new Map<string, number>();

  const queue = [{ position: start, direction: DIRECTION.E, cost: 0, moves: 0, visited: []}];
  let current;
  const solutions = [];
  while((current = queue.shift()) !== undefined) {
    if((matrix[current.position.y]?.[current.position.x] ?? "#") === "#") {
      continue;
    }

    if(matrix[current.position.y]?.[current.position.x] === "E") {
      solutions.push(current);
      continue;
    }

    const posId = [current.position.x, current.position.y, current.direction].join(".");
    if((costs.get(posId) ?? Number.MAX_SAFE_INTEGER) < current.cost) {
      continue;
    }

    if((solutions[0]?.cost ?? Number.MAX_SAFE_INTEGER) < current.cost) {
      continue;
    }

    // if(current.visited.some(p => p.x === current.position.x && p.y === current.position.y)) {
    //   continue;
    // }

    costs.set(posId, current.cost);

    const v = vector(current.direction);
    const nextInLine = {
      position: {
        x: current.position.x + v.x,
        y: current.position.y + v.y,
      },
      cost: current.cost + 1,
      direction: current.direction,
      moves: current.moves+1,
      visited: [...current.visited, current.position],
    }

    pushToQueue(nextInLine)
    const dir1 = nextDirection(current.direction);
    const v1 = vector(dir1);
    pushToQueue({
      cost: current.cost + 1001,
      direction: dir1,
      position: {
        x: current.position.x + v1.x,
        y: current.position.y + v1.y,
      },
      moves: current.moves + 1,
      visited: [...current.visited, current.position],
    })

    const dir2 = nextDirection(current.direction, true);
    const v2 = vector(dir2);
    pushToQueue({
      cost: current.cost + 1001,
      direction: dir2,
      position: {
        x: current.position.x + v2.x,
        y: current.position.y + v2.y,
      },
      moves: current.moves + 1,
      visited: [...current.visited, current.position],
    });
  }

  const map = JSON.parse(JSON.stringify(matrix));
  for (const solution of solutions) {
    for (const pos of solution.visited) {
      map[pos.y][pos.x] = "0"
    }
  }

  function pushToQueue(a) {
    // queue is already sorted
    const index = (queue.findIndex(v => v.cost - v.moves >= a.cost - a.moves) ?? 0);

    queue.splice(index, 0, a);
  }

  //1 is for end
  const res = 1 + map.flatMap(m => m).filter(v => v === "0").length;

  return {res};
  // throw new Error("Can't find end!")
}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/16.txt", "utf8");
console.log(main(input));