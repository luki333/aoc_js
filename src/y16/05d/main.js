#!/usr/bin/env bun
import {MD5} from 'bun';
import input from './input.txt';

let part1;
{
  let password = '';
  for (let i = 0; password.length !== 8; i++) {
    const hash = new MD5().update(input + i).digest('hex');

    if (hash.startsWith('0'.repeat(5))) {
      password += hash.at(5);
    }
  }
  part1 = password;
}

let part2;
{
  let password = Array(8);
  for (let i = 0, len = 0; len !== 8; i++) {
    const hash = new MD5().update(input + i).digest('hex');

    if (hash.startsWith('0'.repeat(5))) {
      const pos = hash.at(5);

      if (pos >= 0 && pos <= 7) {
        password[pos] ??= (++len, hash.at(6));
      }
    }
  }
  part2 = password.join('');
}

console.log(part1, part2);
