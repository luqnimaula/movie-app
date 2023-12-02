import { renderHook } from "@testing-library/react";
import { useGenreMovies } from "./genre-movies";
import { fetchMovieGenres } from "src/services/movies";
import { MovieGenreItem } from "src/types/movies";
import { act } from "react-dom/test-utils";

jest.mock('src/services/movies')

const mockedFetchMovieGenres = fetchMovieGenres as jest.Mock
const mockedResolvedData: {
  data: { genres: MovieGenreItem[] }
} = {
  data: {
    genres: [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Science Fiction' }
    ]
  }
}

describe('Testing custom hook: useGenreMovies', () => {
  it('should retrieve correct states and datas', async () => {
    mockedFetchMovieGenres.mockResolvedValueOnce(mockedResolvedData)
    const { result, rerender } = renderHook(useGenreMovies)

    // function needs to be called
    expect(fetchMovieGenres).toHaveBeenCalled()

    // should return default initial values
    expect(result.current).toEqual({
      isLoading: true,
      genres: [],
      indexedMovieGenres: {}
    })
    
    // rerender to make state updates
    await act(async () => await rerender())

    const expectedGenres = [
      { id: 0, name: 'All Genres' },
      ...mockedResolvedData.data.genres
    ]

    // should return expected states when fetchMovieGenres has been resolved
    expect(result.current).toEqual({
      isLoading: false,
      genres: expectedGenres,
      indexedMovieGenres: expectedGenres.reduce((obj, genre) => ({
        ...obj,
        [genre.id]: genre.name
      }), {} as Record<number, string>)
    })
  })
})