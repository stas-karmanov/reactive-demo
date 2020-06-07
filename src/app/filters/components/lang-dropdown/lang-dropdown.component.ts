import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { LANGS, Lang } from './lang-dropdown.models';

@Component({
  selector: 'app-lang-dropdown',
  templateUrl: './lang-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangDropdownComponent {
  @Input() selectedLang: Lang;

  public readonly langs = LANGS;
}
