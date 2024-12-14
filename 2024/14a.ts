function processInput(input: string) {
  const lines = input.split("\n")

  return lines.map(line => {
    const [,x,y,vx,vy] = line.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/).map(Number);
    return {
      x,y,vx,vy,
    }
  })
}

function main(text: string) {

  const tasks = processInput(text);
  const width = 101;
  const height = 103;
  const iterations = 100;

  // for(let i = 0; i < 100; i++) {
    tasks.forEach((task) => {
      task.x = (((task.x + task.vx* iterations) % width) + width) % width;
      task.y = (((task.y + task.vy* iterations) % height) + height) % height;
    })
  // }


  // group
  let groups = {
    0: [],
    1: [],
    2: [],
    3: [],
  }
  tasks.forEach((item) => {
    if(item.x < Math.floor(width / 2)) {
      if(item.y < Math.floor(height / 2)) {
        groups[0].push(item);
      } else if (item.y > Math.floor(height / 2)) {
        groups[1].push(item);
      }
    } else if (item.x > Math.floor(width / 2)) {
      if(item.y < Math.floor(height / 2)) {
        groups[2].push(item);
      } else if (item.y > Math.floor(height / 2)) {
        groups[3].push(item);
      }
    }
  });


  const res = groups["0"].length * groups["1"].length * groups["2"].length * groups["3"].length;

  return { res };

}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/14.txt", "utf8");
console.log(main(input));