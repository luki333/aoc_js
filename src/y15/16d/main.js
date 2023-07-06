#!/usr/bin/env bun
import {add} from '@tools';
import input from './input.txt';

const values = Array(500);

input.split('\n').map((line, i) => {
  const chunks = line.split(/, |: /).slice(1);
  for (let j = 0; j < chunks.length; j += 2) {
    const [name, value] = chunks.slice(j, j + 2);
    values[i] ??= {};
    values[i][name] = Number(value);
  }
});

const toBeFound = `children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1`;

const toBeFoundMap = Object.fromEntries(
  toBeFound
    .split('\n')
    .map((line) => line.split(/: /))
    .map(([name, value]) => [name, Number(value)])
);

const matchedCounts = values.map((obj) =>
  Object.keys(toBeFoundMap)
    .map((key) => key in obj && obj[key] === toBeFoundMap[key])
    .reduce(add)
);

console.log(matchedCounts.indexOf(Math.max(...matchedCounts)) + 1);

const toBeFound2 = Object.fromEntries(
  Object.entries(toBeFoundMap).map(([name, value]) => {
    switch (name) {
      case 'cats':
      case 'trees':
        return [name, (toCompare) => toCompare > value];
      case 'pomeranians':
      case 'goldfish':
        return [name, (toCompare) => toCompare < value];
      default:
        return [name, (toCompare) => toCompare === value];
    }
  })
);

const matchedCounts2 = values.map((obj) =>
  Object.keys(toBeFound2)
    .map((key) => key in obj && toBeFound2[key](obj[key]))
    .reduce(add)
);

console.log(matchedCounts2.indexOf(Math.max(...matchedCounts2)) + 1);
