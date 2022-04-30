import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Ingredient} from "FirebaseApi/database"
import {adjust} from "ramda"

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
      return {...state, ingredients: [...state.ingredients, action.payload]}
    },
    addIngredients: (_, action: PayloadAction<Array<Ingredient>>) => {
      return {
        ingredients: action.payload,
        hasLoaded: true,
      }
    },
    updateIngredient: (state, action: PayloadAction<Ingredient>) => {
      const index = state.ingredients.findIndex(
        (ing) => ing.id === action.payload.id,
      )
      return {
        ...state,
        ingredients: adjust(index, () => action.payload, state.ingredients),
      }
    },
  },
})

export const {addIngredient, addIngredients, updateIngredient} =
  ingredientsSlice.actions

export default ingredientsSlice.reducer
