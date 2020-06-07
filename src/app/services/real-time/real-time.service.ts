import { Injectable } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { expand, map } from 'rxjs/operators';

import { IPopularityItem } from './real-time.models';

@Injectable({
  providedIn: 'root',
})
export class RealTimeService {
  public getPopularityList(moviesIds: number[]): Observable<IPopularityItem>[] {
    return moviesIds.map(id =>
      timer(this.getRandomNumber(10000)).pipe(
        map(() => ({ movieId: id, popularity: this.getRandomNumber(100) })),
        expand(() => timer(this.getRandomNumber(10000)).pipe(map(() => ({ movieId: id, popularity: this.getRandomNumber(100) })))),
      ),
    );
  }

  private getRandomNumber(upperLimit: number): number {
    return Math.floor(Math.random() * upperLimit) + 1;
  }
}
