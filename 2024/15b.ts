function processInput(input: string) {
  const [mapStr, instructionsStr] = input.split('\n\n');

  const matrix = mapStr.split("\n").map(line => {
    return  line.split("").flatMap(v => {
      switch (v) {
        case "#":
          return ["#","#"];
        case "@":
          return ["@","."];
        case ".":
          return [".","."];
        case "O":
          return ["[","]"];
      }
    });
  })

  const instructions = instructionsStr.split("\n").join("");

  return {
    matrix,
    instructions,
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

function direction(str:string) {
  switch (str) {
    case "^":
      return { x: 0, y: -1 };
    case "v":
      return { x: 0, y: 1 };
    case ">":
      return { x: 1, y: 0 };
    case "<":
      return { x: -1, y: 0 };
  }

  return { x: 0, y: 0 };
}

function attemptMove(position, dir, matrix, dry: boolean = false) {
  const nextPosition = {
    x: position.x + dir.x,
    y: position.y + dir.y,
  }
  const axis = dir.x !== 0 ? "x" : "y";

  let success = false;
  const neighbour = matrix[nextPosition.y]?.[nextPosition.x] ?? null;
  if(!neighbour || neighbour === "#") {
    return false;
  }

  if(neighbour === ".") {
    success = true;
  } else if (["[", "]"].includes(neighbour)) {
    if(axis === "y") {
      success = attemptMove(nextPosition, dir, matrix, true) && attemptMove({ x: nextPosition.x + (neighbour === "[" ? 1 : -1), y: nextPosition.y}, dir, matrix, true);
      if(success && !dry) {
        attemptMove(nextPosition, dir, matrix, false);
        attemptMove({ x: nextPosition.x + (neighbour === "[" ? 1 : -1), y: nextPosition.y}, dir, matrix, false);
      }
    } else {
      success = attemptMove(nextPosition, dir, matrix, true);
      if(success && !dry) {
        attemptMove(nextPosition, dir, matrix, false);
      }
    }
  }

  if(success && !dry) {
    matrix[nextPosition.y][nextPosition.x] = matrix[position.y][position.x];
    matrix[position.y][position.x] = "."
  }

  return success;
}

function main(text: string) {

  const { matrix, instructions } = processInput(text);
  const position = findInMatrix(matrix, "@");

  // find starting position
  for (const move of instructions) {
    const dir = direction(move);
    const success = attemptMove(position, dir, matrix);
    if(success) {
      position.x += dir.x;
      position.y += dir.y;
    }
  }

  let sum = 0;
  for (let x = 0; x < matrix[0].length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      if(matrix[y][x] === "[") {
        sum += 100 * y + x;
      }
    }
  }

  return sum;
}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/15.txt", "utf8");
console.log(main(input));