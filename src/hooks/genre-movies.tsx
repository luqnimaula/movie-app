import { useCallback, useMemo, useState } from "react"
import { MovieGenreItem } from "../types/movies"
import { fetchMovieGenres } from "../services/movies"

export const useGenreMovies = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [genres, setGenres] = useState<MovieGenreItem[]>([])
  
  // this variable for access the genre title to reduce big O notation O(n)
  const indexedMovieGenres = useMemo(() => {
    return genres.reduce((object, genre) => {
      return {
        ...object,
        [genre.id]: genre.name
      }
    }, {} as Record<number, string>)
  }, [genres])

  const getMovieGenres = useCallback(
    async () => {
      try {
        setIsLoading(true)
        const { data } = await fetchMovieGenres()
        setGenres([
          { id: 0, name: 'All Genres' },
          ...data.genres
        ])
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
    genres,
    indexedMovieGenres,
    getMovieGenres
  }
}