import {
  compareArrays,
  findPermutations,
  subtractArrays,
} from './array-helpers';
import {
  Criterium,
  CriteriumMatch,
  FlatCriterium,
  ImmuResult,
  Suggestion,
} from './types';

export const findOptimalCriteria = (
  input: string[],
  criteria: Criterium[]
): { minAppointmentsResult: ImmuResult; maxPointsResult: ImmuResult } => {
  const inputToUpper = input.map((val) => val.toUpperCase());
  const criteriaPermutations = findPermutations(criteria);

  const possibleResults = criteriaPermutations.map((c) => {
    const flatCriteria = flattenCriteria(c);

    const groups = createGroups(inputToUpper, flatCriteria);
    const unused = findUnused(inputToUpper, groups);
    const suggestions = findSuggestions(unused, flatCriteria);
    const totalPoints = groups.reduce((acc, val) => (acc += val.value), 0);

    return { groups, unused, suggestions, totalPoints };
  });

  const minAppointmentsResult = possibleResults.reduce((acc, val) =>
    acc &&
    (acc.groups.length < val.groups.length ||
      (acc.groups.length === val.groups.length &&
        acc.totalPoints > val.totalPoints))
      ? acc
      : val
  );
  const maxPointsResult = possibleResults.reduce((acc, val) =>
    acc &&
    (acc.totalPoints > val.totalPoints ||
      (acc.totalPoints === val.totalPoints &&
        acc.groups.length < val.groups.length))
      ? acc
      : val
  );

  return {
    minAppointmentsResult,
    maxPointsResult,
  };
};

const createGroups = (input: string[], flatCriteria: FlatCriterium[]) => {
  let inputcp = [...input];
  const groups = [];

  for (let criterium of flatCriteria) {
    let exploredAllInCriterium = false; // one criterium can be fulfilled multiple times in input
    while (!exploredAllInCriterium) {
      const matchResult = matchCriteriumCondition(inputcp, criterium.condition);
      inputcp = [...matchResult.result];
      if (matchResult.match) {
        groups.push(criterium);
      } else {
        exploredAllInCriterium = true;
      }
    }
  }

  return groups;
};

const findUnused = (input: string[], groups: FlatCriterium[]): string[] => {
  const used = groups.reduce(
    (acc, val) => [...acc, ...val.condition],
    [] as string[]
  );

  const unused = subtractArrays(input, used);

  return unused;
};

const findSuggestions = (
  unused: string[],
  flatCriteria: FlatCriterium[]
): Suggestion[] => {
  const min2Criteria = flatCriteria.filter(
    (criterium) => criterium.condition.length > 1
  );

  const suggestions: Suggestion[] = [];

  flatCriteria.forEach((criterium) => {
    const condition = [...criterium.condition];
    const unusedInCondition: string[] = [];
    unused.forEach((w) => {
      if (condition.includes(w)) {
        condition.splice(criterium.condition.indexOf(w), 1);
        unusedInCondition.push(w);
      }
    });
    if (condition.length < criterium.condition.length) {
      const similarSuggestionIndex = suggestions.findIndex((suggestion) =>
        compareArrays(suggestion.unused, unusedInCondition)
      );
      const newSuggestion = {
        unused: unusedInCondition,
        add: condition,
        criterium,
      };

      if (similarSuggestionIndex < 0) {
        suggestions.push(newSuggestion);
      } else if (
        suggestions[similarSuggestionIndex].add.length > condition.length
      ) {
        suggestions[similarSuggestionIndex] = newSuggestion;
      }
    }
  });

  return suggestions;
};

// If condition is matched returns true and input array reduced of the condition params, else returns original array and false;
const matchCriteriumCondition = (
  inputArray: string[],
  condition: string[]
): CriteriumMatch => {
  const arraycp = [...inputArray];
  for (let el of condition) {
    const elementIndex = arraycp.indexOf(el);
    if (elementIndex >= 0) {
      arraycp.splice(elementIndex, 1);
    } else {
      return {
        match: false,
        result: inputArray,
      };
    }
  }

  return {
    match: true,
    result: arraycp,
  };
};

const flattenCriteria = (criteria: Criterium[]): FlatCriterium[] =>
  criteria.reduce(
    (acc, { name, conditions, value }) => [
      ...acc,
      ...conditions.map((condition) => ({
        name,
        condition,
        value,
      })),
    ],
    [] as FlatCriterium[]
  );
