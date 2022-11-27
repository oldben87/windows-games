import differenceInSeconds from 'date-fns/differenceInSeconds'

const convertNumberToString = (num: number): string => {
  return num <= 9 ? `0${num}` : `${num}`
}

export function getTimeTaken(gameStarted: Date, now: Date): string {
  const gameLengthInSeconds = differenceInSeconds(now, gameStarted)

  const hours = Math.floor(gameLengthInSeconds / 60 / 60)

  const hoursToDeduct = hours * 60 * 60

  const minutes = Math.floor((gameLengthInSeconds - hoursToDeduct) / 60)

  const minutesToDeduct = minutes * 60

  const seconds = Math.floor(
    gameLengthInSeconds - minutesToDeduct - hoursToDeduct,
  )

  return `${convertNumberToString(hours)}:${convertNumberToString(
    minutes,
  )}:${convertNumberToString(seconds)}`
}
