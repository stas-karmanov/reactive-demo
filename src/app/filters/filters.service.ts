import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { IFiltersState, DEFAULT_STATE } from './filters.models';
import { Lang } from './components/lang-dropdown/lang-dropdown.models';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private state$ = new BehaviorSubject<IFiltersState>(DEFAULT_STATE);

  constructor() {
    this.state$.subscribe(console.log);
  }

  public select<T = any>(selectFn: (state: IFiltersState) => T): Observable<T> {
    return this.state$.pipe(map(selectFn), distinctUntilChanged());
  }

  public updateSearchQuery(searchQuery: string) {
    this.state$.next({ ...this.state$.getValue(), searchQuery });
  }

  public updateAdultState(isAdult: boolean) {
    this.state$.next({ ...this.state$.getValue(), isAdult });
  }

  public updateLang(lang: Lang) {
    this.state$.next({ ...this.state$.getValue(), lang });
  }

  public updateYear(year: number) {
    this.state$.next({ ...this.state$.getValue(), year });
  }
}
