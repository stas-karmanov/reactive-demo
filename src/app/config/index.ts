import { InjectionToken } from '@angular/core';

export interface IAppConfig {
  apiKey: string;
  apiUrl: string;
  posterUrl: string;
}

export const CONFIG = new InjectionToken<IAppConfig>('app.config', {
  providedIn: 'root',
  factory: () => ({
    apiKey: 'a5798cef72f016b6f49b907146ae4449',
    apiUrl: 'https://api.themoviedb.org/3',
    posterUrl: 'http://image.tmdb.org/t/p/w200',
  }),
});
