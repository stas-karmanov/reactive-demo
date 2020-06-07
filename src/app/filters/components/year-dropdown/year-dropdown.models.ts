const START_YEAR = 1895;
const END_YEAR = 2020;

export interface IDropdownItem {
  year: number;
  isSelected: boolean;
}

export const YEARS_RANGE: IDropdownItem[] = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, index) => ({
  year: START_YEAR + index,
  isSelected: false,
}));
