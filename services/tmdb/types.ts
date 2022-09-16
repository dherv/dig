export enum MediaType {
  TV = "tv",
  Movie = "movie",
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Show extends Movie {
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
  videos: {
    results: Video[];
  };
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
