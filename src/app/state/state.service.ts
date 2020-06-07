import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, distinctUntilChanged, switchMap, withLatestFrom, tap, takeUntil } from 'rxjs/operators';

import { IState, DEFAULT_STATE } from './state.models';
import { MoviesService, IFiltersState } from '../services';
import { IMovie } from '../services/movies/movies.models';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state$ = new BehaviorSubject<IState>(DEFAULT_STATE);
  private loadMovies$ = new Subject<void>();

  private cancelMoviesRequest$ = new Subject<void>();

  private moviesEffect$ = this.loadMovies$.pipe(
    withLatestFrom(this.select<IFiltersState>(({ filters }) => filters)),
    switchMap(([, { searchQuery, year, lang, isAdult }]) =>
      this.moviesService.searchMovies({ query: searchQuery, year, lang, isAdult }).pipe(takeUntil(this.cancelMoviesRequest$)),
    ),
    tap(movies => this.updateMovies(movies)),
  );

  constructor(private moviesService: MoviesService) {
    this.moviesEffect$.subscribe();
  }

  public select<T = any>(selectFn: (state: IState) => T): Observable<T> {
    return this.state$.pipe(map(selectFn), distinctUntilChanged());
  }

  public updateFilters(filters: IFiltersState) {
    this.state$.next({ ...this.state$.getValue(), filters });
  }

  public loadMovies() {
    this.loadMovies$.next();
  }

  public cancelMoviesRequest() {
    this.cancelMoviesRequest$.next();
  }

  private updateMovies(movies: IMovie[]) {
    this.state$.next({ ...this.state$.getValue(), movies });
  }
}
