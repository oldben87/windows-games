import {User} from "firebase/auth"
import {getIngredientsByUser, getRecipeByUser} from "FirebaseApi/database"
import {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {addIngredients} from "Redux/slices/ingredientSlice"
import {addRecipes} from "Redux/slices/recipeSlice"

export const useHydrateStore = (user: User | null) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

        const ingredients = await getIngredientsByUser(user.uid)
        const recipes = await getRecipeByUser(user.uid)

        return {ingredients, recipes}
      } catch {
        setLoading(false)
      }
    }

    loadIngredients().then((result) => {
      if (result?.ingredients) {
        dispatch(addIngredients(result.ingredients))
      }

      if (result?.recipes) {
        dispatch(addRecipes(result.recipes))
      }

      setLoading(false)
    })

    return () => setError(null)
  }, [])

  return {loading, error}
}
