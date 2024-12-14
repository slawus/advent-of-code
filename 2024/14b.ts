function processInput(input: string) {
  const lines = input.split("\n")

  return lines.map(line => {
    const [,x,y,vx,vy] = line.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/).map(Number);
    return {
      x,y,vx,vy,
    }
  })
}
/// assumption - they will form a christmas tree if most of the items will have similar y
// cimpute averageny, and median distance to avg and simulate 10000 seconds



function main(text: string) {

  const tasks = processInput(text);
  const width = 101;
  const height = 103;
  const iterations = width * height; // due to modulo div patterns will loop afterwards

  const res = [];
  for(let i = 1; i <= iterations; i++) {
    // console.clear()
    // console.log("Iteration " + i);
    // print(tasks);
    // require('child_process').spawnSync("read _ ", {shell: true, stdio: [0, 1, 2]});

    tasks.forEach((task) => {
      task.x = ((task.x + task.vx)  + width) % width;
      task.y = ((task.y + task.vy) + height) % height;
    })

    const neighbours = countNeighbours(tasks);
    const xarr = tasks.map(t => t.x);
    xarr.sort((a, b) => a - b)
    const avg = Math.round(xarr.reduce((a, b) => a + b, 0) / tasks.length);
    const med = xarr[Math.floor((xarr.length - 1) / 2)];
    const dist = xarr.map(x => Math.abs(med - x)).reduce((a, b) => a + b, 0) / tasks.length;

    res.push({i, dist, avg, med, neighbours})
  }

  res.sort((a, b) => b.neighbours - a.neighbours);

  // the one with most neighbours
  return res[0];

}

function print(tasks) {
  const matrix = Array.from({length: 103}).map(() => Array.from({length: 101}).fill("."));

  for (const task of tasks) {
    matrix[task.y][task.x] = "#";
  }

  for (const line of matrix) {
    console.log(line.join(""));
  }
}

function countNeighbours(tasks) {
  const matrix = Array.from({length: 103}).map(() => Array.from({length: 101}).fill("."));

  for (const task of tasks) {
    matrix[task.y][task.x] = "#";
  }

  let counter = 0;
  for (const task of tasks) {
    const neighbours = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if(x===0 && y ===0) {
          continue;
        }
        neighbours.push(matrix[task.y + y]?.[task.x + x]);
      }
    }

    if(neighbours.includes("#")) {
      counter++;
    }
  }

  return counter;
}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/14.txt", "utf8");
console.log(main(input));