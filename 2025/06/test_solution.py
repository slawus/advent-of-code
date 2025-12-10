#!/usr/bin/env python3
"""Tests for Day X solution."""

import pytest
from solution import parse_input, part1, part2

with open('example.txt', 'r') as f:
    EXAMPLE_INPUT = f.read()


def test_parse_input():
    """Test input parsing."""
    data = parse_input(EXAMPLE_INPUT)
    assert data == [['123', '328', ' 51', '64 '], [' 45', '64 ', '387', '23 '], ['  6', '98 ', '215', '314'], ['*  ', '+  ', '*  ', '+  ']]


def test_part1():
    """Test part 1 with example input."""
    data = parse_input(EXAMPLE_INPUT)
    result = part1(data)
    assert result == 4277556


def test_part2():
    """Test part 2 with example input."""
    data = parse_input(EXAMPLE_INPUT)
    result = part2(data)
    assert result == 3263827

