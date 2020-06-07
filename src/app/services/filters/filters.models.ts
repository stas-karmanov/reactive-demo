import { Lang } from '../../filters/components/lang-dropdown/lang-dropdown.models';

export interface IFiltersState {
  searchQuery: string;
  year: number;
  lang: Lang;
  isAdult: boolean;
}

export const DEFAULT_FILTERS_STATE: IFiltersState = {
  searchQuery: '',
  year: 2020,
  lang: Lang.US,
  isAdult: false,
};
