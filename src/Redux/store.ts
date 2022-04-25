import {configureStore} from "@reduxjs/toolkit"
import ingredientsReducer from "Redux/slices/ingredientSlice"

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
