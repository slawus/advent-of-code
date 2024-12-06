import * as fs from "node:fs";

function main(input: string) {

  const matrix = input.toUpperCase().split("\n");
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ] as Array<[number, number]>
  let count = 0;

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      const start = matrix[r][c];
      if(start !== "X") {
        continue;
      }

      for (const direction of directions) {
        const match = traverseSearch(r, c, matrix, direction, "XMAS")
        if(match) {
          count++;
        }
      }
    }
  }

  return {
    count
  }
}

function traverseSearch(x, y, matrix: string[], direction: [number, number], match: string): boolean {
  let text = "";
  const len = match.length;

  for (let i = 0; i < len; i++) {
    const char = matrix[x + i * direction[0]]?.charAt(y + i * direction[1]);
    if (char === undefined) {
      break;
    }
    text += char;
  }

  return (text === match);
}

console.log(main(fs.readFileSync("./inputs/4.txt", "utf8")));