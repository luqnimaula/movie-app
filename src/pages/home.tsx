import { lazy, memo, useEffect, useState } from "react";
import { useDiscoverMovies } from "../hooks/discover-movies";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBox from "../components/SearchBox";

const MovieCard = lazy(() => import("../components/MovieCard"));

const App = () => {
  const [mounted, setMounted] = useState<boolean>(false)
  const { movies, total, getMovies, onLoadMore } = useDiscoverMovies()

  useEffect(() => {
    // prevent the api called twice
    if (!mounted) {
      setMounted(true)
      return
    }
    getMovies()
  }, [mounted, getMovies])

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={onLoadMore}
      hasMore={movies.length < total}
      loader={<div className='text-center mt-4 text-white'>Loading more movies...</div>}
      className='w-full min-h-screen bg-gradient-to-tr from-sky-950 via-sky-900 to-sky-800 p-10 space-y-8'
    >
      <div className="flex justify-between items-center gap-3">
        <div className="text-3xl text-white font-bold">
          Discover Movies
        </div>
        <SearchBox/>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map(movie => <MovieCard key={movie.id} data={movie}/>)}
      </div>
    </InfiniteScroll>
  );
}

export default memo(App)
