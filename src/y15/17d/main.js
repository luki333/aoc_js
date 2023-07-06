#!/usr/bin/env bun
import input from './input.txt';

const containers = input.split('\n').map(Number);

function* findAllSums(containers, n) {
  for (const [idx, value] of containers.entries()) {
    if (value === n) {
      yield [n];
    }
    for (const arr of findAllSums(containers.slice(idx + 1), n - value)) {
      yield [value, ...arr];
    }
  }
}

const allSums = Array.from(findAllSums(containers, 150));

console.log(allSums.length);

const minContainersLength = Math.min(...allSums.map((sum) => sum.length));
console.log(
  allSums.filter((sums) => sums.length === minContainersLength).length
);
