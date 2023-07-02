#!/usr/bin/env bun
import input from './input.txt';

const parsedLines = input.split('\n').map(parseLine);

const aSignal = resolveSignal('a', parsedLines);

const idx = parsedLines.findIndex((line) => line.at(-1) === 'b');
parsedLines[idx] = [aSignal, 'b'];
const part2 = resolveSignal('a', parsedLines);

function resolveSignal(char, parsedLines, cache = new Map()) {
  if (!isNaN(Number(char))) return Number(char);
  const line = parsedLines.find((line) => line.at(-1) === char);
  const [op, val1, val2] = line;

  switch (op) {
    case 'AND':
      return fn(val1) & fn(val2);
    case 'OR':
      return fn(val1) | fn(val2);
    case 'LSHIFT':
      return fn(val1) << fn(val2);
    case 'RSHIFT':
      return fn(val1) >> fn(val2);
    case 'NOT':
      return ~fn(val1);
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

console.log(aSignal, part2);
