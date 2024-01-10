import {
  compareArrays,
  findPermutations,
  subtractArrays,
} from './array-helpers';

describe('array helpers', () => {
  describe('subtractArrays', () => {
    const testData = [
      { array1: [1, 2, 3, 5, 6], array2: [1, 2, 6], expectedValue: [3, 5] },
      { array1: [1, 2, 3, 5, 6], array2: [4, 9], expectedValue: [1, 2, 3, 5, 6] },
      { array1: [], array2: [4, 9], expectedValue: [] },
      { array1: [1, 2, 3], array2: [], expectedValue: [1, 2, 3] },
    ];

    it.each(testData)(
      'should $array1 - $array2 equal $expectedValue',
      ({ array1, array2, expectedValue }) => {
        const result = subtractArrays(array1, array2);

        expect(result).toEqual(expectedValue);
      }
    );
  });

  describe('compareArrays', () => {
    const dataSet = [
      { array1: [1, 2, 3, 5, 6], array2: [1, 2, 6], expectedValue: false },
      { array1: [1, 2, 3], array2: [1, 2, 3], expectedValue: true },
      { array1: [1, 2, 3], array2: [3, 2, 1], expectedValue: false },
    ];

    it.each(dataSet)(
      'should $array1 comparing to $array2 equal $expectedValue',
      ({ array1, array2, expectedValue }) => {
        const result = compareArrays(array1, array2);

        expect(result).toEqual(expectedValue);
      }
    );
  });

  describe('findPermutations', () => {
    it('should return all possible permutations', () => {
      const input = [1, 2, 3];
      const expectedValue = [
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1],
      ];

      const result = findPermutations(input);
      expect(result).toEqual(expectedValue);
    });
  });
})
