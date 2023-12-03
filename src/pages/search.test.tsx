import { useGenreMovies } from "src/hooks/genre-movies"
import { useSearchMovies } from "src/hooks/search-movies"
import Search from "./search"
import { act, render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, RouteObject, RouterProvider, Routes, createMemoryRouter } from "react-router-dom"

jest.mock('src/hooks/genre-movies')
jest.mock('src/hooks/search-movies')

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

const mockedReturnValueSearchMovies: ReturnType<typeof useSearchMovies> = {
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
  onLoadMore: jest.fn()
}

const routes: RouteObject[] = [
  {
    path: "/search",
    element: <Search />
  },
  {
    path: '/',
    element: <div data-testid='home-route'/>
  }
]

const mockedGenreMovies = useGenreMovies as jest.Mock
const mockedSearchMovies = useSearchMovies as jest.Mock
const expectedQuery = 'someQueries'

const renderWithRouter = (router: ReturnType<typeof createMemoryRouter>) => (
  <RouterProvider router={router} />
)

describe('Testing search page', () => {
  beforeEach(() => {
    mockedGenreMovies.mockReturnValue(mockedReturnValueGenreMovies)
  })

  it('should render <Search/> page properly', async () => {
    mockedSearchMovies.mockReturnValue(mockedReturnValueSearchMovies)

    const router = createMemoryRouter(routes, {
      initialEntries: [`/search?query=${expectedQuery}`]
    })

    const { rerender } = render(renderWithRouter(router))

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => rerender(renderWithRouter(router)))

    // search page wrapper needs to be exist
    expect(screen.getByTestId('search-page')).toBeInTheDocument()

    // page title needs to be exist
    expect(screen.getByTestId('search-page-title')).toBeInTheDocument()

    // search box needs to be exist
    expect(screen.getByTestId('form-search-box')).toBeInTheDocument()

    await waitFor(async () => {
      // needs to render movie cards
      await expect(screen.getAllByTestId('movie-card')).toHaveLength(2)
    })
  })

  it('should render loading state page properly', async () => {
    mockedSearchMovies.mockReturnValue({
      ...mockedReturnValueSearchMovies,
      isLoading: true,
      movies: [],
      total: 0
    } as typeof mockedReturnValueSearchMovies)

    const router = createMemoryRouter(routes, {
      initialEntries: [`/search?query=${expectedQuery}`]
    })

    const { rerender } = render(renderWithRouter(router))

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => rerender(renderWithRouter(router)))

    await waitFor(async () => {
      // needs to show loader state
      await expect(screen.getByTestId('search-page-loader')).toBeInTheDocument()
    })
  })

  it('should render empty state page properly', async () => {
    mockedSearchMovies.mockReturnValue({
      ...mockedReturnValueSearchMovies,
      isLoading: false,
      movies: [],
      total: 0
    } as typeof mockedReturnValueSearchMovies)

    const router = createMemoryRouter(routes, {
      initialEntries: [`/search?query=${expectedQuery}`]
    })

    const { rerender } = render(renderWithRouter(router))

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => rerender(renderWithRouter(router)))

    await waitFor(async () => {
      // needs to show loader state
      await expect(screen.getByTestId('search-page-empty')).toBeInTheDocument()
    })
  })

  it('should redirect to "/" when query is empty', async () => {
    mockedSearchMovies.mockReturnValue({
      ...mockedReturnValueSearchMovies,
      isLoading: false,
      movies: [],
      total: 0
    } as typeof mockedReturnValueSearchMovies)

    const router = createMemoryRouter(routes, {
      initialEntries: ['/search']
    })

    const { rerender } = render(renderWithRouter(router))

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => rerender(renderWithRouter(router)))

    await waitFor(async () => {
      // needs to redirect into "/"
      await expect(screen.getByTestId('home-route')).toBeInTheDocument()
    })
  })
})