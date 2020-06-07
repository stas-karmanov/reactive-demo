import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FiltersService } from './filters.service';
import { Observable } from 'rxjs';
import { Lang } from './components/lang-dropdown/lang-dropdown.models';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  public lang$: Observable<Lang> = this.filtersService.select(({ lang }) => lang);
  public year$: Observable<number> = this.filtersService.select(({ year }) => year);
  public isAdult$: Observable<boolean> = this.filtersService.select(({ isAdult }) => isAdult);

  constructor(private filtersService: FiltersService) {}
}
