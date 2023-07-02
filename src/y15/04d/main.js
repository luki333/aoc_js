#!/usr/bin/env bun
import key from './input.txt';

const part1 = untilStartsWith('0'.repeat(5));

const part2 = untilStartsWith('0'.repeat(6), part1);

function untilStartsWith(str, init = 1) {
  let i = init;
  while (!md5Hex(key + i).startsWith(str)) ++i;
  return i;
}
function md5Hex(str) {
  const hash = new Bun.CryptoHasher('md5').update(str).digest('hex');
  return hash;
}

console.log(part1, part2);
