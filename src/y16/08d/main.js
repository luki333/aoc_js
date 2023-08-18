#!/usr/bin/env bun
import input from './input.txt';

const parsedLines = input.split('\n').map(parseLine);

const screen = Array(6)
  .fill(null)
  .map(() => Array(50).fill('.'));

for (const parsedLine of parsedLines) {
  if (parsedLine.length === 2) {
    const [w, h] = parsedLine;

    for (let i = 0; i < h; i++) {
      screen[i].fill('#', 0, w);
    }
    continue;
  }

  const [direction, d, n] = parsedLine;

  switch (direction) {
    case 'x': {
      const shifted = circularRShift(
        screen.map((row) => row[d]),
        n
      );

      shifted.forEach((n, i) => (screen[i][d] = n));
      break;
    }
    case 'y': {
      circularRShift(screen[d], n);
      break;
    }
  }
}
function parseLine(line) {
  const re = /[xy](?=\=)|\d+/g;
  const parts = line.match(re);

  if (isNaN(Number(parts[0]))) {
    return [parts[0], ...parts.slice(1).map(Number)];
  }
  return parts.map(Number);
}
function circularRShift(arr, n) {
  for (let i = 0; i < n; i++) {
    arr.unshift(arr.pop());
  }
  return arr;
}

let n = 0;

for (const line of screen) {
  for (const c of line) {
    if (c === '#') {
      n++;
    }
  }
}

console.log(n);

for (const line of screen) {
  console.log(line.join(''));
}
