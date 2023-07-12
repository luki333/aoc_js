#!/usr/bin/env bun
import {add} from '@tools';
import input from './input.txt';

let grid = input
  .split('\n')
  .map((line) => line.split('').map((c) => (c === '#' ? 1 : 0)));

grid[0][0] = 1;
grid[0][grid[0].length - 1] = 1;
grid[grid.length - 1][0] = 1;
grid[grid.length - 1][grid[0].length - 1] = 1;

for (let limit = 0; limit < 100; limit++) {
  const newGrid = grid.map((line) => [...line]);

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      if (
        (i === 0 || i === newGrid.length - 1) &&
        (j === 0 || j === newGrid[i].length - 1)
      )
        continue;

      let acc = 0;

      for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
          if (k === i && l === j) continue;

          acc += grid[k]?.[l] ?? 0;
        }
      }
      if (acc === 3 || (acc === 2 && grid[i][j] === 1)) {
        newGrid[i][j] = 1;
      } else {
        newGrid[i][j] = 0;
      }
    }
  }
  grid = newGrid;
}

console.log(grid.flat().reduce(add));
