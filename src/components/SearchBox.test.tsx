import { render, screen } from '@testing-library/react';
import SearchBox from './SearchBox';

describe('Testing <SearchBox/>', () => {
  it('should render form element', () => {
    render(<SearchBox />)
    const el = screen.getByTestId('form-search-box')
    expect(el).toBeInTheDocument()
  })

  it('should render search input element', () => {
    render(<SearchBox />)
    const el = screen.getByTestId('input-search-box')
    expect(el).toBeInTheDocument()
  })

  it('should render submit button element', () => {
    render(<SearchBox />)
    const el = screen.getByTestId('btn-search-submit')
    expect(el).toBeInTheDocument()
  })

  it('given defaultValue should be matched', () => {
    const testText = 'Lorem Ipsum'
    render(<SearchBox defaultValue={testText} />)
    const el = screen.getByTestId('input-search-box')
    expect(el).toHaveValue(testText)
  })
})
