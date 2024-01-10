export function subtractArrays<T>(a: T[], b: T[]): T[] {
  return b.reduce(
    (acc, val) => (acc.includes(val) && acc.splice(acc.indexOf(val), 1), acc),
    [...a]
  );
}

export function compareArrays<T>(a: T[], b: T[]): boolean {
  return (
    a.length === b.length && a.every((element, index) => element === b[index])
  );
}

export function findPermutations<T>(a: T[]): T[][] {
  if (a.length <= 1) {
      return [a];
  }

  let result: T[][] = [];
  for (let i = 0; i < a.length; i++) {
    let element = a[i];
    let rest = a.slice();
    rest.splice(i, 1);
    let restPermutations = findPermutations(rest);
    for (let permutation of restPermutations) {
      result.push([element, ...permutation]);
    }
  }

  return result;
}
