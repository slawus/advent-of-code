type Matrix = string[][]
type IndexedMatrix = number[][]

function processInput(input: string) {
  return input.split("\n").map(line => line.split(""));
}


function indexMatrix(matrix: Matrix): { indexed: IndexedMatrix, areaMap: Map<number, number> } {
  const width = matrix[0].length;
  const height = matrix.length;
  const alreadyVisited = Array.from({length: height}).map(() => Array.from({length: width}).map(() => false));
  const indexedMatrix = Array.from({length: height}).map(() => Array.from({length: width}).map(() => 0));
  let regionId = 0;
  const areaMap = new Map<number, number>;

  for (let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      if(alreadyVisited[y][x]) {
        continue;
      }
      regionId++;

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
        indexedMatrix[y][x] = regionId;
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

      areaMap.set(regionId, area);
    }
  }

  return {
    indexed: indexedMatrix,
    areaMap,
  }
}

function erode(matrix: IndexedMatrix) {
  const width = matrix[0].length;
  const height = matrix.length;

  const eroded = JSON.parse(JSON.stringify(matrix))
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const curr = matrix[y][x];

      const neighbours = new Set();
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if(dx ===0 && dy === 0) {
            continue;
          }

          neighbours.add(matrix[y+dy]?.[x+dx]);
        }
      }

      if(neighbours.has(curr) && neighbours.size === 1) {
        //internal
        eroded[y][x] = 0;
      }
    }
  }

  return eroded;
}

function filterAllButCorners(matrix: IndexedMatrix) {
  const width = matrix[0].length;
  const height = matrix.length;

  const filtered = JSON.parse(JSON.stringify(matrix))
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const curr = matrix[y][x];

      const neighbours = [];
      for (let i = -2; i < 2; i++) {
        const dx = (i % 2);
        const dy = ((i + 1) % 2);

        if(matrix[y+dy]?.[x+dx] === curr) {
          neighbours.push([y+dy, x+dx]);
        }

        if(neighbours.length === 2) {
          const [a, b] = neighbours;
          if(a[0] !== b[0] && a[1] !== b[1]) {
            filtered[y][x] = curr;
          } else {
            filtered[y][x] = 0;
          }
        }
      }
    }
  }

  return filtered;
}

function resize(matrix: IndexedMatrix, factor = 4) {
  const originalWidth = matrix[0].length;
  const originalHeight = matrix.length;

  const width = originalWidth * factor;
  const height = originalHeight * factor;

  return Array.from({ length: height }).map((_, y) => {
    return Array.from({
      length: width,
    }).map((_, x) => {
      return matrix[Math.floor(y / factor)][Math.floor(x / factor)];
    })
  })
}

function main(input: string, part2: boolean) {
  const matrix = processInput(input);

  const { indexed, areaMap } = indexMatrix(matrix);
  const resized = resize(indexed);
  const eroded = erode(resized);
  const justCorners = filterAllButCorners(eroded);

  const cornersList = justCorners.flatMap(arr => arr).filter(corner => corner !== 0);

  let score = 0;
  areaMap.keys().forEach(regionId => {
    const nr = cornersList.filter(c => c === regionId).length;
    score += nr * areaMap.get(regionId);
  })

  return { score }
}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/12.txt", "utf8");
console.log(main(input, true));