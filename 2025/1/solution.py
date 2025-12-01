#!/usr/bin/env python3
"""Advent of Code 2025 - Day 1"""

def parse_input(input_text: str):
    """Parse the input into whatever format you need."""
    lines = input_text.strip().split('\n')
    return lines


def part1(data) -> int:
    pos = 50
    res = 0
    for line in data:
        direction = 1
        if line[0] == "L":
            direction = -1
        
        pos = (pos + direction * int(line[1:]) + 100) % 100

        if pos == 0:
            res+=1
    
    return res


print (abs(-100) // 100)
print (100 // 100)

def part2(data) -> int:
    pos = 50
    res = 0
    for line in data:
        direction = 1
        if line[0] == "L":
            direction = -1

        delta = direction * int(line[1:])

        # if pos == 0 and direction == -1:
        #     res -= 1 # we are at the start and moving left, so we need to subtract 1 from the result
        
        v = pos + delta
        if v > 0:
            res += v // 100
        elif v == 0:
            res += 1
        else:
            if pos > 0:
                res += 1;
            res += abs(v) // 100

        pos = v % 100

        # pos += direction * int(line[1:])
        # if pos == 0:
        #     res += 1
        # else:
        #     res += abs(pos // 100)  

        # pos = pos % 100
    
    return res


def main():
    with open('input.txt', 'r') as f:
        input_text = f.read()
    
    data = parse_input(input_text)
    
    print(f"Part 1: {part1(data)}")
    print(f"Part 2: {part2(data)}")


if __name__ == '__main__':
    main()

