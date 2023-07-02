#!/usr/bin/env bun
import {add} from '@tools';
import input from './input.txt';

const lines = input.split('\n');

let part1;
{
  part1 = lines.map(isNiceString).reduce(add);

  function isNiceString(s) {
    return (
      !/ab|cd|pq|xy/.test(s) && /.*(.)\1/.test(s) && /(.*[aeuio].*){3}/.test(s)
    );
  }
}

let part2;
{
  part2 = lines.map(isNiceString).reduce(add);

  function isNiceString(s) {
    return /(.).\1/.test(s) && /(..).*\1/.test(s);
  }
}

console.log(part1, part2);
