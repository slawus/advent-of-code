#!/usr/bin/env python3
"""Advent of Code 2025 - Day X"""

def parse_input(input_text: str):
    """Parse the input into whatever format you need."""
    lines = input_text.strip().split('\n')
    return [list(line) for line in lines];


def part1(data) -> int:
    """Solve part 1."""

    width = len(data[0])
    height = len(data)

    counts = [[0 for _ in range(width)] for _ in range(height)]

    for x in range(width):
        for y in range(height):
            if(data[y][x] == '.'):
                counts[y][x] = -1
                continue
            for dx in range(-1, 2):
                for dy in range(-1, 2):
                    if dx == 0 and dy == 0:
                        continue
                    nx = x + dx
                    ny = y + dy
                    if nx < 0 or nx >= width or ny < 0 or ny >= height:
                        continue
                    if data[ny][nx] == '@':
                        counts[y][x] += 1


    
    return len([count for row in counts for count in row if (count >= 0 and count < 4)])
                



def part2(data) -> int:
    """Solve part 1."""

    width = len(data[0])
    height = len(data)
    print(width, height)

    res = 0
    counts = [[0 for _ in range(width)] for _ in range(height)]

    while True:
        for x in range(width):
            for y in range(height):
                if(data[y][x] == '.'):
                    counts[y][x] = -1
                    continue
                for dx in range(-1, 2):
                    for dy in range(-1, 2):
                        if dx == 0 and dy == 0:
                            continue
                        nx = x + dx
                        ny = y + dy
                        if nx < 0 or nx >= width or ny < 0 or ny >= height:
                            continue
                        if data[ny][nx] == '@':
                            counts[y][x] += 1


        
        to_remove = len([count for row in counts for count in row if (count >= 0 and count < 4)])
        res += to_remove
        if(to_remove == 0):
            break;
        
        for x in range(width):
            for y in range(height):
                if(counts[y][x] >= 0 and counts[y][x] < 4):
                    data[y][x] = '.'
        
        counts = [[0 for _ in range(width)] for _ in range(height)] # could have just lower the counts by 1 instead of resetting to 0 but maybe later
                
    return res


def main():
    with open('input.txt', 'r') as f:
        input_text = f.read()
    
    data = parse_input(input_text)
    
    print(f"Part 1: {part1(data)}")
    print(f"Part 2: {part2(data)}")


if __name__ == '__main__':
    main()



