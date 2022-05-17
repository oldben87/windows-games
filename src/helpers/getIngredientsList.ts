import {Recipe, RecipeIngredient, RecipeListItem} from "FirebaseApi/database"

export const getIngredientsList = (
  recipes: Array<Recipe>,
  recipeList: Array<RecipeListItem>,
) => {
  const ingredientsHash: Record<string, RecipeIngredient> = {}

  recipeList.forEach(({recipeId}) => {
    const recipe = recipes.find((rec) => rec.id === recipeId)
    if (!recipe) {
      return
    }

    recipe.ingredients.forEach((ing) => {
      const hashKey = ing.variant ? `${ing.id}---${ing.variant}` : ing.id
      const current = ingredientsHash[hashKey]
      if (!current) {
        ingredientsHash[hashKey] = ing
      } else {
        ingredientsHash[hashKey] = {
          ...current,
          quantity: current.quantity + ing.quantity,
        }
      }
    })
  })

  return Object.values(ingredientsHash)
}
