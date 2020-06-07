import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IMovie } from 'src/app/services';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent {
  @Input() movie: IMovie;
}
