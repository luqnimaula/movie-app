import { fireEvent, render, screen } from '@testing-library/react';
import GenreItem from './GenreItem';

const mockedProps: {
  name: string
  value: number
  isActive: boolean
  onSelect: (id: number) => void
} = {
  name: 'Genre Title',
  value: 7,
  isActive: false,
  onSelect: jest.fn()
}

describe('Testing <GenreItem/>', () => {
  it('should render component properly', () => {
    render(<GenreItem {...mockedProps} />)
    const el = screen.getByTestId('genre-item')
    expect(el).toBeInTheDocument()
  })

  it('should call onSelect & handle it properly when user click the component', () => {
    const mockedOnSelect = jest.fn()
    render(<GenreItem {...mockedProps} onSelect={mockedOnSelect} />)
    const el = screen.getByTestId('genre-item')
    expect(el).toBeInTheDocument()
    fireEvent.click(el)
    expect(mockedOnSelect).toHaveBeenCalledWith(mockedProps.value)
  })

  it('should render component properly when isActive = true', () => {
    render(<GenreItem {...mockedProps} isActive />)
    const el = screen.getByTestId('genre-item')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('active')
  })
})
