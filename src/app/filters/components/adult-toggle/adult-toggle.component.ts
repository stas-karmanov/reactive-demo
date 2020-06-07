import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-adult-toggle',
  templateUrl: './adult-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdultToggleComponent {
  @Input() isAdult: boolean;
  @Output() stateChange = new EventEmitter<boolean>();
}
