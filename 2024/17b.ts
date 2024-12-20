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


function run(registers, program, expectedOutput) {
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
    registers.a = Math.floor(registers.a / (Math.pow(2, combo(i))));
  }

  function bxl(i) {
    registers.b = Number(BigInt(registers.b) ^ BigInt(i));
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
    registers.b =  Number(BigInt(registers.b) ^ BigInt(registers.c));
  }

  function out(i) {
    output.push(combo(i) % 8)
  }

  function bdv(i) {
    registers.b = Math.floor(registers.a / (Math.pow(2, combo(i))));
  }

  function cdv(i) {
    registers.c = Math.floor(registers.a / (Math.pow(2, combo(i))));
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

    if(expectedOutput && output[output.length - 1] !== expectedOutput[output.length - 1]) {
      return false;
    }
  }

  if(expectedOutput && output.length !== expectedOutput.length) {
    return false;
  }

  return output;
}

function main(input: string) {
  let { registers, program } =  processInput(input);


  // based on manual observation of frist 100 results it was spoted that:
  // for values 0-7 it returns different single-digit values
  // for values 8-63 it returns two digit values, were second value order is equal the series from 0-7
  // based on that we can compute final input


  for (let j = 0; j < 515; j++) {
    console.log(j, ":", run({
      ...registers,
      a: j
    }, program, false), j % 8, (j >> 3) % 8, (j >> 6) % 8)
  }


  const res = [];

  for (let i = 0; i < 8; i++) {
    res.push(run({
      ...registers,
      a: i
    }, program, false))
  }
   // find first number

  let solution = Math.pow(8, program.length - 1);
  for (let pos =  program.length - 1; pos >= 0; pos--) {
    const goal = program[pos];
    const base = Math.pow(8, pos);

    let result = run({
      ...registers,
      a: solution
    }, program, false);
    while(result[pos] !== goal) {
      solution += base;
      result = run({
        ...registers,
        a: solution
      }, program, false);
    }
  }

  // safety check

  for (let i = 0; i < 100; i++) {
    const success = run({
      ...registers,
      a: 164278899142272 + i
    }, program, program);

    console.log(164278899142272 + i, success)
  }


  // return {
  //   solution,
  //   success,
  //   program
  // }
}


import * as fs from "node:fs";
const input = fs.readFileSync('./inputs/17.txt', 'utf8');

console.log(main(input));