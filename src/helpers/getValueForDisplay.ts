export const getValueForDisplay = (value: number) => {
  switch (value) {
    case 1:
      return 'A'
    case 11:
      return 'J'
    case 12:
      return 'Q'
    case 13:
      return 'K'
    default:
      return value.toString()
  }
}
