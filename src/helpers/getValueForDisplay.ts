export const getValueForDisplay = (value: number) => {
  if (value === 1) {
    return 'A'
  }

  if (value === 11) {
    return 'J'
  }

  if (value === 12) {
    return 'Q'
  }

  if (value === 13) {
    return 'K'
  }

  return value.toString()
}
