import {Flex, IconButton, Icon} from "@chakra-ui/react"
import {currentUser} from "FirebaseApi/auth"
import Section from "components/common/Section"
import {GrAdd} from "react-icons/gr"
import AuthedPage from "components/AuthedPage"
import {Link, useNavigate} from "react-router-dom"
import {useTypedSelector} from "hooks/typedSelector"
import {ActionRow} from "components/common/ActionRow"
import {deleteRecipeForUser} from "FirebaseApi/database"
import {useState} from "react"
import {deleteRecipe} from "Redux/slices/recipeSlice"
import {useDispatch} from "react-redux"

export default function HiddenHome() {
  const user = currentUser()
  const [loading, setLoading] = useState<string | null>(null)

  const recipes = useTypedSelector((state) => state.recipes.recipes)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDeletePress = async (id: string) => {
    setLoading(id)

    try {
      if (!user) {
        return
      }

      deleteRecipeForUser(user.uid, id).then((result) => {
        if (result.success) {
          dispatch(deleteRecipe(id))
        }
      })

      setLoading(null)
    } catch (error) {
      setLoading(null)
    }
  }

  return (
    <AuthedPage user={user}>
      <Section pt={[0, 0, 0]}>
        <Flex alignItems={"center"}>
          Recipes:
          <Link to={"/hidden/recipe"}>
            <IconButton
              variant={"ghost"}
              aria-label="Add new recipe"
              icon={<Icon as={GrAdd} />}
              ml={2}
            >
              New Recipes
            </IconButton>
          </Link>
        </Flex>
        <Flex direction={"column"}>
          {recipes.map((recipe) => {
            return (
              <ActionRow
                key={recipe.id}
                item={recipe}
                onClick={() => {
                  navigate(`/hidden/recipe/${recipe.id}`)
                }}
                onTrashClick={async () => {
                  await handleDeletePress(recipe.id)
                }}
                trashLoading={loading === recipe.id}
              />
            )
          })}
        </Flex>
      </Section>
    </AuthedPage>
  )
}
