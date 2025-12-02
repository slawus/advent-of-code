#!/usr/bin/env python3

"""Advent of Code 2025 - Day 2"""

import math

def parse_input(input_text: str):
    lines = input_text.strip().split(',')
    ranges = []
    for line in lines:
        start, end = line.split('-')
        ranges.append((int(start), int(end)))
    return ranges


def part1(ranges) -> int:
    res = 0

    for range in ranges:
        (a, b) = range

        astr = str(a)
        bstr = str(b)
        a1 = int(astr[0:math.floor(len(astr) / 2)] or  "0")
        b1 = int(bstr[0:math.ceil(len(bstr) / 2)])

        start = a1;

        while start <= b1:
            potential = int(str(start)+str(start))
            if potential < a:
                start += 1
                continue
            if potential > b:
                break

            res +=potential
            start += 1
    
    return res

def part2(ranges) -> int:
    res = 0

    for ran in ranges:
        (a, b) = ran

        for i in range(a, b + 1):            
            istr = str(i)
            isValid = False
            for l in range(1, len(istr) // 2 + 1):
                multiplier = len(istr) // l
                if istr[0:l] * multiplier == istr:
                    isValid = True
                    break
            if isValid:
                res += i

    
    return res


def main():
    with open('input.txt', 'r') as f:
        input_text = f.read()
    
    data = parse_input(input_text)
    
    print(f"Part 1: {part1(data)}")
    print(f"Part 2: {part2(data)}")


if __name__ == '__main__':
    main()

