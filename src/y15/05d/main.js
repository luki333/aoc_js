#!/usr/bin/env bun
import {add} from '@tools';
import input from './input.txt';

const lines = input.split('\n');

let part1;
{
  part1 = lines.map(isNiceString).reduce(add);

  function isNiceString(str) {
    return (
      !/ab|cd|pq|xy/.test(str) &&
      /.*(.)\1/.test(str) &&
      /(.*[aeuio].*){3}/.test(str)
    );
  }
}

let part2;
{
  part2 = lines.map(isNiceString).reduce(add);

  function isNiceString(str) {
    return /(.).\1/.test(str) && /(..).*\1/.test(str);
  }
}

console.log(part1, part2);
