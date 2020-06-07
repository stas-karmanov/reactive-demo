import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { IFiltersState, DEFAULT_STATE } from './filters.models';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private state$ = new BehaviorSubject<IFiltersState>(DEFAULT_STATE);

  public select<T = any>(selectFn: (state: IFiltersState) => T): Observable<T> {
    return this.state$.pipe(map(selectFn), distinctUntilChanged());
  }
}
