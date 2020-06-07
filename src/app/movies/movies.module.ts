import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { MoviesComponent } from './movies.component';
import { MOVIES_COMPONENT } from './components';

@NgModule({
  declarations: [MoviesComponent, ...MOVIES_COMPONENT],
  imports: [MatCardModule, CommonModule, MatButtonModule],
  exports: [MoviesComponent],
})
export class MoviesModule {}
