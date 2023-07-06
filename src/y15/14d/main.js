#!/usr/bin/env bun
import input from './input.txt';

const reName = /[A-Z][a-z]*/;
const parsedLines = input
  .split('\n')
  .map((line) => [...line.match(reName), ...line.match(/\d+/g).map(Number)]);

let part1;
{
  part1 = Math.max(...parsedLines.map((line) => race(2503, line)));

  function race(timeLimit, [_name, speed, time, rest]) {
    let distance = 0;
    for (let i = 0, isResting = false; i < timeLimit; isResting = !isResting) {
      if (!isResting) {
        i += time;
        distance += time * speed;

        if (i >= timeLimit) {
          distance -= (i - timeLimit) * speed;
        }
      } else {
        i += rest;
      }
    }
    return distance;
  }
}

let part2;
{
  const scores = {};
  for (let i = 0; i < 2503; i++) {
    for (const [name, speed, time, rest] of parsedLines) {
      scores[name] ??= {score: 0, time: 0, rest: 0, isResting: false, p2: 0};
      if (!scores[name].isResting) {
        scores[name].time += 1;
        scores[name].score += speed;

        if (scores[name].time === time) {
          scores[name].time = 0;
          scores[name].isResting = true;
        } else {
        }
      } else {
        scores[name].rest += 1;

        if (scores[name].rest === rest) {
          scores[name].rest = 0;
          scores[name].isResting = false;
        }
      }
    }
    const maxScore = Math.max(...Object.values(scores).map(({score}) => score));
    for (const score of Object.values(scores)) {
      if (score.score === maxScore) {
        score.p2 += 1;
      }
    }
  }
  console.log(scores);
  part2 = Math.max(...Object.values(scores).map(({p2}) => p2));
}

console.log(part1, part2);
