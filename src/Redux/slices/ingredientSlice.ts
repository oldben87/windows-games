import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Ingredient} from "FirebaseApi/database"

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
  },
})

export const {addIngredient, addIngredients} = ingredientsSlice.actions

export default ingredientsSlice.reducer
