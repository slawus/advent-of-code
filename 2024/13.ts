function processInput(input: string) {
  const taskStr = input.split("\n\n")

  return taskStr.map(str => {
    const [, ax, ay] = str.match(/Button A: X\+(\d+), Y\+(\d+)/)
    const [, bx, by] = str.match(/Button B: X\+(\d+), Y\+(\d+)/);
    const [, X, Y] = str.match(/Prize: X=(\d+), Y=(\d+)/);

    return {
      ax: Number(ax),
      bx: Number(bx),
      ay: Number(ay),
      by: Number(by),
      X: Number(X),
      Y: Number(Y),
    }
  })

}

function main(text: string) {

  const tasks = processInput(text);

  const moves = tasks.map(({ X, Y, bx, by, ay, ax }) => {
    const a = (X*by - Y * bx) / (ax*by - ay * bx);
    const b = (Y - ay* a) / by;

    if(!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || a > 100 || b < 0 || b > 100) {
      // not valid
      return null;
    }

    return [a, b];
  })

  const sum = moves.filter(m => m !== null).reduce((acc, [a, b]) => acc + a * 3 + b, 0);
  return {
    sum
  }
}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/13.txt", "utf8");
console.log(main(input));