import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CONFIG, IAppConfig } from '../config';
import { Lang } from '../filters/components/lang-dropdown/lang-dropdown.models';
import { IMoviesResponse } from './movies.models';

interface ILoadMoviesArgs {
  query: string;
  year: number;
  lang: Lang;
  isAdult: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(@Inject(CONFIG) private config: IAppConfig, private http: HttpClient) {}

  public searchMovies({ query, year, lang, isAdult }: ILoadMoviesArgs) {
    return this.http.get<IMoviesResponse>(`${this.config.apiUrl}/search/movie`, {
      params: {
        query,
        include_adult: isAdult.toString(),
        language: lang,
        year: year.toString(),
        api_key: this.config.apiKey,
      },
    });
  }
}
