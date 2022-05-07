import firebase from "./index"
import {
  getDatabase,
  ref,
  push,
  get,
  child,
  set,
  remove,
} from "firebase/database"

export const DB = getDatabase(firebase)

export const saveIngredient = async (
  userId: string,
  ingredient: Omit<Ingredient, "id">,
) => {
  return push(ref(DB, `ingredients/${userId}`), ingredient).then((result) => {
    return {...result, id: result.key}
  })
}

export const getIngredientsByUser = async (userId: string) => {
  return await get(child(ref(DB), `ingredients/${userId}`)).then((snapShot) => {
    if (snapShot.exists()) {
      return Object.entries(snapShot.val()).map(([id, ingredient]) => {
        return {...(ingredient as Omit<Ingredient, "id">), id}
      })
    }
  })
}

export const updateIngredientForUser = async (
  userId: string,
  ingredient: Ingredient,
) => {
  return await set(
    ref(DB, `ingredients/${userId}/${ingredient.id}`),
    ingredient,
  ).then(() => ingredient)
}

export const deleteIngredientForUser = async (
  userId: string,
  ingredientId: string,
) => {
  return await remove(ref(DB, `ingredients/${userId}/${ingredientId}`)).then(
    () => ({
      success: true,
    }),
  )
}

export const saveRecipe = async (
  userId: string,
  recipe: Omit<Recipe, "id">,
) => {
  return push(ref(DB, `recipes/${userId}`), recipe).then((result) => {
    return {...result, id: result.key}
  })
}

export const getRecipeByUser = async (userId: string) => {
  return await get(child(ref(DB), `recipes/${userId}`)).then((snapShot) => {
    if (snapShot.exists()) {
      return Object.entries(snapShot.val()).map(([id, recipe]) => {
        return {...(recipe as Omit<Recipe, "id">), id}
      })
    }
  })
}

export const updateRecipeForUser = async (userId: string, recipe: Recipe) => {
  return await set(ref(DB, `recipes/${userId}/${recipe.id}`), recipe).then(
    () => recipe,
  )
}

export const deleteRecipeForUser = async (userId: string, recipeId: string) => {
  return await remove(ref(DB, `recipes/${userId}/${recipeId}`)).then(() => ({
    success: true,
  }))
}

export type FoodGroup =
  | "fruit/veg"
  | "meat/poultry"
  | "seafood/fish"
  | "dairy"
  | "herb"
  | "spice"
  | "seasoning"
  | "tin/jar"
  | "sauce"
  | "cupboard"

export type FoodUnit =
  | "g"
  | "kg"
  | "ml"
  | "ltr"
  | "cup"
  | "each"
  | "tbsp"
  | "tsp"

export interface Ingredient {
  id: string
  name: string
  unit: FoodUnit
  group: FoodGroup
  unitIngs?: number
  variants?: Array<string>
}

export interface RecipeStep {
  title: string
  details?: string
}

export interface RecipeIngredient {
  id: string
  quantity: number
  note?: string
  variant?: string
}

export interface Recipe {
  id: string
  name: string
  ingredients: Array<RecipeIngredient>
  description?: string
  serves?: number
  cookingInstructions?: Array<RecipeStep>
}
