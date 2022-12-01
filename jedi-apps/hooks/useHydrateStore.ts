import {User} from "firebase/auth"
import {
  getIngredientsByUser,
  getRecipeByUser,
  getRecipeListByUser,
  Ingredient,
  Recipe,
  RecipeListItem,
} from "../FirebaseApi/database"
import {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {addIngredients} from "../Redux/slices/ingredientSlice"
import {addLastRecipeList} from "../Redux/slices/recipeListSlice"
import {addRecipes} from "../Redux/slices/recipeSlice"
import {useTypedSelector} from "./typedSelector"

export const useHydrateStore = (user: User | null) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const state = useTypedSelector((state) => state)

  const dispatch = useDispatch()

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        setLoading(true)

        if (!user) {
          setLoading(false)
          setError("No user found")
          return
        }
        let resIngredients: Array<Ingredient> | undefined
        if (!state.ingredients.hasLoaded) {
          resIngredients = await getIngredientsByUser(user.uid)
        }

        let resRecipes: Array<Recipe> | undefined
        if (!state.recipes.hasLoaded) {
          resRecipes = await getRecipeByUser(user.uid)
        }

        let resRecipeList: Array<RecipeListItem> | undefined
        if (!state.recipeList.hasLoaded) {
          resRecipeList = await getRecipeListByUser(user.uid)
        }

        const ingredients = resIngredients
          ? resIngredients
          : state.ingredients.ingredients
          ? state.ingredients.ingredients
          : undefined

        const recipes = resRecipes
          ? resRecipes
          : state.recipes.recipes
          ? state.recipes.recipes
          : undefined

        const recipeList = resRecipeList
          ? resRecipeList
          : state.recipeList.lastRecipeList.length > 0
          ? state.recipeList.lastRecipeList
          : undefined

        return {ingredients, recipes, recipeList}
      } catch {
        setLoading(false)
      }
    }

    loadIngredients().then((result) => {
      dispatch(addIngredients(result?.ingredients ? result.ingredients : []))
      dispatch(addRecipes(result?.recipes ? result.recipes : []))
      dispatch(addLastRecipeList(result?.recipeList ? result.recipeList : []))

      setLoading(false)
    })

    return () => setError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {loading, error}
}
