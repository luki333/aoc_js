#!/usr/bin/env bun
import input from './input.txt';

const parsedLines = input.split('\n').map(parseLine);

const distances = new Map(
  parsedLines.map((line) => [line.slice(0, -1).toString(), Number(line.at(-1))])
);
const locs = Array.from(
  new Set(parsedLines.flatMap((lines) => lines.slice(0, -1)))
);

const totalDistances = [];
for (const permuted of permute(locs)) {
  let totalDistance = 0;
  for (let i = 0, end = permuted.length - 1; i < end; i++) {
    const pair = permuted.slice(i, i + 2);

    totalDistance +=
      distances.get(pair.toString()) ??
      distances.get(pair.toReversed().toString());
  }
  totalDistances.push(totalDistance);
}

console.log(Math.min(...totalDistances), Math.max(...totalDistances));

function permute(items) {
  if (!items.length) {
    return [[]];
  }
  const [first, ...rest] = items;
  return permute(rest).flatMap((items) => interleave(first, items));
}
function interleave(item, items) {
  if (!items.length) {
    return [[item]];
  }
  const [first, ...rest] = items;
  return [
    [item, first, ...rest],
    ...interleave(item, rest).map((items) => [first, ...items]),
  ];
}
function parseLine(line) {
  return line.split(/to|=/).map((str) => str.trim());
}
