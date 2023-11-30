import { useCallback, useState } from "react"
import { MovieItem } from "src/types/movies"
import { fetchSearchMovies } from "src/services/movies"

export const useSearchMovies = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [movies, setMovies] = useState<MovieItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)

  const getMovies = useCallback(
    async (query: string) => {
      try {
        setIsLoading(true)
        const { data } = await fetchSearchMovies({query, page})
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

  // increment the current page state value
  const onLoadMore = useCallback(() => setPage(currentPage => currentPage + 1), [])

  return {
    isLoading,
    movies,
    getMovies,
    searchKeyword,
    setSearchKeyword,
    total,
    onLoadMore
  }
}