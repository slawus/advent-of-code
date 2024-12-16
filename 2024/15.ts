function processInput(input: string) {
  const [mapStr, instructionsStr] = input.split('\n\n');

  const matrix = mapStr.split("\n").map(line => {
    return  line.split("");
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
// <^^>>>vv<v>>v<<
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


function main(text: string) {

  const { matrix, instructions } = processInput(text);
  const position = findInMatrix(matrix, "@");

  // find starting position
  for (const move of instructions) {
    const dir = direction(move);
    let row = undefined;
    let column = undefined;

    let nextSpace;
    if(dir.x !== 0) {
      nextSpace = findInMatrix(matrix, ".", { endX: dir.x < 0 ? 0 : undefined, startX: position.x, startY: position.y, endY: position.y, blocker: "#" });
    } else {
      nextSpace = findInMatrix(matrix, ".", { endY: dir.y < 0 ? 0 : undefined, startY: position.y, startX: position.x, endX: position.x, blocker: "#" });
    }

    if(nextSpace) {
      const dirX = dir.x || 1;
      const dirY = dir.y || 1;
      position.x += dir.x;
      position.y += dir.y;

      for(let x = nextSpace.x; x*dirX >= position.x*dirX; x = x - dirX) {
        for(let y = nextSpace.y; y*dirY >= position.y*dirY; y = y - dirY) {
          // move space
          const el = matrix[y - dir.y][x - dir.x]
          matrix[y - dir.y][x - dir.x] = matrix[y][x];
          matrix[y][x] = el;
        }
      }
    }
  }

  console.log(position);

  let sum = 0;
  for (let x = 0; x < matrix[0].length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      if(matrix[y][x] === "O") {
        sum += 100 * y + x;
      }
    }
  }

  return sum;
}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/15.txt", "utf8");
console.log(main(input));