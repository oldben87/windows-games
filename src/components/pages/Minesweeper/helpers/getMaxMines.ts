import {GameVariables} from "../types"

export const getMaxMines = (variables: GameVariables) =>
  Math.floor((variables.gameYCount * variables.gameYCount) / 2)
