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
      className={`${isActive ? 'text-white bg-primary-darkest' : 'text-primary hover:text-white bg-primary-darkest/25 hover:bg-primary-darkest cursor-pointer'} border-2 border-primary-darkest px-4 py-1.5 text-sm rounded-lg transition-all font-semibold`}
    >
      {name}
    </div>
  )
}

export default memo(GenreItem)