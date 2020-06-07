import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import isEqual from 'lodash/isEqual';

import { Lang } from './components/lang-dropdown/lang-dropdown.models';
import { debounceTime, withLatestFrom, map, filter } from 'rxjs/operators';
import { StateService } from '../state/state.service';
import { FiltersService } from '../services';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit, OnDestroy {
  public lang$: Observable<Lang> = this.filtersService.select(({ lang }) => lang);
  public year$: Observable<number> = this.filtersService.select(({ year }) => year);
  public isAdult$: Observable<boolean> = this.filtersService.select(({ isAdult }) => isAdult);

  public isSearchButtonActive$: Observable<boolean> = combineLatest([
    this.filtersService.select(state => state),
    this.state.select(({ filters }) => filters),
  ]).pipe(map(([currentFiltersState, filtersState]) => !isEqual(currentFiltersState, filtersState)));

  public searchQuery$ = new Subject<string>();
  public search$ = new Subject<void>();

  private subscriptions = new Subscription();

  constructor(private filtersService: FiltersService, private state: StateService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.searchQuery$.pipe(debounceTime(300)).subscribe(searchQuery => this.filtersService.updateSearchQuery(searchQuery)),
    );

    this.subscriptions.add(
      this.search$
        .pipe(
          withLatestFrom(
            this.filtersService.select(state => state),
            this.isSearchButtonActive$,
          ),
          filter(([, , isSearchButtonActive]) => isSearchButtonActive),
        )
        .subscribe(([, filtersState]) => this.state.updateFilters(filtersState)),
    );
  }

  public onToggleStateChange(toggleState: boolean) {
    this.filtersService.updateAdultState(toggleState);
  }

  public onLangChange(lang: Lang) {
    this.filtersService.updateLang(lang);
  }

  public onYearChange(year: number) {
    this.filtersService.updateYear(year);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
