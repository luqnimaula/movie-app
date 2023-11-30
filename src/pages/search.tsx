import { lazy, memo, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBox from "src/components/SearchBox";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchMovies } from "src/hooks/search-movies";
import { useGenreMovies } from "src/hooks/genre-movies";
import { getMovieGenresTitle } from "src/utils/movies";

const MovieCard = lazy(() => import("src/components/MovieCard"));

const App = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [mounted, setMounted] = useState<boolean>(false)
  const { isLoading, movies, total, getMovies, onLoadMore } = useSearchMovies()
  const { indexedMovieGenres, getMovieGenres } = useGenreMovies()
  const query = useMemo(() => new URLSearchParams(search).get('query'), [search])

  useEffect(() => {
    // call the api only when it's been mounted
    if (mounted) getMovieGenres()
  }, [mounted])

  useEffect(() => {
    // prevent the api called twice
    if (!mounted) {
      setMounted(true)
      return
    }
    if (query) getMovies(query)
  }, [mounted, getMovies, query])

  useEffect(() => {
    if (!query) navigate('/', {replace: true})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={onLoadMore}
      hasMore={movies.length < total}
      loader={<div className='text-center mt-4 text-white'>Loading more movies...</div>}
      className='w-full min-h-screen p-10 space-y-8'
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-3">
        <div className="text-white space-y-1">
          <div className="text-3xl font-bold">
            Results for "{query}"
          </div>
          <div>Found {total} search results</div>
        </div>
        <SearchBox defaultValue={query || ''}/>
      </div>
      {(isLoading && movies.length < 1) && (
        <div className="w-full grid place-items-center h-[60vh]">
          <div className="text-sm text-white">Loading...</div>
        </div>
      )}
      {(!isLoading && movies.length < 1) && (
        <div className="w-full grid place-items-center h-[60vh]">
          <div className="text-sm text-white">No any movies found</div>
        </div>
      )}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id}
            data={movie}
            genre={getMovieGenresTitle(movie.genre_ids, indexedMovieGenres)}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default memo(App)
