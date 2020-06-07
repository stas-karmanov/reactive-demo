import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, merge } from 'rxjs';
import { map, distinctUntilChanged, switchMap, withLatestFrom, tap, takeUntil } from 'rxjs/operators';

import { IState, DEFAULT_STATE } from './state.models';
import { MoviesService, IFiltersState } from '../services';
import { IMovie } from '../services/movies/movies.models';
import { RealTimeService } from '../services/real-time/real-time.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state$ = new BehaviorSubject<IState>(DEFAULT_STATE);
  private loadMovies$ = new Subject<void>();

  private cancelMoviesUpdate$ = new Subject<void>();

  private moviesEffect$ = this.loadMovies$.pipe(
    withLatestFrom(this.select<IFiltersState>(({ filters }) => filters)),
    switchMap(([, { searchQuery, year, lang, isAdult }]) =>
      this.moviesService.searchMovies({ query: searchQuery, year, lang, isAdult }).pipe(takeUntil(this.cancelMoviesUpdate$)),
    ),
    tap(movies => this.updateMovies(movies)),
  );

  private moviesRatingEffect$ = this.select<IMovie[]>(({ movies }) => movies).pipe(
    switchMap(movies => {
      const ratingList = this.realTimeService.getPopularityList(movies.map(({ id }) => id));

      return merge(...ratingList).pipe(
        takeUntil(this.cancelMoviesUpdate$),
        tap(({ movieId, popularity }) => {
          const moviesCopy = [...movies];
          const updatedMovieIndex = moviesCopy.findIndex(({ id }) => movieId === id);
          moviesCopy[updatedMovieIndex] = { ...moviesCopy[updatedMovieIndex], popularity };

          this.updateMovies(moviesCopy);
        }),
      );
    }),
  );

  constructor(private moviesService: MoviesService, private realTimeService: RealTimeService) {
    this.moviesEffect$.subscribe();
    this.moviesRatingEffect$.subscribe();
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

  public cancelMoviesUpdate() {
    this.cancelMoviesUpdate$.next();
  }

  private updateMovies(movies: IMovie[]) {
    this.state$.next({ ...this.state$.getValue(), movies });
  }
}
