function processInput(input: string): string[][] {
  const lines = input.split('\n');
  return lines.map(l => {
    return l.trim().split("").filter(n => n !== "");
  })
}

function findPositionsMap(matrix: string[][]): Map<string, Array<[number, number]>> {
  const map = new Map<string, Array<[number, number]>>();

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if(matrix[y][x] !== ".") {
        const arr = map.get(matrix[y][x]) ?? [] as Array<[number, number]>;
        arr.push([x, y]);
        map.set(matrix[y][x], arr);
      }
    }
  }

  return map;
}

function fillAntinodes(matrix: string[][], map: Map<string, Array<[number, number]>>): void {
  const height = matrix.length;
  const width = matrix[0].length;

  for (let key of [...map.keys()]) {
    const points = map.get(key);
    for (let mainPoint of points) {
      for (let otherPoint of points) {
        if(mainPoint === otherPoint) {
          continue;
        }

        const x = mainPoint[0] - (otherPoint[0] - mainPoint[0]);
        const y = mainPoint[1] - (otherPoint[1] - mainPoint[1]);
        if(x < 0 || x >= width || y < 0 || y >= height) {
          continue;
        }
        matrix[y][x] = "#"
      }
    }
  }
}

function fillAntinodesPart2(matrix: string[][], map: Map<string, Array<[number, number]>>): void {
  const height = matrix.length;
  const width = matrix[0].length;

  for (let key of [...map.keys()]) {
    const points = map.get(key);
    for (let mainPoint of points) {
      for (let otherPoint of points) {
        if(mainPoint === otherPoint) {
          continue;
        }
        const dx = -(otherPoint[0] - mainPoint[0]);
        const dy = -(otherPoint[1] - mainPoint[1]);

        let x = mainPoint[0];
        let y = mainPoint[1];

        while(!(x < 0 || x >= width || y < 0 || y >= height)) {
          matrix[y][x] = "#"
          x+=dx;
          y+=dy;
        }
      }
    }
  }
}

function main(input: string) {
  const matrix = processInput(input);
  const positions = findPositionsMap(matrix);

  const matrixCopy = JSON.parse(JSON.stringify(matrix));
  fillAntinodesPart2(matrixCopy, positions);
  const count = matrixCopy.flatMap(v => v).filter((v) => v === "#").length;

  return { count }
}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/8.txt", "utf8");
console.log(main(input))