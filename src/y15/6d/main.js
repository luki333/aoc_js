#!/usr/bin/env bun
import {add} from '@tools';
import input from './input.txt';

console.time();

const parsedLines = input.split('\n').map(parseLine);
const arr = new Array(1_000 ** 2);

let part1;
{
  for (const {instruct, ...loc} of parsedLines) {
    takeInstruct(instruct, loc);
  }

  function takeInstruct(instruct, {xFrom, yFrom, xTo, yTo}) {
    for (let y = yFrom; y <= yTo; y++) {
      const base = 1_000 * y;
      if (instruct === 'on') {
        arr.fill(1, base + xFrom, base + xTo + 1);
      } else if (instruct === 'off') {
        arr.fill(0, base + xFrom, base + xTo + 1);
      } else {
        for (let x = base + xFrom, end = base + xTo; x <= end; x++) {
          arr[x] ^= 1;
        }
      }
    }
  }
  part1 = arr.reduce(add);
}

arr.fill(0);
let part2;
{
  for (const {instruct, ...loc} of parsedLines) {
    takeInstruct(instruct, loc);
  }

  function takeInstruct(instruct, {xFrom, yFrom, xTo, yTo}) {
    for (let y = yFrom; y <= yTo; y++) {
      const base = 1_000 * y;
      let n;
      if (instruct === 'on') n = 1;
      else if (instruct === 'off') n = -1;
      else n = 2;

      for (let x = base + xFrom, end = base + xTo; x <= end; x++) {
        arr[x] += n;
        if (arr[x] < 0) arr[x] = 0;
      }
    }
  }
  part2 = arr.reduce(add);
}

function parseLine(line) {
  const instruct = line.match(/on|off|toggle/g).at(0);
  const [xFrom, yFrom, xTo, yTo] = line.match(/\d+/g).map(Number);
  return {instruct, xFrom, yFrom, xTo, yTo};
}

console.timeEnd();

console.log(part1, part2);
