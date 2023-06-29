#!/usr/bin/env bun
import {add} from '@tools';
import input from './input.txt';

let part1;
{
  part1 = input.split('\n').map(isNiceString).reduce(add);

  function isNiceString(s) {
    return (
      !/ab|cd|pq|xy/.test(s) && /.*(.)\1/.test(s) && /(.*[aeuio].*){3}/.test(s)
    );
  }
}

let part2;
{
  part2 = input.split('\n').map(isNiceString).reduce(add);

  function isNiceString(s) {
    return /(..).*\1/.test(s) && /(.).\1/.test(s);
  }
}

console.log(part1, part2);
