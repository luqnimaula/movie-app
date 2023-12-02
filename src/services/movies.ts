import { DefaultApiResponseWithPagination } from "src/types/api"
import { DiscoverMoviesParams, MovieGenreItem, MovieItem, SearchMoviesParams } from "src/types/movies"
import api from "src/utils/api"

export const fetchMovieGenres = async () => {
  try {
    const response = await api.get<{ genres: Array<MovieGenreItem> }>('/genre/movie/list')
    return response
  } catch (error) {
    throw error
  }
}

export const fetchDiscoverMovies = async ({ page, genreId  }: DiscoverMoviesParams) => {
  try {
    const response = await api.get<DefaultApiResponseWithPagination<MovieItem[]>>(
      '/discover/movie',
      {
        params: { 
          page,
          ...genreId ? { with_genres: genreId } : {}
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const fetchSearchMovies = async ({query, page}: SearchMoviesParams) => {
  try {
    const response = await api.get<DefaultApiResponseWithPagination<MovieItem[]>>(
      '/search/movie',
      {
        params: {
          query,
          page,
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}