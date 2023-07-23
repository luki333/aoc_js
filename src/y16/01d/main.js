#!/usr/bin/env bun
import input from './input.txt';

const parsedInput = parseInput(input);

let part1;
{
  const pos = [0, 0];
  const move = createMove(pos);

  for (const info of parsedInput) {
    move(...info);
  }
  console.log('end', pos);
}

function createMove(pos) {
  const info = [1, 1];
  const visited = new Set();

  return function (d, n) {
    switch (info.toString()) {
      case '0,1':
      case '1,-1':
        info[1] = 1 * d;
        break;
      case '0,-1':
      case '1,1':
        info[1] = -1 * d;
        break;
    }
    info[0] ^= 1;

    const prevPos = [...pos];
    pos[info[0]] += n * info[1];

    let i = 0;
    iterate2d(prevPos, pos, (x, y) => {
      if (i !== 0) {
        const strPos = [x, y].toString();
        if (visited.has(strPos)) {
          throw strPos;
        }
        visited.add(strPos);
      }
      i++;
    });
    console.log('\n');
  };
}
function parseInput(input) {
  return input
    .split(', ')
    .map(([d, ...n]) => [directionToNumber(d), Number(n.join(''))]);

  function directionToNumber(d) {
    return d === 'L' ? 1 : -1;
  }
}
function iterate2d([xFrom, yFrom], [xTo, yTo], fn) {
  const [xs, ys] = [[], []];
  iterate(xFrom, xTo, (n) => xs.push(n));
  iterate(yFrom, yTo, (n) => ys.push(n));

  for (const y of ys) {
    for (const x of xs) {
      fn(x, y);
    }
  }
}
function iterate(from, to, fn) {
  for (
    let n = Math.sign(to - from) || Math.sign(from) || 1, i = from;
    true;
    i += n
  ) {
    if ((n === 1 && i > to) || (n === -1 && i < to)) break;
    fn(i);
  }
}
