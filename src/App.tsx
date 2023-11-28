import { lazy, memo, useEffect, useState } from "react";
import { Search, X } from "react-feather";
import { useDiscoverMovies } from "./hooks/discover-movies";
const MovieCard = lazy(() => import("./components/MovieCard"));

const App = () => {
  const { movies, getMovies } = useDiscoverMovies()
  const [showSearch, setShowSearch] = useState<boolean>(false)

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-sky-950 via-sky-900 to-sky-800 p-10 space-y-8">
      <div className="flex justify-between items-center gap-3">
        <div className="text-3xl text-white font-bold">
          Discover Movies
        </div>
        {showSearch ? (
          <form className="inline-flex items-center gap-3">
            <input
              type="text"
              className="w-full rounded-full px-5 py-2 bg-transparent border-white border-2 text-white"
              placeholder="Search movie..."
            />
            <X 
              className="w-8 text-white cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
          </form>
        ) : (
          <Search 
            className="w-8 text-white cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        )}
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {movies.map(movie => <MovieCard key={movie.id} data={movie}/>)}
      </div>
      <div className="flex justify-center">
        <button 
          type="button"
          className="w-fit px-5 py-2 rounded-full border-2 border-red-500 text-red-500 font-semibold transition-all hover:bg-red-500 hover:text-white"
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default memo(App)
