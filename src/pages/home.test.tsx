import { act, render, screen, waitFor } from "@testing-library/react"
import Home from "./home"
import { useGenreMovies } from "src/hooks/genre-movies"
import { useDiscoverMovies } from "src/hooks/discover-movies"

jest.mock('src/hooks/genre-movies')
jest.mock('src/hooks/discover-movies')

const mockedReturnValueGenreMovies: ReturnType<typeof useGenreMovies> = {
  isLoading: false,
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Science Fiction' }
  ],
  indexedMovieGenres: {
    1: 'Action',
    2: 'Science Fiction'
  }
}

const mockedReturnValueDiscoverMovies: ReturnType<typeof useDiscoverMovies> = {
  isLoading: false,
  movies: [
    {
      adult: false,
      backdrop_path: "/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
      genre_ids: [12, 28, 878],
      id: 299536,
      original_language: "en",
      original_title: "Avengers: Infinity War",
      overview: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
      popularity: 236.896,
      poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      release_date: "2018-04-25",
      title: "Avengers: Infinity War",
      video: false,
      vote_average: 8.252,
      vote_count: 28033
    },
    {
      adult: false,
      backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
      genre_ids: [12, 878, 28],
      id: 299534,
      original_language: "en",
      original_title: "Avengers: Endgame",
      overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
      popularity: 127.387,
      poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      release_date: "2019-04-24",
      title: "Avengers: Endgame",
      video: false,
      vote_average: 8.261,
      vote_count: 24134
    }
  ],
  total: 2,
  page: 1,
  selectedGenreId: 0,
  changeSelectedGenreId: jest.fn(),
  onLoadMore: jest.fn()
}

const mockedGenreMovies = useGenreMovies as jest.Mock
const mockedDiscoverMovies = useDiscoverMovies as jest.Mock

describe('Testing home page', () => {
  beforeEach(() => {
    mockedGenreMovies.mockReturnValue(mockedReturnValueGenreMovies)
  })

  it('should render <Home/> page properly', async () => {
    mockedDiscoverMovies.mockReturnValue(mockedReturnValueDiscoverMovies)

    const { rerender } = render(<Home/>)

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => rerender(<Home/>))

    // home page wrapper needs to be exist
    expect(screen.getByTestId('home-page')).toBeInTheDocument()

    // page title needs to be exist
    expect(screen.getByTestId('home-page-title')).toBeInTheDocument()

    // genres list needs to be exist
    expect(screen.getByTestId('home-page-genres')).toBeInTheDocument()

    // search box needs to be exist
    expect(screen.getByTestId('form-search-box')).toBeInTheDocument()

    await waitFor(async () => {
      // needs to render genres
      await expect(screen.getAllByTestId('genre-item')).toHaveLength(2)

      // needs to render movie cards
      await expect(screen.getAllByTestId('movie-card')).toHaveLength(2)
    })
  })

  it('should render loading state page properly', async () => {
    mockedDiscoverMovies.mockReturnValue({
      ...mockedReturnValueDiscoverMovies,
      isLoading: true,
      movies: [],
      total: 0
    } as typeof mockedReturnValueDiscoverMovies)

    const { rerender } = render(<Home/>)

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => rerender(<Home/>))

    await waitFor(async () => {
      // needs to show loader state
      await expect(screen.getByTestId('home-loader')).toBeInTheDocument()
    })
  })

  it('should handle genre item onSelect properly when user click on it', async () => {
    const callback = jest.fn()
    mockedDiscoverMovies.mockReturnValue({
      ...mockedReturnValueDiscoverMovies,
      changeSelectedGenreId: callback
    } as typeof mockedReturnValueDiscoverMovies)

    const { rerender } = render(<Home/>)

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => rerender(<Home/>))

    await waitFor(async () => {
      const items = screen.getAllByTestId('genre-item')

      // needs to show loader state
      await expect(items).toHaveLength(2)

      // click the first item
      await items[0].click()

      expect(callback).toHaveBeenCalledWith(mockedReturnValueGenreMovies.genres[0].id)
    })
  })
})