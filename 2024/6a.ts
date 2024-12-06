import * as fs from "node:fs";

enum DIRECTION {
  N = 1 << 0,
  E = 1 << 1,
  S = 1 << 2 ,
  W = 1 << 3,
}

interface Point {
  x: number;
  y: number;
}

function move(p: Point, direction: DIRECTION): Point {
  const newP = {
    ...p
  };
  switch(direction) {
    case DIRECTION.N:
      newP.y--
      break;
    case DIRECTION.E:
      newP.x++;
      break;
    case DIRECTION.S:
      newP.y++;
      break;
    case DIRECTION.W:
      newP.x--;
  }

  return newP;
}

function isBlocked(matrix: number[][], p: Point) {
  const value = (matrix[p.y]?.[p.x]);
  return value === -1;
}


function isOutside(matrix: number[][], p: Point) {
  const value = (matrix[p.y]?.[p.x] ?? -2);

  return value === -2;
}

function alreadyVisited(matrix: number[][], position: Point, direction:DIRECTION) {
  return Boolean(matrix[position.y][position.x] & direction);
}


function nextDirection(d: DIRECTION) {
  return ((d << 1) & 15) || DIRECTION.N;
}

function processInput(text: string): { matrix: number[][], width, height, start: Point, direction: DIRECTION } {
  const lines = text.split('\n');
  const width = lines[0].length;
  const height = lines.length;

  const matrix = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
  let start: Point;
  let direction: DIRECTION;
  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      let isStart = false;
      switch(lines[y][x]) {
        case ".":
          break;
        case "#":
          matrix[y][x] = -1;
          break;
        case "^":
          direction = DIRECTION.N;
          isStart = true;
          break;
        case ">":
          direction = DIRECTION.E;
          isStart = true;
          break;
        case "<":
          direction = DIRECTION.W;
          isStart = true;
          break;
        case "v":
          direction = DIRECTION.S;
          isStart = true;
          break;
      }
      if (isStart) {
        start = {
          x,
          y
        }
      }
    }
  }

  return {
    start,
    direction,
    matrix,
    width,
    height,
  }
}

function main(text: string) {
  const { matrix, direction: d, start } = processInput(text);

  let position = start;
  let steps = 0;
  let direction = d;
  while(!alreadyVisited(matrix, position, direction)) {
    steps +=1
    matrix[position.y][position.x] = matrix[position.y][position.x] | direction;

    const nextPosition = move(position, direction);
    if(isOutside(matrix, nextPosition)) {
      break;
    } else if(isBlocked(matrix, nextPosition)) {
      direction = nextDirection(direction);
    } else {
      position = nextPosition;
    }
  }

  const distinctFields = matrix.flatMap(line => line).filter(field => field > 0).length;

  return {
    steps,
    distinctFields,
  }
}

const input = fs.readFileSync("./inputs/6.txt", "utf8");
main(input);


/// HELPERS

function debugMatrix(matrix: number[][]) {
  const graph = matrix.map(m => m.map(v => v > 0 ? "X" : v === -1 ? "#" : ".").join("")).join("\n");
  console.log(graph);
}