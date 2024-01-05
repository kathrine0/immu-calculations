import { Criterium } from './types';

export const CRITERIA: Criterium[] = [
  {
    name: 'W12',
    conditions: [['W1', 'W1', 'W1'], ['W2'], ['W5', 'W5']],
    value: 75
  },
  {
    name: 'W13',
    conditions: [['W2', 'W2'], ['W3'], ['W1', 'W1', 'W1', 'W2']],
    value: 133
  },
  {
    name: 'W14',
    conditions: [['W3', 'W3'], ['W4'], ['W1', 'W1', 'W1', 'W3']],
    value: 172
  },
];

export const POINT_TO_PLN = 1.78;
