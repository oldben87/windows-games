import {
  Flex,
  IconButton,
  Icon,
  Button,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react"
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
import TextBox from "components/common/TextBox"
import {Modal} from "components/Modals"
import {NewListModal} from "components/Modals/NewListModal"

interface ModalState {
  type: "error" | "list"
  title: string
  errorMessage?: string
}

export default function HiddenHome() {
  const user = currentUser()
  const [loading, setLoading] = useState<string | null>(null)
  const [{type, title}, setModal] = useState<ModalState>({
    type: "list",
    title: "",
  })

  const state = useTypedSelector((state) => state)
  const {recipes} = state.recipes
  const {ingredients} = state.ingredients

  const navigate = useNavigate()
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
    <AuthedPage user={user}>
      <Section pt={[0, 0, 0]}>
        <Button
          mt={2}
          height={100}
          width={100}
          borderRadius={"50%"}
          alignItems="center"
          onClick={() => {
            setModal({title: "New List", type: "list"})
            onOpen()
          }}
          size={"sm"}
        >
          <TextBox>Shopping List</TextBox>
        </Button>
        <Flex alignItems={"center"}>
          Recipes:
          <Link to={"/auth/recipe"}>
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
                  navigate(`/auth/recipe/${recipe.id}`)
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
          {type === "list" && (
            <NewListModal recipes={recipes} ingredients={ingredients} />
          )}
        </ModalBody>
      </Modal>
    </AuthedPage>
  )
}
