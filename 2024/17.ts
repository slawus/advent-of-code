function processInput(text: string) {

  const a = Number(text.match(/Register A: (\d+)/)[1]);
  const b = Number(text.match(/Register B: (\d+)/)[1]);
  const c = Number(text.match(/Register C: (\d+)/)[1]);
  const program = text.match(/Program: (.+)/)[1].split(",").map(Number);


  return {
    registers: {
      a,
      b,
      c,
    },
    program,
  }

}


function main(text: string) {
  let { registers, program } =  processInput(text);
  let pointer = 0;
  let output = [];

  function combo(i: number) {
    switch (i) {
      case 4:
        return registers.a;
      case 5:
        return registers.b;
      case 6:
        return registers.c;
      case 7:
        throw new Error("Unsupported combo: 7");
      default:
        return i;
    }
  }

  function adv(i) {
    registers.a = registers.a >> combo(i);
  }

  function bxl(i) {
    registers.b = registers.b ^ i;
  }

  function bst(i) {
    registers.b = combo(i) % 8;
  }

  function jnz(i) {
    if(registers.a === 0) {
      return;
    }

    pointer = i - 2;
  }

  function bxc(i ) {
    registers.b = registers.b ^ registers.c;
  }

  function out(i) {
    output.push(combo(i) % 8)
  }

  function bdv(i) {
    registers.b = registers.a >> combo(i);
  }

  function cdv(i) {
    registers.c = registers.a >> combo(i);
  }

  const instructions = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];

  while(program[pointer] !== undefined) {
    const opcode = program[pointer];
    const operand = program[pointer + 1];
    if(operand === undefined) {
      throw new Error("OPERAND MISSING");
    }

    const instruction = instructions[opcode];
    instruction(operand);
    pointer += 2;
  }

  return output.join(",")

}

import * as fs from "node:fs";
const input = fs.readFileSync('./inputs/17.txt', 'utf8');

console.log(main(input));