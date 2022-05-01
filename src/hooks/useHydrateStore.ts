import {User} from "firebase/auth"
import {
  getIngredientsByUser,
  getRecipeByUser,
  Ingredient,
  Recipe,
} from "FirebaseApi/database"
import {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {addIngredients} from "Redux/slices/ingredientSlice"
import {addRecipes} from "Redux/slices/recipeSlice"
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

        return {ingredients, recipes}
      } catch {
        setLoading(false)
      }
    }

    loadIngredients().then((result) => {
      dispatch(addIngredients(result?.ingredients ? result.ingredients : []))
      dispatch(addRecipes(result?.recipes ? result.recipes : []))

      setLoading(false)
    })

    return () => setError(null)
  }, [])

  return {loading, error}
}
