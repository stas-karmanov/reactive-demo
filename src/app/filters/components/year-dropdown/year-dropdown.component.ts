import { Component, ChangeDetectionStrategy } from '@angular/core';

import { YEARS_RANGE } from './year-dropdown.models';

@Component({
  selector: 'app-year-dropdown',
  templateUrl: './year-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearDropdownComponent {
  public readonly yearsRange = YEARS_RANGE;
}
