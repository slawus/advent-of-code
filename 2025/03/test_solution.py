#!/usr/bin/env python3
"""Tests for Day X solution."""

import pytest
from solution import parse_input, part1, part2

with open('example.txt', 'r') as f:
    EXAMPLE_INPUT = f.read()


def test_parse_input():
    """Test input parsing."""
    data = parse_input(EXAMPLE_INPUT)
    print(data)
    expected = [
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1],
        [8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        [2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 7, 8],
        [8, 1, 8, 1, 8, 1, 9, 1, 1, 1, 1, 2, 1, 1, 1]
    ]
    assert data == expected


def test_part1():
    """Test part 1 with example input."""
    data = parse_input(EXAMPLE_INPUT)
    result = part1(data)
    assert result == 357


def test_part2():
    """Test part 2 with example input."""
    data = parse_input(EXAMPLE_INPUT)
    result = part2(data)
    assert result == 3121910778619

