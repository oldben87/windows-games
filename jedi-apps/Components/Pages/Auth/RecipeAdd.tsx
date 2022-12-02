import AuthedPage from "../../Layout/AuthedPage"
import Section from "../../Common/Section"
import {currentUser} from "../../../FirebaseApi/auth"
import {Recipe, saveRecipe} from "../../../FirebaseApi/database"
import {addRecipe} from "../../../Redux/slices/recipeSlice"
import {useDispatch} from "react-redux"
import {EditRecipe} from "../../Common/EditRecipe"
import {useState} from "react"
import {useRouter} from "next/router"

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
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <AuthedPage>
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
            router.push("/auth")
          }}
        />
      </Section>
    </AuthedPage>
  )
}
