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

        if (!user || !user.uid) {
          setLoading(false)
          setError("No user found")
          return
        }

        let ingredients: Array<Ingredient> | undefined
        if (state.ingredients.hasLoaded === false) {
          ingredients = await getIngredientsByUser(user.uid)
          if (ingredients) {
            dispatch(addIngredients(ingredients))
          }
        }

        let recipes: Array<Recipe> | undefined
        if (!state.recipes.hasLoaded) {
          recipes = await getRecipeByUser(user.uid)
          if (recipes) dispatch(addRecipes(recipes))
        }

        let recipeList: Array<RecipeListItem> | undefined
        if (!state.recipeList.hasLoaded) {
          console.log(state.recipeList.hasLoaded)

          recipeList = await getRecipeListByUser(user.uid)
          if (recipeList) dispatch(addLastRecipeList(recipeList))
        }

        // const ingredients = resIngredients
        //   ? resIngredients
        //   : state.ingredients.ingredients
        //   ? state.ingredients.ingredients
        //   : undefined

        // const recipes = resRecipes
        //   ? resRecipes
        //   : state.recipes.recipes
        //   ? state.recipes.recipes
        //   : undefined

        // const recipeList = resRecipeList
        //   ? resRecipeList
        //   : state.recipeList.lastRecipeList.length > 0
        //   ? state.recipeList.lastRecipeList
        //   : undefined

        return {ingredients, recipes, recipeList}
      } catch {
        setLoading(false)
      }
    }

    loadIngredients().then(() => {
      setLoading(false)
    })

    return () => setError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {loading, error}
}
