import { findOptimalCriteria } from './calculations';
import { Criterium, ImmuResult } from './types';

const testData: Array<{
  input: string[];
  expectedValue: {
    minAppointmentsResult: ImmuResult;
    maxPointsResult: ImmuResult;
  };
}> = [
  {
    input: ['W1', 'w1', 'w1'],
    expectedValue: {
      minAppointmentsResult: {
        groups: [{ condition: ['W1', 'W1', 'W1'], name: 'W12', value: 75 }],
        unused: [],
        suggestions: [],
        totalPoints: 75,
      },
      maxPointsResult: {
        groups: [{ condition: ['W1', 'W1', 'W1'], name: 'W12', value: 75 }],
        unused: [],
        suggestions: [],
        totalPoints: 75,
      },
    },
  },
  {
    input: ['W1', 'w1', 'w1', 'w2', 'w3', 'w3'],
    expectedValue: {
      minAppointmentsResult: {
        groups: [
          { condition: ['W3', 'W3'], name: 'W14', value: 172 },
          { condition: ['W1', 'W1', 'W1', 'W2'], name: 'W13', value: 133 },
        ],
        unused: [],
        suggestions: [],
        totalPoints: 305,
      },
      maxPointsResult: {
        groups: [
          { condition: ['W1', 'W1', 'W1'], name: 'W12', value: 75 },
          { condition: ['W2'], name: 'W12', value: 75 },
          { condition: ['W3'], name: 'W13', value: 133 },
          { condition: ['W3'], name: 'W13', value: 133 },
        ],
        unused: [],
        suggestions: [],
        totalPoints: 416,
      },
    },
  },
  {
    input: ['w3', 'w3', 'W1'],
    expectedValue: {
      minAppointmentsResult: {
        groups: [{ condition: ['W3', 'W3'], name: 'W14', value: 172 }],
        unused: ['W1'],
        suggestions: [
          {
            unused: ['W1'],
            add: ['W1', 'W1'],
            criterium: {
              condition: ['W1', 'W1', 'W1'],
              name: 'W12',
              value: 75,
            },
          },
        ],
        totalPoints: 172,
      },
      maxPointsResult: {
        groups: [
          { condition: ['W3'], name: 'W13', value: 133 },
          { condition: ['W3'], name: 'W13', value: 133 },
        ],
        unused: ['W1'],
        suggestions: [
          {
            unused: ['W1'],
            add: ['W1', 'W1'],
            criterium: {
              condition: ['W1', 'W1', 'W1'],
              name: 'W12',
              value: 75,
            },
          },
        ],
        totalPoints: 266,
      },
    },
  },
  {
    input: ['w1', 'w1', 'w5'],
    expectedValue: {
      minAppointmentsResult: {
        groups: [],
        unused: ['W1', 'W1', 'W5'],
        suggestions: [
          {
            unused: ['W1', 'W1'],
            add: ['W1'],
            criterium: {
              condition: ['W1', 'W1', 'W1'],
              name: 'W12',
              value: 75,
            },
          },
          {
            unused: ['W5'],
            add: ['W5'],
            criterium: { condition: ['W5', 'W5'], name: 'W12', value: 75 },
          },
        ],
        totalPoints: 0,
      },
      maxPointsResult: {
        groups: [],
        unused: ['W1', 'W1', 'W5'],
        suggestions: [
          {
            unused: ['W1', 'W1'],
            add: ['W1'],
            criterium: {
              condition: ['W1', 'W1', 'W1'],
              name: 'W12',
              value: 75,
            },
          },
          {
            unused: ['W5'],
            add: ['W5'],
            criterium: { condition: ['W5', 'W5'], name: 'W12', value: 75 },
          },
        ],
        totalPoints: 0,
      },
    },
  },
  {
    input: ['w1', 'w1', 'w1', 'w2', 'w3'],
    expectedValue: {
      maxPointsResult: {
        groups: [
          { condition: ['W1', 'W1', 'W1'], name: 'W12', value: 75 },
          { condition: ['W2'], name: 'W12', value: 75 },
          { condition: ['W3'], name: 'W13', value: 133 },
        ],
        unused: [],
        suggestions: [],
        totalPoints: 283,
      },
      minAppointmentsResult: {
        groups: [
          { condition: ['W3'], name: 'W13', value: 133 },
          { condition: ['W1', 'W1', 'W1', 'W2'], name: 'W13', value: 133 },
        ],
        unused: [],
        suggestions: [],
        totalPoints: 266,
      },
    },
  },
];

const mockCriteria: Criterium[] = [
  {
    name: 'W12',
    conditions: [['W1', 'W1', 'W1'], ['W2'], ['W5', 'W5']],
    value: 75,
  },
  {
    name: 'W13',
    conditions: [['W2', 'W2'], ['W3'], ['W1', 'W1', 'W1', 'W2']],
    value: 133,
  },
  {
    name: 'W14',
    conditions: [['W3', 'W3'], ['W4'], ['W1', 'W1', 'W1', 'W3']],
    value: 172,
  },
];

describe('calculations', () => {
  it.each(testData)(
    'should find correct results for $input',
    ({ input, expectedValue }) => {
      const result = findOptimalCriteria(input, mockCriteria);
      expect(result).toEqual(expectedValue);
    }
  );
});
