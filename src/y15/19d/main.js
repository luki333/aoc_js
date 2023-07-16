#!/usr/bin/env bun
import input from './input.txt';

const [replacements, molecule] = input.split('\n\n');

const parsedReplacements = replacements
  .split('\n')
  .map((line) => line.split(' => '));

const replacementsMap = {};
for (const [key, value] of parsedReplacements) {
  replacementsMap[key] ??= [];
  replacementsMap[key].push(value);
}

const set = new Set();
for (const [key, values] of Object.entries(replacementsMap)) {
  molecule.replaceAll(key, (_, offset, string) => {
    for (const value of values) {
      set.add(
        string.slice(0, offset) + string.slice(offset).replace(key, value)
      );
    }
  });
}

const startPoints = replacementsMap['e'];
delete replacementsMap['e'];

let end = molecule;
let n = 0;

const entries = Object.entries(replacementsMap);

while (!startPoints.includes(end)) {
  console.log(end);
  if (n >= 1) break;

  for (const [key, values] of entries) {
    for (const value of values) {
      end = end.replaceAll(value, () => {
        n++;
        return key;
      });
    }
  }
}

console.log(n + 1, 'done');
