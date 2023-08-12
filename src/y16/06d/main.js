#!/usr/bin/env bun
import input from './input.txt';

const lines = input.split('\n');

function decodeMessage(mostCommon) {
  let decodedMessage = '';

  for (let i = 0, lineLen = lines[0].length; i < lineLen; i++) {
    const frequencies = {};

    for (let j = 0; j < lines.length; j++) {
      const c = lines[j][i];
      frequencies[c] = (frequencies[c] ?? 0) + 1;
    }
    const [c] = Object.entries(frequencies)
      .sort(([, f1], [, f2]) => f2 - f1)
      .at(mostCommon ? 0 : -1);

    decodedMessage += c;
  }
  return decodedMessage;
}

console.log(decodeMessage(true), decodeMessage(false));
