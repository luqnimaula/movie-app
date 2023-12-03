import { lazy, memo } from "react";
import { useDiscoverMovies } from "src/hooks/discover-movies";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBox from "src/components/SearchBox";
import { useGenreMovies } from "src/hooks/genre-movies";
import { getMovieGenresTitle } from "src/utils/movies";

const GenreItem = lazy(() => import("src/components/GenreItem"));
const MovieCard = lazy(() => import("src/components/MovieCard"));

const App = () => {
  const { genres, indexedMovieGenres } = useGenreMovies()
  const { isLoading, selectedGenreId, changeSelectedGenreId, movies, total, onLoadMore } = useDiscoverMovies()

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={onLoadMore}
      hasMore={movies.length < total}
      loader={<div className='text-center mt-4 text-white'>Loading more movies...</div>}
      className='w-full min-h-screen p-10 space-y-8'
    >
      <div 
        data-testid='home-page'
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-3"
      >
        <div
          data-testid='home-page-title'
          className="text-3xl text-white font-bold"
        >
          Discover Movies
        </div>
        <SearchBox/>
      </div>
      <div 
        data-testid='home-page-genres'
        className="inline-flex flex-wrap gap-3"
      >
        {genres.map(({ id, name }) => (
          <GenreItem
            key={id}
            name={name}
            value={id}
            isActive={selectedGenreId === id}
            onSelect={() => changeSelectedGenreId(id)}
          />
        ))}
      </div>
      {(isLoading && movies.length < 1) && (
        <div 
          data-testid='home-loader'
          className="w-full grid place-items-center h-[60vh]"
        >
          <div className="text-sm text-white">Loading...</div>
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
