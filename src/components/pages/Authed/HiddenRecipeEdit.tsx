import AuthedPage from "components/AuthedPage"
import Section from "components/common/Section"
import {currentUser} from "FirebaseApi/auth"
import {updateRecipeForUser} from "FirebaseApi/database"
import {updateRecipe} from "Redux/slices/recipeSlice"
import {useDispatch} from "react-redux"
import {EditRecipe} from "components/common/EditRecipe"
import {Navigate, useNavigate, useParams} from "react-router-dom"
import {useState} from "react"
import {useTypedSelector} from "hooks/typedSelector"

export default function HiddenRecipesEdit() {
  const [loading, setLoading] = useState(false)
  const user = currentUser()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  if (!params?.recipeId) {
    return <Navigate to="/auth" />
  }

  const recipes = useTypedSelector((state) => state.recipes.recipes)
  const recipe = recipes.find((rec) => rec.id === params.recipeId)

  if (!recipe) {
    return <Navigate to="/auth" />
  }

  return (
    <AuthedPage user={user}>
      <Section pt={[0, 0, 0]}>
        <EditRecipe
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
            navigate("/auth")
          }}
        />
      </Section>
    </AuthedPage>
  )
}
