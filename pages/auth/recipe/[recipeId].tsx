import AuthedPage from "../../../Components/Layout/AuthedPage"
import Section from "../../../Components/Common/Section"
import {currentUser} from "../../../FirebaseApi/auth"
import {updateRecipeForUser} from "../../../FirebaseApi/database"
import {updateRecipe} from "../../../Redux/slices/recipeSlice"
import {useDispatch} from "react-redux"
import {EditRecipe} from "../../../Components/Common/EditRecipe"
import {useState} from "react"
import {useTypedSelector} from "../../../hooks/typedSelector"
import {useRouter} from "next/router"

export default function HiddenRecipesEdit() {
  const [loading, setLoading] = useState(false)
  const user = currentUser()
  const router = useRouter()
  const dispatch = useDispatch()
  const recipes = useTypedSelector((state) => state.recipes.recipes)

  const {recipeId} = router.query

  if (!recipeId) {
    return router.push("/auth")
  }

  const recipe = recipes.find((rec) => rec.id === recipeId)

  if (!recipe) {
    return router.push("/auth")
  }

  return (
    <AuthedPage>
      <Section pt={[0, 0, 0]}>
        <EditRecipe
          title="Edit Recipe"
          loading={loading}
          recipe={recipe}
          onSubmit={async (editedRecipe) => {
            if (!user) {
              return
            }

            if (!editedRecipe) {
              return
            }
            setLoading(true)

            const recipeToSubmit = {...editedRecipe, id: recipe.id}

            const newRecipe = await updateRecipeForUser(
              user.uid,
              recipeToSubmit,
            )
            if (newRecipe.id === null) {
              setLoading(false)
              return
            }

            dispatch(updateRecipe(recipeToSubmit))
            setLoading(false)
            router.push("/auth")
          }}
        />
      </Section>
    </AuthedPage>
  )
}
