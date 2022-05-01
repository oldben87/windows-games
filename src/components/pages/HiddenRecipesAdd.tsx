import AuthedPage from "components/AuthedPage"
import Section from "components/common/Section"
import {currentUser} from "FirebaseApi/auth"
import {Recipe, saveRecipe} from "FirebaseApi/database"
import {addRecipe} from "Redux/slices/recipeSlice"
import {useDispatch} from "react-redux"
import {EditRecipe} from "components/common/EditRecipe"
import {useNavigate} from "react-router-dom"
import {useState} from "react"

type NewRecipe = Omit<Recipe, "id">

const initialState: NewRecipe = {
  name: "",
  description: "",
  ingredients: [],
  serves: 0,
  cookingInstructions: [],
}

export default function HiddenRecipesAdd() {
  const [loading, setLoading] = useState(false)
  const user = currentUser()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <AuthedPage user={user}>
      <Section pt={[0, 0, 0]}>
        <EditRecipe
          loading={loading}
          recipe={initialState}
          onSubmit={async (editedRecipe) => {
            if (!user) {
              return
            }
            setLoading(true)

            const newRecipe = await saveRecipe(user.uid, editedRecipe)
            if (newRecipe.id === null) {
              setLoading(false)
              return
            }

            const recipe = {...editedRecipe, id: newRecipe.id}

            dispatch(addRecipe(recipe))
            setLoading(false)
            navigate("/hidden")
          }}
        />
      </Section>
    </AuthedPage>
  )
}
