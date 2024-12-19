import {readFileSync} from "fs";

function parseInput(input: string) {
  const lines = input.split('\n').filter(Boolean);
  const [towels, ...sequences] = lines;

  return {
    towels: towels.split(', '),
    sequences: sequences
  };
}

function recursiveMatch(towels: string[], sequence: string, cache = new Map<string, number>()) {
  if (cache.has(sequence)) {
    return cache.get(sequence)!;
  }
  if (sequence.length === 0) {
    cache.set(sequence, 1);
    return 1;
  }

  const matchingTowels = towels.filter(towel => sequence.startsWith(towel));
  const subcounts = matchingTowels.map(towel => recursiveMatch(towels, sequence.slice(towel.length), cache));
  const result = subcounts.reduce((sum, el) => sum + el, 0);

  cache.set(sequence, result);
  return result;
}

function main(input: string) {
  const {towels, sequences} = parseInput(input);

  let part2 = 0;
  let part1 = 0;
  for (const sequence of sequences) {
    const solutionsNr = recursiveMatch(towels, sequence);

    if (solutionsNr !== 0) {
      part1++;
    }
    part2 += solutionsNr;
  }

  return {part1, part2};
}

const input = readFileSync('inputs/19.txt', 'utf-8');
const result = main(input);
console.log('Result:', result); 