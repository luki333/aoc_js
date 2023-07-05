#!/usr/bin/env bun
import {add} from '@tools';
import input from './input.txt';

const part1 = input.match(/-?\d+/g).map(Number).reduce(add);

function withoutRed(item) {
  if (typeof item === 'number') return item;
  if (
    typeof item === 'object' &&
    !Array.isArray(item) &&
    Object.values(item).includes('red')
  )
    return 0;
  if (typeof item !== 'object') return 0;
  return Object.values(item).map(withoutRed).reduce(add);
}

console.log(part1, withoutRed(JSON.parse(input)));
