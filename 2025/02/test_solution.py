#!/usr/bin/env python3
"""Tests for Day X solution."""

import pytest
from solution import parse_input, part1, part2

with open('example.txt', 'r') as f:
    EXAMPLE_INPUT = f.read()


def test_parse_input():
    """Test input parsing."""
    data = parse_input(EXAMPLE_INPUT)
    assert data == [(11, 22), (95, 115), (998, 1012), (1188511880, 1188511890), (222220, 222224), (1698522, 1698528), (446443, 446449), (38593856, 38593862), (565653, 565659), (824824821, 824824827), (2121212118, 2121212124)]


def test_part1():
    """Test part 1 with example input."""
    data = parse_input(EXAMPLE_INPUT)
    result = part1(data)
    assert result == 1227775554


def test_part2():
    """Test part 2 with example input."""
    data = parse_input(EXAMPLE_INPUT)
    result = part2(data)
    assert result == 4174379265

