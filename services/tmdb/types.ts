export enum MediaType {
  TV = "tv",
  Movie = "movie",
}

interface BaseShow {
  id: number;
  adult: boolean;
  backdrop_path: string;
  overview: string;
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: Video[];
  };
}
export interface Movie extends BaseShow {
  genre_ids: number[];
  release_date: string;
  title: string;
  runtime: string;
}

export interface Serie extends BaseShow {
  created_by: any[];
  episode_run_time: string[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  images: any[];
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: any;
  media_type: MediaType;
  name: string;
  networks: any[];
  next_episode_to_air: any;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];

  production_companies: string[];
  production_countries: string[];
  seasons: any[];
  spoken_languages: string[];
  status: string;
  tagline: string;
  type: string;
}

export interface Show extends Movie, Serie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: Genre[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  media_type: MediaType;
  name: string;
  origin_country: string[];
  original_name: string;
}

export interface TV extends Show {}

// TODO: add enums - check if library exists already
export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Genre {
  id: number;
  name: string;
}
