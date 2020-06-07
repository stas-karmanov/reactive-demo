import { IFiltersState, DEFAULT_FILTERS_STATE } from '../filters/filters.models';

export interface IState {
  filters: IFiltersState;
  movies: any[];
}

export const DEFAULT_STATE: IState = {
  filters: DEFAULT_FILTERS_STATE,
  movies: [],
};
