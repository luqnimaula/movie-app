import { useCallback, useState } from "react"
import { MovieItem } from "../types/movies"
import { fetchDiscoverMovies } from "../services/movies"

export const useDiscoverMovies = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [movies, setMovies] = useState<MovieItem[]>([])

  const getMovies = useCallback(
    async () => {
      try {
        setIsLoading(true)
        const { data } = await fetchDiscoverMovies()
        setMovies(data.results)
      } catch (error) {
        // toast.error(getErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return {
    isLoading,
    movies,
    getMovies
  }
}