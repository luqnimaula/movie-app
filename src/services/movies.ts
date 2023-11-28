import { DefaultApiResponseWithPagination } from "../types/api"
import { MovieItem } from "../types/movies"
import api from "../utils/api"

export const fetchDiscoverMovies = async (page: number) => {
  try {
    const response = await api.get<DefaultApiResponseWithPagination<MovieItem[]>>(
      '/discover/movie',
      { params: { include_video: true, page } }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const fetchSearchMovies = async (query: string, page: number) => {
  try {
    const response = await api.get<DefaultApiResponseWithPagination<MovieItem[]>>(
      '/search/movie',
      { params: { include_video: true, query, page } }
    )
    return response
  } catch (error) {
    throw error
  }
}