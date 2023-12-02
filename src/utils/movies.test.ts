import { getMovieGenresTitle } from "./movies"

const mockedIds: number[] = [1,2,3]
const mockedIndexedGenres: Record<number, string> = {
  1: 'Action',
  2: 'Science Fiction',
  3: 'Adventure'
}
const expectedValue = 'Action, Science Fiction, Adventure'

describe('Testing movies utils', () => {
  it('test getMovieGenresTitle function', () => {
    const value = getMovieGenresTitle(mockedIds, mockedIndexedGenres)
    expect(value).toEqual(expectedValue)
  })

  it('test getMovieGenresTitle function (if the given arguments are empty)', () => {
    const value = getMovieGenresTitle([], {})
    expect(value).toEqual('')
  })
})