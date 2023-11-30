import { memo } from "react"
import { MovieItem } from "src/types/movies"
import { Star } from "react-feather"

type Props = {
  data: MovieItem
  genre?: string
}

const assetBasePath = process.env.REACT_APP_TMDB_ASSET_PATH || ''
const defaultImage = 'https://app.swagup.com/images/public/nopic.jpg'

const MovieCard: React.FC<Props> = ({ data, genre }) => {
  return (
    <div className="w-full group cursor-pointer shadow-xl relative rounded-lg overflow-hidden transition-all duration-300 scale-[.97] hover:scale-100">
      <img
        alt={`Movie Poster of ${data.original_title}`}
        loading="lazy"
        src={(data.backdrop_path || data.poster_path) ? assetBasePath + (data.backdrop_path || data.poster_path) : defaultImage}
        className="w-full aspect-[9/12] object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t transition-all duration-500 from-[#0F0F0F]/95 to-[#0F0F0F]/30 group-hover:to-[#0F0F0F]/60  flex flex-col justify-between p-5">
        <div className="w-fit inline-flex shadow-lg items-center gap-1 bg-primary-darkest/70 rounded-md px-2 py-1 text-white text-sm font-semibold">
          <Star className="w-3"/>{data.vote_average.toFixed(1)}
        </div>
        <div className="w-full space-y-2">
          <h2 className="text-white text-lg font-semibold leading-6">{data.original_title}</h2>
          <div className="inline-flex gap-4">
            {data.release_date && (
              <div className="text-sm text-white">
                {(new Date(data.release_date)).getFullYear()}
              </div>
            )}
            {genre && (
              <div className="text-sm text-white">
                {genre}
              </div>
            )}
          </div>
          <p 
            title={data.overview}
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