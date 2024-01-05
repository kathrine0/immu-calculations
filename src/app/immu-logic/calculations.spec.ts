import { greedyFindCriteria } from './calculations';
import { Criterium, ImmuResult, Suggestion } from './types';

describe('calculations', () => {
  it('should create correct groups', () => {
    testDataForminAppointments.forEach((testElement) =>
      expect(
        greedyFindCriteria(testElement.input, mockCriteria, testElement.mode)
          .groups
      ).toEqual(testElement.result.groups)
    );
  });

  it('should find unused elements', () => {
    testDataForminAppointments.forEach((testElement) =>
      expect(
        greedyFindCriteria(testElement.input, mockCriteria, testElement.mode)
          .unused
      ).toEqual(testElement.result.unused)
    );
  });

  it('should provide correct suggestions', () => {
    testDataForminAppointments.forEach((testElement) =>
      expect(
        greedyFindCriteria(testElement.input, mockCriteria, testElement.mode)
          .suggestions
      ).toEqual(testElement.result.suggestions)
    );
  });
});

const testDataForminAppointments: Array<{
  input: string[];
  mode: 'minAppointments' | 'maxPoints';
  result: ImmuResult;
}> = [
  {
    input: ['W1', 'w1', 'w1'],
    mode: 'minAppointments',
    result: {
      groups: [{ condition: ['W1', 'W1', 'W1'], name: 'W12', value: 75 }],
      unused: [],
      suggestions: [],
    },
  },
  {
    input: ['W1', 'w1', 'w1'],
    mode: 'maxPoints',
    result: {
      groups: [{ condition: ['W1', 'W1', 'W1'], name: 'W12', value: 75 }],
      unused: [],
      suggestions: [],
    },
  },
  {
    input: ['W1', 'w1', 'w1', 'w2', 'w3', 'w3'],
    mode: 'minAppointments',
    result: {
      groups: [
        { condition: ['W3', 'W3'], name: 'W14', value: 172 },
        { condition: ['W1', 'W1', 'W1', 'W2'], name: 'W13', value: 133 },
      ],
      unused: [],
      suggestions: [],
    },
  },
  {
    input: ['W1', 'w1', 'w1', 'w2', 'w3', 'w3'],
    mode: 'maxPoints',
    result: {
      groups: [
        { condition: ['W1', 'W1', 'W1'], name: 'W12', value: 75 },
        { condition: ['W2'], name: 'W12', value: 75 },
        { condition: ['W3'], name: 'W13', value: 133 },
        { condition: ['W3'], name: 'W13', value: 133 },
      ],
      unused: [],
      suggestions: [],
    },
  },
  {
    input: ['w3', 'w3', 'W1'],
    mode: 'minAppointments',
    result: {
      groups: [{ condition: ['W3', 'W3'], name: 'W14', value: 172 }],
      unused: ['W1'],
      suggestions: [
        {
          unused: ['W1'],
          add: ['W1', 'W1'],
          criterium: { condition: ['W1', 'W1', 'W1'], name: 'W12', value: 75 },
        },
      ],
    },
  },
  {
    input: ['w3', 'w3', 'W1'],
    mode: 'maxPoints',
    result: {
      groups: [
        { condition: ['W3'], name: 'W13', value: 133 },
        { condition: ['W3'], name: 'W13', value: 133 },
      ],
      unused: ['W1'],
      suggestions: [
        {
          unused: ['W1'],
          add: ['W1', 'W1'],
          criterium: { condition: ['W1', 'W1', 'W1'], name: 'W12', value: 75 },
        },
      ],
    },
  },
  {
    input: ['w1', 'w1', 'w5'],
    mode: 'minAppointments',
    result: {
      groups: [],
      unused: ['W1', 'W1', 'W5'],
      suggestions: [
        {
          unused: ['W1', 'W1'],
          add: ['W1'],
          criterium: { condition: ['W1', 'W1', 'W1'], name: 'W12', value: 75 },
        },
        {
          unused: ['W5'],
          add: ['W5'],
          criterium: { condition: ['W5', 'W5'], name: 'W12', value: 75 },
        },
      ],
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
