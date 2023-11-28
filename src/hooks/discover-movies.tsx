import { useCallback, useState } from "react"
import { MovieItem } from "../types/movies"
import { fetchDiscoverMovies } from "../services/movies"

export const useDiscoverMovies = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [movies, setMovies] = useState<MovieItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)

  const getMovies = useCallback(
    async () => {
      try {
        setIsLoading(true)
        const { data } = await fetchDiscoverMovies(page)
        setMovies(current => [...current, ...data.results])
        setTotal(data.total_results)
      } catch (error) {
        // toast.error(getErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    },
    [page]
  )

  const onLoadMore = useCallback(() => setPage(currentPage => currentPage + 1), [])

  return {
    isLoading,
    movies,
    total,
    getMovies,
    onLoadMore
  }
}