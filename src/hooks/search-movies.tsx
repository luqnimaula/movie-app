import { useCallback, useEffect, useState } from "react"
import { MovieItem } from "src/types/movies"
import { fetchSearchMovies } from "src/services/movies"

type SearchMovieArguments = {
  query: string
}

export const useSearchMovies = ({ query }: SearchMovieArguments) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [movies, setMovies] = useState<MovieItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)

  const getMovies = useCallback(
    async () => {
      try {
        setIsLoading(true)
        const { data } = await fetchSearchMovies({query, page})
        setMovies(current => [...current, ...data.results])
        setTotal(data.total_results)
      } catch (error) {
        // handle error goes here
      } finally {
        setIsLoading(false)
      }
    },
    [page, query]
  )

  // increment the current page state value
  const onLoadMore = useCallback(() => setPage(currentPage => currentPage + 1), [])

  useEffect(() => {
    // prevent the api called twice
    if (!isMounted) {
      setIsMounted(true)
      return
    }
    getMovies()
  }, [isMounted, getMovies])

  return {
    isLoading,
    movies,
    total,
    page,
    onLoadMore
  }
}