#!/usr/bin/env bun
import input from './input.txt';

const part1 = Math.max(
  ...input.split('\n\n').map((l) =>
    l
      .split('\n')
      .map(Number)
      .reduce((a, b) => a + b)
  )
);

const part2 = input
  .split('\n\n')
  .map((l) =>
    l
      .split('\n')
      .map(Number)
      .reduce((a, b) => a + b)
  )
  .toSorted((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b);

console.log(part1, part2);
