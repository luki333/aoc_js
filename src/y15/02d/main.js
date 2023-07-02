#!/usr/bin/env bun
import {add} from '@tools';
import input from './input.txt';

const dims = input.split('\n').map((l) => l.split('x').map(Number));

const part1 = dims
  .map(([l, w, h]) => [l * w, l * h, w * h])
  .map((faces) => 2 * faces.reduce(add) + Math.min(...faces))
  .reduce(add);

const part2 = dims
  .map(([l, w, h]) => 2 * Math.min(l + w, l + h, w + h) + l * w * h)
  .reduce(add);

console.log(part1, part2);
