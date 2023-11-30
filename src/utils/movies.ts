export const getMovieGenresTitle = (ids: number[], indexedGenres: Record<number, string>): string => {
  if (ids.length > 0 && Object.values(indexedGenres).length > 0) {
    return ids.map(id => indexedGenres?.[id]).join(', ')
  }
  return ''
}