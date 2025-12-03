#!/usr/bin/env python3
"""Advent of Code 2025 - Day X"""

import math

def parse_input(input_text: str):
    """Parse the input into whatever format you need."""
    lines = input_text.strip().split('\n')
    return [[int(digit) for digit in line.strip()] for line in lines]


def part1(data) -> int:
    """Solve part 1."""
    res = 0
    for line in data:
        first = max(line[:-1])
        index = line.index(first)
        second = max(line[index+1:])
        res += first * 10 + second;
        
    return res


def part2(data) -> int:
    """Solve part 2."""
    res = 0
    for line in data:
        lastDigitIndex = 0;
        number = 0;
        for l in range(1, 13):
            rest = line[lastDigitIndex:-(12-l) or None]
            digit = max(rest)
            index = rest.index(digit)
            lastDigitIndex += index + 1;
            number = number * 10 + digit;

        res += number;
        
    return res



def main():
    with open('input.txt', 'r') as f:
        input_text = f.read()
    
    data = parse_input(input_text)
    
    print(f"Part 1: {part1(data)}")
    print(f"Part 2: {part2(data)}")


if __name__ == '__main__':
    main()


