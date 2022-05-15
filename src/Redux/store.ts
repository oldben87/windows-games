import {configureStore} from "@reduxjs/toolkit"
import ingredientsReducer from "Redux/slices/ingredientSlice"
import recipeReducer from "Redux/slices/recipeSlice"
import recipeListReducer from "./slices/recipeListSlice"

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    recipes: recipeReducer,
    recipeList: recipeListReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
