import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { StateService } from '../state/state.service';
import { IMovie } from '../services';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent implements OnInit, OnDestroy {
  public movies$: Observable<IMovie[]> = this.state.select<IMovie[]>(({ movies }) => movies);

  private subscriptions = new Subscription();

  constructor(private state: StateService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.state
        .select(({ filters }) => filters)
        .pipe(filter(({ searchQuery }) => Boolean(searchQuery)))
        .subscribe(() => this.state.loadMovies()),
    );
  }

  public trackByMovieId(movie: IMovie) {
    return movie.id;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
