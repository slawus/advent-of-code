function processInput(input: string) {
  return input.split("\n").map(line => line.split("").map(Number));
}

function main(input: string, part2: boolean) {
  const matrix = processInput(input);

  const width = matrix[0].length;
  const height = matrix.length;

  const allTrailheads = [];
  for (let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
      if(matrix[i][j] === 0) {
        allTrailheads.push([i, j]);
      }
    }
  }

  const scores = [];
  for (const trailhead of allTrailheads) {
    let score = 0;
    const alreadyVisited = Array.from({length: height}).map(() => Array.from({length: width}).map(() => false));
    const toVisit = [trailhead];
    let point;
    while((point = toVisit.pop()) !== undefined) {
      const [y, x] = point;
      if(!part2) {
        if(alreadyVisited[y][x]) {
          continue;
        }
        alreadyVisited[y][x] = true;
      }

      const current = matrix[y][x];
      if(current === 9) {
        score++;
        continue;
      }

      // check all neighbours
      for (let i = -2; i < 2; i++) {
        const dx = (i % 2);
        const dy = ((i + 1) % 2);

        if(matrix[y+dy]?.[x+dx] === current+1) {
          toVisit.push([y+dy, x+dx]);
        }
      }
    }

    scores.push(score)
  }


  const sum = scores.reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0)

  return { sum }
}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/10.txt", "utf8");
console.log(main(input, true));