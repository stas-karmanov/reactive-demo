import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FiltersModule } from './filters/filters.module';
import { MoviesModule } from './movies/movies.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, FiltersModule, HttpClientModule, MoviesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
