import { memo, useMemo } from "react"
import { MovieItem } from "src/types/movies"
import { Star } from "react-feather"

type Props = {
  data: MovieItem
  genre?: string
}

const assetBasePath = process.env.REACT_APP_TMDB_ASSET_PATH
const defaultImage = process.env.REACT_APP_TMDB_DEFAULT_POSTER_URL

const MovieCard: React.FC<Props> = ({ data, genre }) => {
  const posterImage = useMemo<string>(() => {
    // needs to render backdrop_path first if exist
    if (data.backdrop_path) return assetBasePath + data.backdrop_path

    // or needs to render poster_path if exist
    if (data.poster_path) return assetBasePath + data.poster_path

    // use default image if backdrop_path & poster_path not exist
    return defaultImage as string
  }, [data])

  return (
    <div 
      data-testid='movie-card'
      className="w-full group cursor-pointer shadow-xl relative rounded-lg overflow-hidden transition-all duration-300 scale-[.97] hover:scale-100"
    >
      <img
        alt={`Movie Poster of ${data.original_title}`}
        loading="lazy"
        data-testid='movie-card-poster'
        src={posterImage}
        className="w-full aspect-[9/12] object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t transition-all duration-500 from-[#0F0F0F]/95 to-[#0F0F0F]/30 group-hover:to-[#0F0F0F]/60  flex flex-col justify-between p-5">
        <div className="w-fit inline-flex shadow-lg items-center gap-1 bg-primary-darkest/70 rounded-md px-2 py-1 text-white text-sm font-semibold">
          <Star className="w-3"/>
          <span data-testid='movie-card-rating'>{data.vote_average.toFixed(1)}</span>
        </div>
        <div className="w-full space-y-2">
          <h2 
            className="text-white text-lg font-semibold leading-6"
            data-testid='movie-card-title'
          >
            {data.original_title}
          </h2>
          <div className="inline-flex gap-4">
            {data.release_date && (
              <div 
                data-testid='movie-card-year'
                className="text-sm text-white"
              >
                {(new Date(data.release_date)).getFullYear()}
              </div>
            )}
            {genre && (
              <div
                data-testid='movie-card-genre'
                className="text-sm text-white"
              >
                {genre}
              </div>
            )}
          </div>
          <p 
            title={data.overview}
            data-testid='movie-card-overiew'
            className="text-white mt-2 text-xs transition-all ease-in-out duration-300 w-full max-h-0 group-hover:max-h-16 overflow-hidden line-clamp-4"
          >
            {data.overview}
          </p>
        </div>
      </div>
    </div>
  )
}

export default memo(MovieCard)