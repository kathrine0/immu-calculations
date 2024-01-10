export type Criterium = {
  name: string;
  conditions: string[][];
  value: number;
};

export type FlatCriterium = {
  name: string;
  condition: string[];
  value: number;
};

export type CriteriumMatch = {
  match: boolean;
  result: string[];
};

export type ImmuResult = {
  groups: FlatCriterium[];
  unused: string[];
  suggestions: Suggestion[];
  totalPoints: number;
}

export type Suggestion = {
  unused: string[];
  add: string[];
  criterium: FlatCriterium;
}
