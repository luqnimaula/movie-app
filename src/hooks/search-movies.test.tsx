import { renderHook, waitFor } from "@testing-library/react";
import { fetchSearchMovies } from "src/services/movies";
import { MovieItem } from "src/types/movies";
import { act } from "react-dom/test-utils";
import { useSearchMovies } from "./search-movies";

jest.mock('src/services/movies')

const mockedFetchSearchMovies = fetchSearchMovies as jest.Mock
const expectedQuery = 'lorem ipsum dolor sit amet'
const mockedResolvedData: {
  data: { results: MovieItem[], total_results: number }
} = {
  data: {
    total_results: 2,
    results: [
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
    ]
  }
}

describe('Testing custom hook: useSearchMovies', () => {
  beforeEach(() => {
    mockedFetchSearchMovies.mockResolvedValueOnce(mockedResolvedData)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should retrieve correct states and datas', async () => {
    const { result, rerender } = renderHook(() => useSearchMovies({ query: expectedQuery }))

    // function needs to be called with arguments
    expect(fetchSearchMovies).toHaveBeenCalledWith({
      page: 1,
      query: expectedQuery
    })

    // should return correct states when loading
    expect(result.current).toEqual({
      total: 0,
      page: 1,
      isLoading: true,
      movies: [],
      onLoadMore: expect.any(Function)
    } as typeof result.current)

    // rerender to make state updates
    await act(async () => await rerender())

    // should return expected states when fetchSearchMovies has been resolved
    expect(result.current).toEqual({
      total: mockedResolvedData.data.total_results,
      page: 1,
      isLoading: false,
      movies: mockedResolvedData.data.results,
      onLoadMore: expect.any(Function)
    } as typeof result.current)
  })

  it('should increment page number state when onLoadMore has been trigerred', async () => {
    const { result } = renderHook(() => useSearchMovies({ query: expectedQuery }))

    // should return correct page state
    expect(result.current.page).toEqual(1)
    
    // trigger onLoadMore
    await act(async () => await result.current.onLoadMore())

    // should increment correct page state
    expect(result.current.page).toEqual(2)
  })
})