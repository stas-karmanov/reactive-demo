import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchButtonComponent {
  @Input() isActive: boolean;
  @Output() search = new EventEmitter<void>();
}
