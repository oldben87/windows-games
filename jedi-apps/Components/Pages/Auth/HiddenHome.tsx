import {
  Flex,
  IconButton,
  Icon,
  Button,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react"
import {currentUser} from "../../../FirebaseApi/auth"
import Section from "../../Common/Section"
import {GrAdd} from "react-icons/gr"
import AuthedPage from "../../Layout/AuthedPage"
import {useTypedSelector} from "../../../hooks/typedSelector"
import {ActionRow} from "../../Common/ActionRow"
import {deleteRecipeForUser} from "../../../FirebaseApi/database"
import {useState} from "react"
import {deleteRecipe} from "../../../Redux/slices/recipeSlice"
import {useDispatch} from "react-redux"
import TextBox from "../../Common/TextBox"
import {Modal} from "../../Common/Modals"
import {NewListModal} from "../../Common/Modals/NewListModal"
import {ViewRecipeList} from "../../Common/Modals/ViewRecipeList"
import {getRecipeList} from "../../../helpers/getRecipeList"
import {replaceCurrentList} from "../../../Redux/slices/recipeListSlice"
import Link from "next/link"
import {useRouter} from "next/router"

interface ModalState {
  type: "error" | "currentList" | "lastList"
  title: string
  errorMessage?: string
}

export default function HiddenHome() {
  const user = currentUser()
  const [loading, setLoading] = useState<string | null>(null)
  const [{type, title}, setModal] = useState<ModalState>({
    type: "currentList",
    title: "",
  })

  const state = useTypedSelector((state) => state)
  const {recipes} = state.recipes
  const {ingredients} = state.ingredients
  const {currentRecipeList, lastRecipeList} = state.recipeList

  const router = useRouter()
  const dispatch = useDispatch()

  const {isOpen, onClose, onOpen} = useDisclosure()

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
    <AuthedPage>
      <Section pt={[0, 0, 0]}>
        <Button
          mt={2}
          height={100}
          width={100}
          borderRadius={"50%"}
          alignItems="center"
          onClick={() => {
            if (lastRecipeList.length > 0) {
              setModal({title: "Last list saved", type: "lastList"})
            } else {
              setModal({title: "New List", type: "currentList"})
            }

            onOpen()
          }}
          size={"sm"}
        >
          <TextBox>Shopping List</TextBox>
        </Button>
        <Flex alignItems={"center"}>
          Recipes:
          <Link href={"/auth/recipe"}>
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
                  router.push(`/auth/recipe/${recipe.id}`)
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
      <Modal isOpen={isOpen} onClose={onClose} title={title} loading={false}>
        <ModalBody>
          {type === "currentList" && (
            <NewListModal
              recipes={recipes}
              ingredients={ingredients}
              currentList={currentRecipeList}
              user={user}
              onClose={onClose}
            />
          )}
          {type === "lastList" && (
            <ViewRecipeList
              recipes={recipes}
              ingredients={ingredients}
              list={lastRecipeList}
              currentList={currentRecipeList}
              onNewList={({ignoreList, noOfMeals}) => {
                if (currentRecipeList.length === 0) {
                  const filteredRecipes = !ignoreList
                    ? recipes.filter((rec) =>
                        lastRecipeList.every(
                          (curRec) => curRec.recipeId !== rec.id,
                        ),
                      )
                    : recipes
                  const recipeList = getRecipeList(filteredRecipes, noOfMeals)
                  dispatch(replaceCurrentList(recipeList))
                }
                setModal({type: "currentList", title: "New List"})
              }}
            />
          )}
        </ModalBody>
      </Modal>
    </AuthedPage>
  )
}
