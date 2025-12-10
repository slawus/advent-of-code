#!/usr/bin/env python3
"""Advent of Code 2025 - Day X"""

def parse_input(input_text: str):
    str_lines = input_text.split('\n')
    character = str_lines[-1]
    prev = 0
    i = 0
    ranges = []
    for c in character[1:]:
        i += 1
        if c != ' ':
            ranges.append([prev, i])
            prev = i

    ranges.append([prev, len(character) + 1])
    lines = [[line[range[0]:range[1] -1] for range in ranges] for line in str_lines];

    return lines

def part1(data) -> int:

    total = 0
    for x in range(len(data[0])):
        column = [row[x] for row in data]
        sign = column[-1].strip()
        if sign == '*':
            result = 1
            for i in column[:-1]:
                result *= int(i)
        else:
            result = 0
            for i in column[:-1]:
                result += int(i)
        
        total += result


    return total


def part2(data) -> int:

    total = 0
    for x in range(len(data[0])):
        column = [row[x] for row in data]
        length = len(column[-1])

        sign = column[-1].strip()
        numbers = []
        for i in range(0, length):
            inverted_number_str = ''.join([el[i] for el in column[0: -1]])
            inverted_number = int(inverted_number_str)
            numbers.append(inverted_number)

        if sign == '*':
            result = 1
            for i in numbers:
                result *= int(i)
        else:
            result = 0
            for i in numbers:
                result += int(i)
        
        total += result


    return total


def main():
    with open('input.txt', 'r') as f:
        input_text = f.read()
    
    data = parse_input(input_text)
    
    print(f"Part 1: {part1(data)}")
    print(f"Part 2: {part2(data)}")


if __name__ == '__main__':
    main()



