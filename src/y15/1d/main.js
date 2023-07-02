#!/usr/bin/env bun
import {add} from '@tools';
import input from './input.txt';

const chars = Array.from(input);

const part1 = chars.map(getCode).reduce(add);

let part2;
{
  let acc = 1;
  part2 = chars.map(getCode).findIndex(isAccNegative);

  function isAccNegative(n) {
    acc += n;
    return acc < 0;
  }
}

function getCode(c) {
  if (c === '(') return 1;
  else return -1;
}

console.log(part1, part2);
