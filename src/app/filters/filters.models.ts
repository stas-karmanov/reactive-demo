import { Lang } from './components/lang-dropdown/lang-dropdown.models';

export interface IFiltersState {
  searchQuery: string;
  year: number;
  lang: Lang;
  isAdult: boolean;
}

export const DEFAULT_STATE: IFiltersState = {
  searchQuery: '',
  year: 2020,
  lang: Lang.US,
  isAdult: false,
};