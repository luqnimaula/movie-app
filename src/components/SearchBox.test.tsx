import { render, screen } from '@testing-library/react';
import SearchBox from './SearchBox';

test('should render form element', () => {
  render(<SearchBox />)
  const el = screen.getByTestId('form-search-box')
  expect(el).toBeInTheDocument()
})

test('should render search input element', () => {
  render(<SearchBox />)
  const el = screen.getByTestId('input-search-box')
  expect(el).toBeInTheDocument()
})

test('should render submit button element', () => {
  render(<SearchBox />)
  const el = screen.getByTestId('btn-search-submit')
  expect(el).toBeInTheDocument()
})

test('given defaultValue should be matched', () => {
  const testText = 'Lorem Ipsum'
  render(<SearchBox defaultValue={testText} />)
  const el = screen.getByTestId('input-search-box')
  expect(el).toHaveValue(testText)
})

