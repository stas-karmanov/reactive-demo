import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FiltersService } from './filters.service';
import { Observable, Subject, Subscription } from 'rxjs';

import { Lang } from './components/lang-dropdown/lang-dropdown.models';
import { debounceTime } from 'rxjs/operators';

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

  public search$ = new Subject<string>();

  private subscriptions = new Subscription();

  constructor(private filtersService: FiltersService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.search$.pipe(debounceTime(300)).subscribe(searchQuery => this.filtersService.updateSearchQuery(searchQuery)),
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
