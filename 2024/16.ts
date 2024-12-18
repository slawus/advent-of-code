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
  const alreadyVisited = Array.from({ length: matrix.length}).map(() =>
    Array.from({ length: matrix[0].length }).fill(0))



  const queue = [{ position: start, direction: DIRECTION.E, cost: 0, moves: 0}];
  let current;
  const solutions = [];
  while((current = queue.shift()) !== undefined) {
    if((alreadyVisited[current.position.y]?.[current.position.x] ?? current.direction) & current.direction) {
      continue;
    }

    if((matrix[current.position.y]?.[current.position.x] ?? "#") === "#") {
      continue;
    }

    if(matrix[current.position.y]?.[current.position.x] === "E") {
      solutions.push(current);
      continue;
    }

    alreadyVisited[current.position.y][current.position.x] = alreadyVisited[current.position.y][current.position.x] | current.direction;

    const v = vector(current.direction);
    const nextInLine = {
      position: {
        x: current.position.x + v.x,
        y: current.position.y + v.y,
      },
      cost: current.cost + 1,
      direction: current.direction,
      moves: current.moves+1,
    }

    pushToQueue(nextInLine)
    pushToQueue({
      cost: current.cost + 1000,
      direction: nextDirection(current.direction),
      position: current.position,
      moves: current.moves,
    })
    pushToQueue({
      cost: current.cost + 1000,
      direction: nextDirection(current.direction, true),
      position: current.position,
      moves: current.moves,
    })
  }

  function pushToQueue(a) {
    // queue is already sorted
    const index = (queue.findIndex(v => v.cost >= a.cost) ?? 0);

    queue.splice(index, 0, a);
  }

  return solutions;
  // throw new Error("Can't find end!")
}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/16.txt", "utf8");
console.log(main(input));