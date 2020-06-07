const START_YEAR = 1895;
const END_YEAR = 2020;

export const YEARS_RANGE = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, index) => START_YEAR + index);
