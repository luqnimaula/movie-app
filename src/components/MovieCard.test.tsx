import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';
import { MovieItem } from 'src/types/movies';

const assetBasePath = process.env.REACT_APP_TMDB_ASSET_PATH || ''
const defaultImage = process.env.REACT_APP_TMDB_DEFAULT_POSTER_URL || ''
const mockedData: MovieItem = {
  adult: false,
  backdrop_path: 'a-backdrop-path',
  genre_ids: [],
  id: 1,
  original_language: '',
  original_title: 'Lorem Ipsum',
  overview: 'lorem ipsum dolor sit amet',
  popularity: 0,
  poster_path: 'a-poster-path',
  release_date: '2023-01-01',
  title: '',
  video: false,
  vote_average: 9.2,
  vote_count: 0
}
const genreTitleTest = 'Science Fiction'

describe('Testing <MovieCard/>', () => {
  it('should render component properly', () => {
    render(<MovieCard data={mockedData} />)
    const el = screen.getByTestId('movie-card')
    expect(el).toBeInTheDocument()
  })

  it('poster image: element needs to be exist & has matched inner content', () => {
    render(<MovieCard data={mockedData} />)
    const el = screen.getByTestId('movie-card-poster')
    expect(el).toBeInTheDocument()
    expect(el).toHaveAttribute('src', assetBasePath + mockedData.backdrop_path)
  })

  it('poster image: element needs to be exist & has matched inner content (use poster_path, if backdrop_path not exist)', () => {
    // first, set backdrop_path to be empty
    const copiedMockedData: MovieItem = {
      ...mockedData,
      backdrop_path: ''
    }
    render(<MovieCard data={copiedMockedData} />)
    const el = screen.getByTestId('movie-card-poster')
    expect(el).toBeInTheDocument()
    expect(el).toHaveAttribute('src', assetBasePath + copiedMockedData.poster_path)
  })

  it('poster image: element needs to be exist & has matched inner content (use poster_path & backdrop_path not exist)', () => {
    // first, set poster_path & backdrop_path to be empty
    const copiedMockedData: MovieItem = {
      ...mockedData,
      backdrop_path: '',
      poster_path: ''
    }
    render(<MovieCard data={copiedMockedData} />)
    const el = screen.getByTestId('movie-card-poster')
    expect(el).toBeInTheDocument()
    expect(el).toHaveAttribute('src', defaultImage)
  })

  it('rating info: element needs to be exist & has matched inner content', () => {
    render(<MovieCard data={mockedData} />)
    const el = screen.getByTestId('movie-card-rating')
    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent(mockedData.vote_average.toString())
  })

  it('title info: element needs to be exist & has matched inner content', () => {
    render(<MovieCard data={mockedData} />)
    const el = screen.getByTestId('movie-card-title')
    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent(mockedData.original_title)
  })

  it('year info: element needs to be exist & has matched inner content', () => {
    render(<MovieCard data={mockedData} />)
    const el = screen.getByTestId('movie-card-year')
    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent(new Date(mockedData.release_date).getFullYear().toString())
  })

  it('genre info: element needs to be exist & has matched inner content (when throw genre props)', () => {
    render(<MovieCard data={mockedData} genre={genreTitleTest} />)
    const el = screen.getByTestId('movie-card-genre')
    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent(genreTitleTest)
  })
})
