import { DefaultApiResponseWithPagination } from "../types/api"
import { MovieItem } from "../types/movies"
import api from "../utils/api"

export const fetchDiscoverMovies = async () => {
  try {
    const response = await api.get<DefaultApiResponseWithPagination<MovieItem[]>>('/discover/movie', {
      params: {
        include_video: true,
      }
    })
    return response
  } catch (error) {
    throw error
  }
}