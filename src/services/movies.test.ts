import api from "src/utils/api"
import { fetchDiscoverMovies, fetchMovieGenres, fetchSearchMovies } from "./movies"
import { DiscoverMoviesParams, SearchMoviesParams } from "src/types/movies"

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    },
  }))
}))

const mockedApi = api as jest.Mocked<typeof api>
const mockedResolvedData = { data: 'mocked-data' }
const mockedRejectedData = { message: 'something error' }

describe('Testing movies API service functions', () => {
  it('fetchMovieGenres: should run properly when request success', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockedResolvedData })

    const { data } = await fetchMovieGenres()

    expect(data).toEqual(mockedResolvedData)
    expect(mockedApi.get).toHaveBeenCalledWith('/genre/movie/list')
  })

  it('fetchMovieGenres: should throw an error when request failed', async () => {
    mockedApi.get.mockRejectedValueOnce(mockedRejectedData)

    let errorThrown: unknown
    try {
      await fetchMovieGenres()
    } catch (error) {
      errorThrown = error
    }

    expect(errorThrown).toEqual(mockedRejectedData)
    expect(mockedApi.get).toHaveBeenCalledWith('/genre/movie/list')
  })

  it('fetchDiscoverMovies: should run properly when request success', async () => {
    const givenParams: DiscoverMoviesParams = { page: 10, genreId: 20 }
    mockedApi.get.mockResolvedValueOnce({ data: mockedResolvedData })

    const { data } = await fetchDiscoverMovies(givenParams)

    expect(data).toEqual(mockedResolvedData)
    expect(mockedApi.get).toHaveBeenCalledWith('/discover/movie', {
      params: {
        page: givenParams.page,
        with_genres: givenParams.genreId
      }
    })
  })

  it('fetchDiscoverMovies: should run properly when request success (without genreId)', async () => {
    const givenParams: DiscoverMoviesParams = { page: 10, genreId: 0 }
    mockedApi.get.mockResolvedValueOnce({ data: mockedResolvedData })

    const { data } = await fetchDiscoverMovies(givenParams)

    expect(data).toEqual(mockedResolvedData)
    expect(mockedApi.get).toHaveBeenCalledWith('/discover/movie', {
      params: { page: givenParams.page }
    })
  })

  it('fetchDiscoverMovies: should throw an error when request failed', async () => {
    const givenParams: DiscoverMoviesParams = { page: 10, genreId: 20 }
    mockedApi.get.mockRejectedValueOnce(mockedRejectedData)

    let errorThrown: unknown
    try {
      await fetchDiscoverMovies(givenParams)
    } catch (error) {
      errorThrown = error
    }

    expect(errorThrown).toEqual(mockedRejectedData)
    expect(mockedApi.get).toHaveBeenCalledWith('/discover/movie', {
      params: {
        page: givenParams.page,
        with_genres: givenParams.genreId
      }
    })
  })

  it('fetchSearchMovies: should run properly when request success', async () => {
    const givenParams: SearchMoviesParams = { query: 'lorem ipsum', page: 10 }
    mockedApi.get.mockResolvedValueOnce({ data: mockedResolvedData })

    const { data } = await fetchSearchMovies(givenParams)

    expect(data).toEqual(mockedResolvedData)
    expect(mockedApi.get).toHaveBeenCalledWith('/search/movie', {
      params: {
        query: givenParams.query,
        page: givenParams.page
      }
    })
  })

  it('fetchSearchMovies: should throw an error when request failed', async () => {
    const givenParams: SearchMoviesParams = { query: 'lorem ipsum', page: 10 }
    mockedApi.get.mockRejectedValueOnce(mockedRejectedData)

    let errorThrown: unknown
    try {
      await fetchSearchMovies(givenParams)
    } catch (error) {
      errorThrown = error
    }

    expect(errorThrown).toEqual(mockedRejectedData)
    expect(mockedApi.get).toHaveBeenCalledWith('/search/movie', {
      params: {
        query: givenParams.query,
        page: givenParams.page
      }
    })
  })
})