#!/usr/bin/env bun
import {permute} from '@tools';
import input from './input.txt';

const reName = /[A-Z][a-z]*/g;

const parsedLines = input.split('\n').map((line) => {
  const [points] = /\d+/.exec(line);
  const n = /lose/.test(line) ? -1 : 1;
  return [...line.match(reName), points * n];
});

const names = Array.from(new Set(parsedLines.map(([name]) => name)));
names.push('Luki');

const values = new Map(
  parsedLines.map(([name1, name2, value]) => [
    `${name1},${name2}`,
    Number(value),
  ])
);

for (const name of names.slice(0, -1)) {
  values.set(`Luki,${name}`, 0);
  values.set(`${name},Luki`, 0);
}

let results = [];
for (const permuted of permute(names)) {
  let acc = 0;
  for (let i = 0; i < permuted.length; i++) {
    acc +=
      values.get(`${permuted[i]},${permuted.at(i - 1)}`) +
      values.get(`${permuted[i]},${permuted[(i + 1) % permuted.length]}`);
  }
  results.push(acc);
}

function getMax(arr) {
  let len = arr.length;
  let max = -Infinity;

  while (len--) {
    max = arr[len] > max ? arr[len] : max;
  }
  return max;
}

console.log(getMax(results));
