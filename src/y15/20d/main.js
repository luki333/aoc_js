#!/usr/bin/env bun

const presentsCount = 33100000;

let part1;
let map = new Map();
const deleted = new Set();

for (let i = 1; true; i++) {
  let acc = i * 10;
  for (let j = Math.ceil(i / 2); j > 1; j--) {
    if (i % j === 0) {
      if (deleted.has(j)) {
        continue;
      }
      const n = map.get(j) ?? map.set(j, 0).get(j);
      map.set(j, n + 1);

      if (n + 1 === 50) {
        deleted.add(j);
        map.delete(n);
      }

      acc += j * 10;
    }
  }
  if (acc >= presentsCount) {
    console.log(acc);
    part1 = i;
    break;
  }
}

console.log(part1);
