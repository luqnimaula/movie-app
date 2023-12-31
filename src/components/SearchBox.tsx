import { memo } from "react"
import { Search } from "react-feather"

type Props = {
  defaultValue?: string
}

const SearchBox: React.FC<Props> = ({ defaultValue }) => {
  return (
    <form 
      data-testid='form-search-box'
      action="/search"
      method="GET"
      className="inline-flex gap-3 items-center"
    >
      <input
        type="text"
        name="query"
        data-testid='input-search-box'
        required
        defaultValue={defaultValue || ''}
        className="w-full rounded-lg px-5 py-2 bg-transparent border-white/60 border-2 text-white"
        placeholder="Search movie..."
      />
      <button 
        data-testid='btn-search-submit'
        type="submit"
      >
        <Search className="w-8 text-white/60 cursor-pointer"/>
      </button>
    </form>
  )
}

export default memo(SearchBox)