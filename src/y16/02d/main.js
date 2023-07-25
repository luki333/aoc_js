#!/usr/bin/env bun
import input from './input.txt';

const lines = input.split('\n');

let part1;
{
  const keypad = Array(3)
    .fill(null)
    .map((_, i) =>
      Array(3)
        .fill(null)
        .map((_, j) => i * 3 + (j + 1))
    );

  const point = [1, 1];
  let password = '';

  for (const line of lines) {
    for (const direction of line) {
      const n = direction === 'U' || direction === 'L' ? -1 : 1;
      const i = direction === 'U' || direction === 'D' ? 1 : 0;
      const newValue = point[i] + n;

      point[i] = newValue < 0 ? 0 : newValue > 2 ? 2 : newValue;
    }
    const [x, y] = point;
    password += keypad[y][x];
  }

  part1 = password;
}

let part2;
{
  const keypad = [
    [0, 0, 1, 0, 0],
    [0, 2, 3, 4, 0],
    [5, 6, 7, 8, 9],
    [0, 'A', 'B', 'C', 0],
    [0, 0, 'D', 0, 0],
  ];
  let point = [2, 0];
  let password = '';

  for (const line of lines) {
    for (const direction of line) {
      const n = direction === 'U' || direction === 'L' ? -1 : 1;
      const i = direction === 'U' || direction === 'D' ? 1 : 0;

      const newPoint = [...point];
      newPoint[i] += n;
      const [x, y] = newPoint;

      if (keypad[y]?.[x]) {
        point = newPoint;
      }
    }
    const [x, y] = point;
    password += keypad[y][x];
  }
  part2 = password;
}

console.log(part1, part2);
