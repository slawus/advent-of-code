#!/usr/bin/env python3
"""Tests for Day 1 solution."""

import pytest
from solution import parse_input, part1, part2


with open('example.txt', 'r') as f:
    EXAMPLE_INPUT = f.read()


def test_parse_input():
    """Test input parsing."""
    data = parse_input(EXAMPLE_INPUT)
    assert data is not None
    # TODO: Add assertions about parsed data


def test_part1():
    """Test part 1 with example input."""
    data = parse_input(EXAMPLE_INPUT)
    result = part1(data)
    assert result == 3


def test_part1():
    """Test part 1 with example input."""
    data = parse_input(EXAMPLE_INPUT)
    result = part2(data)
    assert result == 6

