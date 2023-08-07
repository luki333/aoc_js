#!/usr/bin/env bun
import input from './input.txt';

const parsedLines = input.split('\n').map(parseLine);

let part1 = 0;
for (const [name, id, checksum] of parsedLines) {
  if (
    sortByFrequency(getFrequencies(name.split('-').join(''))).slice(0, 5) ===
    checksum
  ) {
    part1 += id;
  }
}

let part2;
for (const [name, shift] of parsedLines) {
  if (decryptName(name, shift).startsWith('northpole')) {
    part2 = shift;
    break;
  }
}

console.log(part1, part2);

function parseLine(line) {
  const [id] = line.match(/\d+/);
  const [name, checksum] = line.split(id);
  return [name, Number(id), checksum.slice(1, -1)];
}
function getFrequencies(name) {
  const frequencies = {};
  for (const c of name) frequencies[c] = (frequencies[c] ?? 0) + 1;
  return frequencies;
}
function sortByFrequency(frequencies) {
  const frequencyGroups = {};

  Object.entries(frequencies).forEach(
    ([c, n]) => (frequencyGroups[n] = (frequencyGroups[n] ?? '') + c)
  );
  return Object.entries(frequencyGroups)
    .toReversed()
    .map(([, value]) => Array.from(value).sort().join(''))
    .join('');
}
function isAscii(c) {
  c = c.toLowerCase();
  return c >= 'a' && c <= 'z';
}
function decryptName(name, shift) {
  const a = 'a'.charCodeAt(0);
  const end = 'z'.charCodeAt(0) - a + 1;
  const reminder = shift % end;

  return String.fromCharCode(
    ...Array.from(name).map((c) =>
      isAscii(c)
        ? ((c.charCodeAt(0) - a + reminder) % end) + a
        : c.charCodeAt(0)
    )
  );
}
