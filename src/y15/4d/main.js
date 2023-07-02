#!/usr/bin/env bun
import key from './input.txt';

const part1 = untilStartsWith('0'.repeat(5));

const part2 = untilStartsWith('0'.repeat(6), part1);

function untilStartsWith(s, init = 1) {
  let i = init;
  while (!md5Hex(key + i).startsWith(s)) ++i;
  return i;
}
function md5Hex(s) {
  const hash = new Bun.CryptoHasher('md5').update(s).digest('hex');
  return hash;
}

console.log(part1, part2);
