export function add(a, b) {
  return a + b;
}
export function permute(items) {
  if (!items.length) {
    return [[]];
  }
  const [first, ...rest] = items;
  return permute(rest).flatMap((items) => interleave(first, items));
}
function interleave(item, items) {
  if (!items.length) {
    return [[item]];
  }
  const [first, ...rest] = items;
  return [
    [item, first, ...rest],
    ...interleave(item, rest).map((items) => [first, ...items]),
  ];
}
