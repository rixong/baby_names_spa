
const sorts = {
  alpha: (a, b) => a.name.localeCompare(b.name),
  revAlpha: (a, b) => b.name.localeCompare(a.name),
  createdAt: (a, b) => b.created_at.localeCompare(a.created_at),
  revCreatedAt: (a, b) => a.created_at.localeCompare(b.created_at),
  shortest: (a, b) => a.name.length - b.name.length,
  longest: (a, b) => b.name.length - a.name.length
}

export const sortNames = (names, sortType = 'alpha') => {
  const sortedNames = names.slice().sort(sorts[sortType])
  return sortedNames
}

