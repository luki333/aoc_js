#!/usr/bin/env bun
import input from './input.txt';

const ips = input.split('\n').map((ip) => ip.split(/\[|\]/g));

let part1;
{
  const re = /(\w)(?!\1)(\w)\2\1/;

  part1 = ips.filter(
    (ip) =>
      ip.some((chunk, i) => (i + 1) % 2 && re.test(chunk)) &&
      !ip.some((chunk, i) => !((i + 1) % 2) && re.test(chunk))
  ).length;
}

let part2;
{
  const re = /(\w)(?!\1)(\w)\1/g;

  let i = 0;
  for (const ip of ips) {
    const matched = ip
      .flatMap((chunk, i) => ((i + 1) % 2 ? reFindAll(re, chunk) : []))
      .map((aba) => `${aba[1]}${aba[0]}${aba[1]}`);

    if (
      ip.some(
        (chunk, i) =>
          !((i + 1) % 2) && matched.some((aba) => chunk.includes(aba))
      )
    ) {
      i++;
    }
  }
  part2 = i;

  function reFindAll(re, str) {
    const matches = [];
    for (let i = 0; i < str.length; i++) {
      matches.push(...(str.slice(i).match(re) ?? []));
    }
    return Array.from(new Set(matches));
  }
}

console.log(part1, part2);
