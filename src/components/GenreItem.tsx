import { memo } from "react"

type Props = {
  name: string
  value: number
  isActive: boolean
  onSelect: (id: number) => void
}

const GenreItem: React.FC<Props> = ({ name, value, isActive, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(value)}
      className={`${isActive ? 'text-white bg-red-700' : 'text-red-400 hover:text-white hover:bg-red-700 cursor-pointer'} border-2 border-red-400 px-4 py-1.5 text-sm rounded-lg transition-all font-semibold`}
    >
      {name}
    </div>
  )
}

export default memo(GenreItem)