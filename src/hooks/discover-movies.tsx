import { useCallback, useEffect, useState } from "react"
import { MovieItem } from "src/types/movies"
import { fetchDiscoverMovies } from "src/services/movies"

export const useDiscoverMovies = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [movies, setMovies] = useState<MovieItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [selectedGenreId, setSelectedGenreId] = useState<number>(0)

  const getMovies = useCallback(
    async () => {
      try {
        setIsLoading(true)
        const { data } = await fetchDiscoverMovies({ page, genreId: selectedGenreId })
        setMovies(current => [...current, ...data.results])
        setTotal(data.total_results)
      } catch (error) {
        // toast.error(getErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    },
    [page, selectedGenreId]
  )

  // increment the current page state value
  const onLoadMore = useCallback(() => setPage(currentPage => currentPage + 1), [])

  const changeSelectedGenreId = useCallback((id: number) => {
    setSelectedGenreId(id)
    // reset the movie's state
    setPage(1)
    setTotal(0)
    setMovies([])
  }, [])

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
    selectedGenreId,
    changeSelectedGenreId,
    onLoadMore
  }
}