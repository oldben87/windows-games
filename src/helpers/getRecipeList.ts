import {RecipeListItem} from "FirebaseApi/database"

export const getRecipeList = (list: Array<{id: string}>, maxNumber: number) => {
  const result: Array<RecipeListItem> = []

  const maxNum = maxNumber < list.length ? maxNumber : list.length
  do {
    const rdmNum = Math.random()
    const index = Math.floor(rdmNum * list.length)

    if (
      list[index] !== undefined &&
      result.every(({recipeId}) => recipeId !== list[index].id)
    ) {
      result.push({recipeId: list[index].id})
    }
  } while (result.length < maxNum)

  return result
}
