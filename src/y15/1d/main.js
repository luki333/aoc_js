#!/usr/bin/env bun
import {add} from '@tools';
import input from './input.txt';

const part1 = Array.from(input).map(getCode).reduce(add);

let part2;
{
  let acc = 1;
  part2 = Array.from(input).map(getCode).findIndex(isAccNegative);

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
