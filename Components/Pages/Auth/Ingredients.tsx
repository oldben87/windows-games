import {
  Button,
  Flex,
  Icon,
  IconButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react"
import AuthedPage from "../../Layout/AuthedPage"
import {ActionRow} from "../../Common/ActionRow"
import {FoodGroupSelect} from "../../Common/FoodGroupSelect"
import Section from "../../Common/Section"
import TextBox from "../../Common/TextBox"
import {Modal} from "../../Common/Modals"
import {CreateIngredientModal} from "../../Common/Modals/CreateIngredientModal"
import {EditIngredientModal} from "../../Common/Modals/EditIngredientModal"
import {currentUser} from "../../../FirebaseApi/auth"
import {
  deleteIngredientForUser,
  FoodGroup,
  Ingredient,
} from "../../../FirebaseApi/database"
import {getFoodGroupTitle} from "../../../helpers/getFoodGroupTitle"
import {useTypedSelector} from "../../../hooks/typedSelector"
import {filter, prop, sortBy} from "ramda"
import {useState} from "react"
import {GrAdd} from "react-icons/gr"
import {RiFilter2Fill, RiFilter2Line} from "react-icons/ri"
import {useDispatch} from "react-redux"
import {deleteIngredient} from "../../../Redux/slices/ingredientSlice"

interface ModalToOpen {
  modal: "editIngredient" | "filter" | "createIngredient" | "error"
  loading: boolean
  title: string
  ingredient?: Ingredient
  errorMessage?: string
}

const filterByFilterValue =
  (filterValue: FoodGroup | undefined) => (ing: Ingredient) => {
    if (filterValue) {
      return ing.group === filterValue
    } else {
      return true
    }
  }

export default function HiddenIngredients() {
  const [filterValue, setFilterValue] = useState<FoodGroup | undefined>()
  const [modal, setModal] = useState<ModalToOpen>({
    modal: "createIngredient",
    loading: false,
    title: "Ingredient: None",
  })
  const [loading, setLoading] = useState<string | null>(null)
  const {onClose, isOpen, onOpen} = useDisclosure()
  const user = currentUser()
  const state = useTypedSelector((state) => state)
  const ingredients = state.ingredients.ingredients
  const recipes = state.recipes.recipes

  const filterWithValue = filterByFilterValue(filterValue)

  const filteredSortedIngredients = sortBy(
    prop("name"),
    filter(filterWithValue, ingredients),
  )

  const dispatch = useDispatch()

  const handleDeletePress = async (id: string) => {
    let inUse = recipes.reduce<Array<string>>((acc, recipe) => {
      if (recipe.ingredients.every((ing) => ing.id !== id)) {
        return acc
      } else return [...acc, recipe.name]
    }, [])

    if (inUse.length > 0) {
      setModal({
        modal: "error",
        loading: false,
        title: "Ingredient in use",
        errorMessage: `Please remove the ingredients from the following recipes:\n${inUse.join(
          ", ",
        )}`,
      })
      onOpen()
    } else {
      setLoading(id)
      try {
        if (!user) {
          return
        }

        deleteIngredientForUser(user.uid, id).then((result) => {
          if (result.success) {
            dispatch(deleteIngredient(id))
            setLoading(null)
          }
        })

        setLoading(null)
      } catch (error) {
        const err = error as {message: string}
        setLoading(null)
        setModal({
          modal: "error",
          loading: false,
          title: err.message,
        })
      }
    }
  }

  return (
    <AuthedPage>
      <Section pt={[0, 0, 0]}>
        <Flex direction={"column"} height="100%">
          <Flex mt={2} alignItems={"center"} maxWidth={400}>
            <Flex alignItems={"center"}>
              <TextBox fontSize="lg" fontWeight={"semibold"}>
                {filterValue
                  ? getFoodGroupTitle(filterValue)
                  : "All ingredients"}
              </TextBox>
              <IconButton
                variant={"ghost"}
                aria-label="Filter ingredients"
                ml={1}
                my={1}
                onClick={() => {
                  setModal({
                    modal: "filter",
                    loading: false,
                    title: "Filter ingredient list",
                  })
                  onOpen()
                }}
                icon={
                  <Icon
                    mr={1}
                    as={filterValue ? RiFilter2Fill : RiFilter2Line}
                  />
                }
                title="Add n"
              />
            </Flex>
            <Button
              variant={"ghost"}
              aria-label="Add new ingredient"
              ml={5}
              my={1}
              onClick={() => {
                setModal({
                  modal: "createIngredient",
                  loading: false,
                  title: "New ingredient",
                })
                onOpen()
              }}
              rightIcon={<Icon mr={1} as={GrAdd} />}
            >
              Add
            </Button>
          </Flex>
          <Flex direction={"column"} maxWidth={400}>
            {filteredSortedIngredients.map((ingredient) => {
              const isLoading = loading === ingredient.id
              return (
                <ActionRow
                  key={ingredient.id}
                  item={ingredient}
                  onTrashClick={async () => {
                    await handleDeletePress(ingredient.id)
                  }}
                  trashLoading={isLoading}
                  onClick={() => {
                    setModal({
                      title: ingredient.name,
                      modal: "editIngredient",
                      loading: false,
                      ingredient,
                    })
                    onOpen()
                  }}
                />
              )
            })}
          </Flex>
        </Flex>
      </Section>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        title={modal.title}
        loading={modal.loading}
      >
        <ModalBody>
          {modal.modal === "createIngredient" && user != null && (
            <CreateIngredientModal
              user={user}
              onClose={onClose}
              onSubmit={() => {
                onClose()
              }}
            />
          )}
          {modal.modal === "editIngredient" &&
            modal.ingredient &&
            user != null && (
              <EditIngredientModal
                ingredient={modal.ingredient}
                onClose={onClose}
                onSubmit={() => {
                  onClose()
                }}
                user={user}
              />
            )}
          {modal.modal === "filter" && (
            <FoodGroupSelect
              defaultTitle="No Filter"
              defaultValue={filterValue}
              onChange={(value) => {
                setFilterValue(value)
                onClose()
              }}
            />
          )}
          {modal.modal === "error" && modal.errorMessage && (
            <TextBox color="red">{modal.errorMessage}</TextBox>
          )}
        </ModalBody>
      </Modal>
    </AuthedPage>
  )
}
