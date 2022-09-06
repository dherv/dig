interface Options {
  query?: string;
}

interface ImageOptions {
  size: string;
}

export const url = (path: string, options: Options = { query: "" }) => {
  return `${process.env.NEXT_PUBLIC_TMDB_URI}${path}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&query=${options.query}&page=1&include_adult=false`;
};

export const posterPath = (
  path: string,
  options: ImageOptions = { size: "w500" }
) => {
  return `https://image.tmdb.org/t/p/${options.size}${path}`;
};
