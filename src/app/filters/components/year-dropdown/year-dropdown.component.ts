import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { YEARS_RANGE } from './year-dropdown.models';

@Component({
  selector: 'app-year-dropdown',
  templateUrl: './year-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearDropdownComponent {
  @Input() selectedYear: number;

  public readonly yearsRange = YEARS_RANGE;
}
