import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

import { FiltersComponent } from './filters.component';
import { FILTERS_COMPONENTS } from './components';

@NgModule({
  declarations: [FiltersComponent, ...FILTERS_COMPONENTS],
  imports: [CommonModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule, MatSlideToggleModule, MatSelectModule],
  exports: [FiltersComponent],
})
export class FiltersModule {}
