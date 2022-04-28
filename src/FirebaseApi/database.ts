import firebase from "./index"
import {getDatabase, ref, push, get, child} from "firebase/database"

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

export type FoodUnit = "g" | "kg" | "ml" | "ltr" | "cup" | "each"

export interface Ingredient {
  id: string
  name: string
  unit: FoodUnit
  group: FoodGroup
  unitIngs?: number
  variants?: Array<string>
}

export const ingredients: Record<string, Ingredient> = {
  abc: {
    id: "abc",
    name: "Pepper",
    unit: "each",
    group: "fruit/veg",
    unitIngs: 150,
    variants: ["Green", "Red", "Yellow", "Orange"],
  },
  def: {
    id: "def",
    name: "Pasta",
    unit: "g",
    group: "cupboard",
    variants: ["Spaghetti", "Farfalle", "Penne"],
  },
  bcd: {
    id: "bcd",
    name: "Onions",
    unit: "each",
    group: "fruit/veg",
    variants: ["Red", "Brown", "Shallots"],
  },
  cde: {
    id: "cde",
    name: "Mince",
    unit: "kg",
    unitIngs: 1000,
    group: "meat/poultry",
    variants: ["Beef", "Pork", "Lamb", "Turkey"],
  },
  efg: {
    id: "efg",
    name: "Passata",
    unit: "ml",
    group: "cupboard",
  },
  fgh: {
    id: "fgh",
    name: "Oregano",
    unit: "g",
    group: "herb",
  },
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

export const recipes: Record<string, Recipe> = {
  bcd: {
    id: "",
    name: "Spag Bowl",
    ingredients: [
      {id: "abc", quantity: 1, note: "Chopped", variant: "Red"},
      {id: "def", quantity: 150, variant: "Spaghetti"},
      {id: "bcd", quantity: 1, variant: "Brown"},
      {id: "cde", quantity: 0.5, variant: "Beef"},
      {id: "efg", quantity: 400},
      {id: "fgh", quantity: 5},
    ],
    serves: 4,
    description: "Meat and pasta",
    cookingInstructions: [
      {title: "Fill pan", details: "Put in pasta and boil with water"},
    ],
  },
}
