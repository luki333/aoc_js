#!/usr/bin/env bun
import {add} from '@tools';
import input from './input.txt';

const parsedInput = input
  .split('\n')
  .map((line) => line.match(/\d+/g).map(Number));

const part1 = parsedInput.map(isValidTriangle).reduce(add);

const part2 = transformParsedInput(parsedInput)
  .map(isValidTriangle)
  .reduce(add);

function transformParsedInput(parsedInput) {
  const output = [];

  for (let i = 3; i <= parsedInput.length; i += 3) {
    const nextLines = parsedInput.slice(i - 3, i);

    const transformed = Array(3)
      .fill(null)
      .map(() => []);

    for (const line of nextLines) {
      for (let i = 0; i < 3; i++) {
        transformed[i].push(line[i]);
      }
    }
    output.push(...transformed);
  }
  return output;
}
function isValidTriangle([x, y, z]) {
  return x + y > z && x + z > y && y + z > x;
}

console.log(part1, part2);
