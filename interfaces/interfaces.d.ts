export interface TraktIds {
  trakt: number;
  slug: string;
  imdb: string;
  tmdb: number;
  tvdb?: number;
}

export interface TraktMovie {
  title: string;
  year: number;
  ids: TraktIds;
  tagline: string;
  overview: string;
  released: string;
  runtime: number;
  country: string;
  trailer: string;
  homepage: string;
  status: string;
  rating: number;
  votes: number;
  comment_count: number;
  updated_at: string;
  language: string;
  available_translations: string[];
  genres: string[];
  certification: string;
}

export interface TraktShow {
  title: string;
  year: number;
  ids: TraktIds;
  overview: string;
  first_aired: string;
  airs: {
    day: string;
    time: string;
    timezone: string;
  };
  runtime: number;
  certification: string;
  network: string;
  country: string;
  trailer: string;
  homepage: string;
  status: string;
  rating: number;
  votes: number;
  comment_count: number;
  updated_at: string;
  language: string;
  available_translations: string[];
  genres: string[];
  aired_episodes: number;
}

export type TraktContent = TraktMovie | TraktShow;

export interface TraktSearchResult {
  type: 'movie' | 'show';
  score: number;
  movie?: TraktMovie;
  show?: TraktShow;
}


