import { Component, ChangeDetectionStrategy } from '@angular/core';

import { LANGS } from './lang-dropdown.models';

@Component({
  selector: 'app-lang-dropdown',
  templateUrl: './lang-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangDropdownComponent {
  public readonly langs = LANGS;
}
