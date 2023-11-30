import { memo } from "react"
import { Search } from "react-feather"

type Props = {
  defaultValue?: string
}

const SearchBox: React.FC<Props> = ({ defaultValue }) => {
  return (
    <form 
      action="/search"
      method="GET"
      className="inline-flex gap-3 items-center"
    >
      <input
        type="text"
        name="query"
        required
        defaultValue={defaultValue || ''}
        className="w-full rounded-full px-5 py-2 bg-transparent border-white border-2 text-white"
        placeholder="Search movie..."
      />
      <button type="submit">
        <Search className="w-8 text-white cursor-pointer"/>
      </button>
    </form>
  )
}

export default memo(SearchBox)