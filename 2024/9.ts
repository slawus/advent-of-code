
function rollout(input: string) {
  const rolledOut = [];
  let empty = false;
  let id = 0;
  for (let i = 0; i < input.length; i++) {
    const entry = Number(input[i]);
    const toPush = empty ? null : id;
    for (let j = 0; j < entry; j++) {
      rolledOut.push(toPush);
    }

    if(!empty) {
      id++;
    }
    empty = !empty;
  }

  return rolledOut;
}

function part1(arr: (number | null)[]) {
  const len = arr.length;
  const updated = [...arr];

  let toMoveIndex = len - 1;
  let emptySpaceIndexes = arr.map((v, index) => v=== null ? index : null)
    .filter(index => index !== null).reverse();

  const numberOfValues = (len - emptySpaceIndexes.length)

  let emptyIndex: number | undefined;
  while ((emptyIndex = emptySpaceIndexes.pop()) !== undefined) {
    if(emptyIndex >= numberOfValues) {
      break;
    }
    //swap
    updated[emptyIndex] = updated[toMoveIndex];
    updated[toMoveIndex] = null;

    // find next to move
    toMoveIndex--;
    while(toMoveIndex >= 0 && arr[toMoveIndex] === null) {
      toMoveIndex--;
    }
    if(toMoveIndex < 0) {
      break;
    }
  }

  return checksum(updated);
}

function part2(arr: (number | null)[]) {

  // group
  let grouped = [[arr[0]]];
  for (let i = 1; i < arr.length; i++) {
    const val = arr[i];
    let lastGroup = grouped[grouped.length - 1];
    if(lastGroup[0] !== val) {
      lastGroup = [];
      grouped.push(lastGroup);
    }
    lastGroup.push(val)
  }

  // move
  let toMoveIndex = grouped.length - 1;
  while(toMoveIndex > 0) {
    if((grouped[toMoveIndex]?.[0] ?? null) === null) {
      toMoveIndex--;
      continue;
    }

    const file = grouped[toMoveIndex];
    console.log(file[0]);
    const emptySpaceIndex = grouped.findIndex(group => {
      if((group?.[0] ?? null) !== null) {
        return false;
      }

      return group.length >= file.length;
    });

    if(emptySpaceIndex >= 0) {
      if(toMoveIndex < emptySpaceIndex) {
        toMoveIndex--;
        continue;
      }

      const emptySpace = grouped[emptySpaceIndex];

      const modifiedPart = [
        file,
        emptySpace.slice(0, emptySpace.length - file.length),
      ];

      // move
      grouped = [
        ...grouped.slice(0, emptySpaceIndex),
        ...modifiedPart,
        ...grouped.slice(emptySpaceIndex+1, toMoveIndex),
        Array.from({ length: file.length}).fill(null),
        ...grouped.slice(toMoveIndex+1),
      ];
      
      toMoveIndex++;
    }

    toMoveIndex--;
  }

  const final = grouped.flatMap(group => group);
  return checksum(final);

}

function checksum(arr: (number | null)[]) {
  let checksum = BigInt(0);
  for (let i = 0; i < arr.length; i++) {
    if(arr[i] !== null) {
      checksum += BigInt(i) * BigInt(arr[i]);
    }
  }
  return checksum;
}

function main(input: string) {

  const arr = rollout(input);
  // const res = part1(arr);
  const res = part2(arr);

  return {res}
}

import * as fs from "node:fs";

const data = fs.readFileSync("./inputs/9.txt", "utf8");
main(data);