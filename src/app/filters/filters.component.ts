import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  public onSearchChange(value: string) {
    console.log(value);
  }
}
