function processInput(input: string) {
  return input.split("\n").map(line => line.split(""));
}

function main(input: string, part2: boolean) {
  const matrix = processInput(input);

  const width = matrix[0].length;
  const height = matrix.length;
  const alreadyVisited = Array.from({length: height}).map(() => Array.from({length: width}).map(() => false));
  const regions = [];

  for (let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      if(alreadyVisited[y][x]) {
        continue;
      }

      const toVisit = [[y,x]];
      let area = 0;
      let perimeter = 0;
      const current = matrix[y][x];

      let point;
      while((point = toVisit.pop()) !== undefined) {
        const [y, x] = point;
        if(alreadyVisited[y]?.[x] === true) {
          continue;
        }
        area++;

        alreadyVisited[y][x] = true;

        // check all neighbours
        for (let i = -2; i < 2; i++) {
          const dx = (i % 2);
          const dy = ((i + 1) % 2);

          if(matrix[y+dy]?.[x+dx] === current) {
            toVisit.push([y+dy, x+dx]);
          } else {
            perimeter++;
          }
        }
      }

      regions.push([area, perimeter]);
    }
  }

  return { regions, sum: regions.reduce((acc, [area, perimeter]) => acc + area  * perimeter, 0) }
}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/12.txt", "utf8");
console.log(main(input, true));