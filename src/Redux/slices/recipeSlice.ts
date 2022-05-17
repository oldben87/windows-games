import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Recipe} from "FirebaseApi/database"
import {adjust, remove} from "ramda"

interface RecipeState {
  recipes: Array<Recipe>
  hasLoaded: boolean
}

const initialState: RecipeState = {recipes: [], hasLoaded: false}

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      return {...state, recipes: [...state.recipes, action.payload]}
    },
    addRecipes: (_, action: PayloadAction<Array<Recipe>>) => {
      return {
        hasLoaded: true,
        recipes: action.payload,
      }
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.recipes.findIndex(
        (ing) => ing.id === action.payload.id,
      )
      return {
        ...state,
        recipes: adjust(index, () => action.payload, state.recipes),
      }
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      const index = state.recipes.findIndex((ing) => ing.id === action.payload)
      return {
        ...state,
        recipes: remove(index, 1, state.recipes),
      }
    },
    clearRecipes: () => {
      return initialState
    },
  },
})

export const {addRecipe, addRecipes, updateRecipe, deleteRecipe, clearRecipes} =
  recipesSlice.actions

export default recipesSlice.reducer
