#!/usr/bin/env bun
import {add} from '@tools';
import input from './input.txt';

const parsedLines = input
  .split('\n')
  .map((line) => [
    ...line.match(/[A-Z][a-z]*/),
    ...line.match(/-?\d+/g).map(Number),
  ]);

let part1 = 0;
let part2 = 0;

for (let i = 1; i <= 100 - 3; i++) {
  for (let j = 1; j <= 100 - i; j++) {
    for (let k = 1; k <= 100 - i - j - 1; k++) {
      const idxs = [i, j, k, 100 - i - j - k];

      const calories = parsedLines
        .map((line) => line.at(-1))
        .map((n, i) => n * idxs[i])
        .reduce(add);

      const value = calcPart1(idxs);
      if (value > part1) {
        part1 = value;
      }
      if (calories === 500 && value > part2) {
        part2 = value;
      }
    }
  }
}

function calcPart1(idxs) {
  return idxs
    .map((idx, i) => parsedLines[i].slice(1, -1).map((n) => n * idx))
    .reduce(
      (acc, values) => values.map((value, i) => acc[i] + value),
      Array(idxs.length).fill(0)
    )
    .map((n) => (n < 0 ? 0 : n))
    .reduce((acc, n) => acc * n, 1);
}

console.log(part1, part2);
