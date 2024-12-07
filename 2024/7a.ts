interface Line {
  result: number,
  numbers: number[],
}

function processInput(input: string): Line[] {
  const lines = input.split('\n');
  return lines.map(l => {
    const [left, right] = l.split(":");
    const result = Number(left);
    const numbers  = right.trim().split(" ").map(Number);

    return {
      result,
      numbers,
    }
  })
}

function processLine(l: Line) {
  const success = makeOperation(0, l.numbers, 0, "+", l.result);

  return {success};
}

function makeOperation(input: number, numbers: number[], index: number, operation: "+" | "*", result: number): boolean {
  const b = numbers[index];
  if(!b) {
    return input === result;
  }

  if (operation === "+") {
    input += b;
  } else {
    input *= b;
  }

  if (input > result) {
    return false;
  }

  return makeOperation(input, numbers, index+1, "*", result) || makeOperation(input, numbers, index+1, "+", result);
}

function main(input: string) {
  const lines = processInput(input);
  let sum = BigInt(0);

  for (const line of lines) {
    const { success } = processLine(line)
    if(success) {
      sum += BigInt(line.result);
    }
  }


  return { sum }
}

import * as fs from "node:fs";

const input = fs.readFileSync("./inputs/7.txt", "utf8");
console.log(main(input))