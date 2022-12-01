import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Ingredient} from "../../FirebaseApi/database"
import {adjust, remove} from "ramda"

interface IngredientState {
  ingredients: Array<Ingredient>
  hasLoaded: boolean
}

const initialState: IngredientState = {
  ingredients: [],
  hasLoaded: false,
}

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      state = {...state, ingredients: [...state.ingredients, action.payload]}
    },
    addIngredients: (state, action: PayloadAction<Array<Ingredient>>) => {
      state.ingredients = action.payload
      state.hasLoaded = true
    },
    updateIngredient: (state, action: PayloadAction<Ingredient>) => {
      const index = state.ingredients.findIndex(
        (ing) => ing.id === action.payload.id,
      )
      state = {
        ...state,
        ingredients: adjust(index, () => action.payload, state.ingredients),
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (ing) => ing.id === action.payload,
      )
      state = {
        ...state,
        ingredients: remove(index, 1, state.ingredients),
      }
    },
    clearIngredients: () => {
      return initialState
    },
  },
})

export const {
  addIngredient,
  addIngredients,
  updateIngredient,
  deleteIngredient,
  clearIngredients,
} = ingredientsSlice.actions

export default ingredientsSlice.reducer
