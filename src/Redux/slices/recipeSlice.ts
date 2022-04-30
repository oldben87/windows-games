import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Recipe} from "FirebaseApi/database"

interface RecipeState {
  recipes: Array<Recipe>
  hasLoaded: boolean
}

const initialState: RecipeState = {recipes: [], hasLoaded: false}

export const ingredientsSlice = createSlice({
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
  },
})

export const {addRecipe, addRecipes} = ingredientsSlice.actions

export default ingredientsSlice.reducer
