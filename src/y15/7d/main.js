#!/usr/bin/env bun
import input from './input.txt';

const parsedLines = input.split('\n').map(parseLine);

const part1 = resolveSignal('a', parsedLines);

const idx = parsedLines.findIndex((line) => line.at(-1) === 'b');
parsedLines[idx] = [part1, 'b'];
const part2 = resolveSignal('a', parsedLines);

function resolveSignal(char, parsedLines, cache = new Map()) {
  if (!isNaN(Number(char))) return Number(char);
  const line = parsedLines.find((line) => line.at(-1) === char);
  const [op, a, b] = line;

  switch (op) {
    case 'AND':
      return fn(a) & fn(b);
    case 'OR':
      return fn(a) | fn(b);
    case 'LSHIFT':
      return fn(a) << fn(b);
    case 'RSHIFT':
      return fn(a) >> fn(b);
    case 'NOT':
      return ~fn(a);
    default:
      return fn(op);
  }

  function fn(char) {
    if (cache.has(char)) return cache.get(char);
    const signal = resolveSignal(char, parsedLines, cache);
    cache.set(char, signal);
    return signal;
  }
}
function parseLine(str) {
  return [...(str.match(/[A-Z]+/) ?? []), ...str.match(/([a-z]|[0-9])+/g)];
}

console.log(part1, part2);
