export const getRandomNumber = (
  mineList: Array<number>,
  numberOfSquares: number,
): number => {
  const rdmNum = Math.floor(Math.random() * numberOfSquares) + 1
  if (rdmNum === mineList.find((square) => square === rdmNum)) {
    return getRandomNumber(mineList, numberOfSquares)
  }

  return rdmNum
}
