#!/usr/bin/env python3
"""Advent of Code 2025 - Day X"""

def parse_input(input_text: str):
    """Parse the input into whatever format you need."""
    [ranges, ids] = input_text.strip().split('\n\n');

    ranges = [list(map(int, range.strip().split('-'))) for range in ranges.strip().split('\n')]
    ids = [int(id.strip()) for id in ids.strip().split('\n')]

    return (ranges, ids)


def part1(data) -> int:
    
    (ranges, ids) = data

    merged_ranges = [];
    sorted_ranges = sorted(ranges, key=lambda x: x[0])

    prev = sorted_ranges[0]

    for r in sorted_ranges[1:]:
        if prev[1] < r[0]: # no overlap
            merged_ranges.append(prev)
            prev = r
        else:
            if r[1] > prev[1]: # overlap, merge
                prev = [prev[0], r[1]]

    merged_ranges.append(prev)

    res = 0
    for i in ids:
        for r in merged_ranges:
            if i >= r[0] and i <= r[1]:
                res += 1
                break

    return res


def part2(data) -> int:
    
    (ranges, ids) = data

    merged_ranges = [];
    sorted_ranges = sorted(ranges, key=lambda x: x[0])

    prev = sorted_ranges[0]

    for r in sorted_ranges[1:]:
        if prev[1] < r[0]: # no overlap
            merged_ranges.append(prev)
            prev = r
        else:
            if r[1] > prev[1]: # overlap, merge
                prev = [prev[0], r[1]]

    merged_ranges.append(prev)

    res = 0
    for r in merged_ranges:
        res += r[1] - r[0] + 1

    return res



def main():
    with open('input.txt', 'r') as f:
        input_text = f.read()
    
    data = parse_input(input_text)
    
    print(f"Part 1: {part1(data)}")
    print(f"Part 2: {part2(data)}")


if __name__ == '__main__':
    main()



