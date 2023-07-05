#!/usr/bin/env bun
import password from './input.txt';

const A_CODE = 'a'.charCodeAt(0);
const BASE = 'z'.charCodeAt(0) - A_CODE + 1;

let part1;
{
  part1 = getNextPassword(password);

  function getNextPassword(password) {
    let chars = Array.from(password);
    while (true) {
      if (!handleExcluded(chars)) continue;
      if (hasDistinctRepeated(chars.join('')) && includesIncreasing(chars))
        return chars.join('');

      chars = convertToCodes(
        increment(convertToBase(chars.map((char) => char.charCodeAt(0))))
      ).map((code) => String.fromCharCode(code));
    }
  }
}

console.log(part1);

function hasDistinctRepeated(str) {
  return new Set(str.match(/([a-z])\1/g)).size >= 2;
}
function handleExcluded(chars) {
  const replaced = chars
    .join('')
    .replaceAll(/i|o|l/g, (match) => getNextChar(match));

  if (chars.join('') === replaced) {
    return true;
  }
  for (let i = 0; i < replaced.length; i++) {
    chars[i] = replaced[i];
  }
  return false;

  function getNextChar(char) {
    const code = (char.charCodeAt(0) + 1) % ('z'.charCodeAt(0) + 1);
    return !code ? 'a' : String.fromCharCode(code);
  }
}
function includesIncreasing(chars) {
  for (let i = 0; i + 3 <= chars.length; i++) {
    const [a, b, c] = Array.from(chars.slice(i, i + 3)).map((char) =>
      char.charCodeAt(0)
    );
    if (b - a === 1 && c - b === 1) {
      return true;
    }
  }
  return false;
}
function increment(items, i = items.length - 1) {
  (items[i] += 1), (items[i] %= BASE);
  if (i === 0 && !items[i]) return items;
  return !items[i] ? increment(items, i - 1) : items;
}
function convertToBase(codes) {
  return codes.map(add, {value: -A_CODE});
}
function convertToCodes(base) {
  return base.map(add, {value: A_CODE});
}
function add(item) {
  return item + this.value;
}
