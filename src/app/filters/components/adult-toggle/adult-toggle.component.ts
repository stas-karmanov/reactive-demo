import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-adult-toggle',
  templateUrl: './adult-toggle.component.html',
  styleUrls: ['./adult-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdultToggleComponent {
  @Input() checked: boolean;
  @Output() stateChange = new EventEmitter<boolean>();
}
