export function subtractArrays<T>(array1: T[], array2: T[]): T[] {
  return array2.reduce(
    (acc, val) => (acc.includes(val) && acc.splice(acc.indexOf(val), 1), acc),
    [...array1]
  );
}

export function compareArrays<T>(a: T[], b: T[]): boolean {
  return (
    a.length === b.length && a.every((element, index) => element === b[index])
  );
}
