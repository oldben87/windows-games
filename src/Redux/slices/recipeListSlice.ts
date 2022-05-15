import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RecipeListItem} from "FirebaseApi/database"
import {remove} from "ramda"

interface RecipeListState {
  lastRecipeList: Array<RecipeListItem>
  currentRecipeList: Array<RecipeListItem>
  hasLoaded: boolean
}

const initialState: RecipeListState = {
  lastRecipeList: [],
  currentRecipeList: [],
  hasLoaded: false,
}

export const recipeListSlice = createSlice({
  name: "recipeList",
  initialState,
  reducers: {
    addLastRecipeList: (
      state,
      action: PayloadAction<Array<RecipeListItem>>,
    ) => {
      return {...state, lastRecipeList: action.payload}
    },
    addToCurrentRecipeList: (state, action: PayloadAction<RecipeListItem>) => {
      return {
        ...state,
        hasLoaded: true,
        currentRecipeList: [...state.currentRecipeList, action.payload],
      }
    },
    removeFromCurrentRecipeList: (state, action: PayloadAction<string>) => {
      const index = state.currentRecipeList.findIndex(
        (item) => item.recipeId === action.payload,
      )
      return {
        ...state,
        recipes: remove(index, 1, state.currentRecipeList),
      }
    },
    replaceCurrentList: (
      state,
      action: PayloadAction<Array<RecipeListItem>>,
    ) => {
      return {
        ...state,
        currentRecipeList: action.payload,
      }
    },
    saveCurrentListToLastList: (state) => {
      return {
        ...state,
        lastRecipeList: state.currentRecipeList,
        currentRecipeList: [],
      }
    },
    clearRecipeLists: () => {
      return initialState
    },
  },
})

export const {
  addLastRecipeList,
  addToCurrentRecipeList,
  saveCurrentListToLastList,
  replaceCurrentList,
  removeFromCurrentRecipeList,
  clearRecipeLists,
} = recipeListSlice.actions

export default recipeListSlice.reducer
