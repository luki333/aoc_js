#!/usr/bin/env bun
import input from './input.txt';

let str1 = input;
for (let i = 0; i < 40; i++) {
  str1 = lookAndSay(str1);
}

let str2 = str1;
for (let i = 0; i < 10; i++) {
  str2 = lookAndSay(str2);
}

console.log(str1.length, str2.length);

function lookAndSay(str) {
  const reRepeatedDight = /([0-9])\1*/g;
  let result = '';
  for (let match; (match = reRepeatedDight.exec(str)) !== null; )
    result += match.at(0).length + match.at(1);
  return result;
}
