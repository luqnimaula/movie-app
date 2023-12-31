import { useCallback, useEffect, useMemo, useState } from "react"
import { MovieGenreItem } from "src/types/movies"
import { fetchMovieGenres } from "src/services/movies"

export const useGenreMovies = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [genres, setGenres] = useState<MovieGenreItem[]>([])
  
  // this variable for access the genre title to reduce time and space complexity O(n)
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
        // handle error goes here
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    // call the api only when it's been mounted
    if (!isMounted) {
      setIsMounted(true)
      return
    }
    getMovieGenres()
  }, [isMounted])

  return {
    isLoading,
    genres,
    indexedMovieGenres
  }
}