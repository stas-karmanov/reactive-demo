import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { IState, DEFAULT_STATE } from './state.models';
import { IFiltersState } from '../filters/filters.models';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state$ = new BehaviorSubject<IState>(DEFAULT_STATE);

  public select<T = any>(selectFn: (state: IState) => T): Observable<T> {
    return this.state$.pipe(map(selectFn), distinctUntilChanged());
  }

  public updateFilters(filters: IFiltersState) {
    this.state$.next({ ...this.state$.getValue(), filters });
  }
}
