#!/usr/bin/env bun
import {add} from '@tools';

const buf = await Bun.file('./input.txt').arrayBuffer();
const lines = String.fromCharCode(...new Uint8Array(buf)).split('\n');

let part1;
{
  part1 = lines.map((line) => line.length - getStrLen(line)).reduce(add);

  function getStrLen(str) {
    return str.replaceAll(/\\\\|\\"|\\x(\d|[a-f]){2}/g, ' ').length - 2;
  }
}

let part2;
{
  part2 = lines.map((line) => getStrLen(line) - line.length).reduce(add);

  function getStrLen(str) {
    return JSON.stringify(str).length;
  }
}

console.log(part1, part2);
