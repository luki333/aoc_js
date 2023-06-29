#!/usr/bin/env bun
import input from './input.txt';

let part1;
{
  const loc = [0, 0];
  const visited = new Set([loc.toString()]);
  for (const c of input) {
    const [i, n] = getDirection(c);
    loc[i] += n;
    visited.add(loc.toString());
  }
  part1 = visited.size;
}

let part2;
{
  const loc1 = [0, 0];
  const loc2 = loc1.slice();
  const visited = new Set([loc1.toString()]);
  for (const [i, c] of Object.entries(input)) {
    const [j, n] = getDirection(c);
    const loc = [loc1, loc2][Number(i) % 2];
    loc[j] += n;
    visited.add(loc.toString());
  }
  part2 = visited.size;
}

function getDirection(c) {
  switch (c) {
    case '^':
      return [1, 1];
    case '>':
      return [0, 1];
    case 'v':
      return [1, -1];
    case '<':
      return [0, -1];
  }
}

console.log(part1, part2);
