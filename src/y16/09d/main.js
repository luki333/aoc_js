#!/usr/bin/env bun
import input from './input.txt';

const parsedInput = input.replaceAll('\n', '');
const reMarker = /\(\d+x\d+\)/g;

let part1;
{
  let re = new RegExp(reMarker);

  let input = parsedInput,
    result = '';

  let match, prevLastIndex;
  while (((prevLastIndex = re.lastIndex), (match = re.exec(input)))) {
    const [marker] = match;

    if (prevLastIndex + marker.length !== re.lastIndex || prevLastIndex === 0) {
      const [n, repeatCount] = parseMarker(marker);
      const [start, end] = [re.lastIndex, re.lastIndex + n];
      result +=
        input.slice(prevLastIndex, start - marker.length) +
        input.slice(start, end).repeat(repeatCount);

      input = input.slice(end);

      re = new RegExp(re);
    }
  }

  result += input;
  part1 = result.length;
}
function parseMarker(marker) {
  return marker.match(/\d+/g).map(Number);
}

console.log(part1);
