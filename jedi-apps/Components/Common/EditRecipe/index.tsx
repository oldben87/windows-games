import {Input} from "../Input"
import Title from "../Title"
import {currentUser} from "../../../FirebaseApi/auth"
import {Ingredient, Recipe} from "../../../FirebaseApi/database"
import {useState} from "react"
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  ModalBody,
  Select,
  useDisclosure,
} from "@chakra-ui/react"
import TextBox from "../TextBox"
import {Modal} from "../Modals"
import {GrAdd, GrTrash} from "react-icons/gr"
import {prop, remove, sortBy} from "ramda"
import {IngredientModal} from "../Modals/IngredientModal"
import {AddStepModal} from "../Modals/AddStepModal"
import {CreateIngredientModal} from "../Modals/CreateIngredientModal"
import {HighlightRow} from "../HighlightRow"
import {useTypedSelector} from "../../../hooks/typedSelector"
import {getRecipeIngredientText} from "../../../helpers/getRecipeIngredientText"

type NewRecipe = Omit<Recipe, "id"> & {id?: string}

interface Props {
  recipe: NewRecipe
  onSubmit: (recipe: NewRecipe) => void
  loading: boolean
}

interface ModalToOpen {
  modal: "ingredient" | "addStep" | "createIngredient"
  loading: boolean
  title: string
  ingredient?: Ingredient
}

export function EditRecipe({recipe, onSubmit, loading}: Props) {
  const [state, setState] = useState<NewRecipe>(recipe)
  const user = currentUser()
  const [ingredientSelected, setIngredientSelected] = useState("")

  const {isOpen, onClose, onOpen} = useDisclosure()
  const [modal, setModal] = useState<ModalToOpen>({
    modal: "ingredient",
    loading: false,
    title: "Ingredient Details",
  })

  const handleAddIngredient = (ingredient: Ingredient) => {
    setModal({
      modal: "ingredient",
      loading: false,
      title: "Ingredient Details",
      ingredient,
    })
    onOpen()
  }

  const handleAddStep = () => {
    setModal({
      modal: "addStep",
      loading: false,
      title: "Add new step",
      ingredient: undefined,
    })
    onOpen()
  }

  const handleCreateIngredient = () => {
    setModal({
      modal: "createIngredient",
      loading: false,
      title: "Create new ingredient",
    })
    onOpen()
  }

  const ingredients = useTypedSelector((state) => state.ingredients.ingredients)

  const sortedIngredients = sortBy(prop("name"), ingredients)

  return (
    <>
      <Box maxWidth={400}>
        <Title>Add new recipe</Title>
        <Input
          title={"Recipe Name"}
          value={state.name}
          onChange={(event) => setState({...state, name: event.target.value})}
          isInvalid={false}
        />
        <Input
          title={"Description"}
          value={state.description || ""}
          onChange={(event) =>
            setState({...state, description: event.target.value})
          }
          isInvalid={false}
        />
        <Input
          title={"Serves"}
          type="number"
          value={state.serves !== undefined ? state.serves.toString() : ""}
          onChange={(event) => {
            if (
              event.target.value === "" ||
              isNaN(parseInt(event.target.value))
            ) {
              setState({
                ...state,
                serves: undefined,
              })
              return
            } else {
              setState({
                ...state,
                serves: parseFloat(event.target.value),
              })
            }
          }}
          onBlur={(event) => {
            if (
              event.target.value === "" ||
              isNaN(parseInt(event.target.value))
            ) {
              setState({
                ...state,
                serves: undefined,
              })
              return
            }
            setState({
              ...state,
              serves: Math.round(parseFloat(event.target.value)),
            })
          }}
          isInvalid={false}
        />
        <Flex mt={2} alignItems={"center"}>
          <TextBox fontWeight={"semibold"}>Ingredients</TextBox>
          <IconButton
            variant={"ghost"}
            aria-label="Add new ingredient"
            ml={1}
            my={1}
            onClick={handleCreateIngredient}
            icon={<Icon mr={1} as={GrAdd} />}
          />
        </Flex>
        <Select
          maxWidth={400}
          value={ingredientSelected}
          onChange={(event) => {
            if (event.target.value === "") {
              return
            }

            const ingredient = ingredients.find(
              (ing) => ing.id === event.target.value,
            )

            if (!ingredient) {
              return
            }

            setIngredientSelected(ingredient.id)
            handleAddIngredient(ingredient)
          }}
        >
          <option value="" disabled>
            Choose ingredient
          </option>
          {sortedIngredients.map((ing) => (
            <option key={ing.id} value={ing.id}>
              {ing.name}
            </option>
          ))}
        </Select>
        <Flex direction={"column"} mb={2}>
          {state.ingredients
            .map((recipeIngredient, index) => {
              const {id} = recipeIngredient

              const ingredient = ingredients.find((ing) => ing.id === id)
              if (!ingredient) {
                return
              }

              const info = getRecipeIngredientText(recipeIngredient, ingredient)
              return (
                <HighlightRow key={id + index}>
                  <TextBox>{info}</TextBox>
                  <IconButton
                    variant={"ghost"}
                    aria-label={`Remove ${ingredient.name}`}
                    icon={<Icon as={GrTrash} />}
                    ml={1}
                    my={1}
                    onClick={() => {
                      setState({
                        ...state,
                        ingredients: remove(index, 1, state.ingredients),
                      })
                    }}
                  />
                </HighlightRow>
              )
            })
            .filter(Boolean)}
        </Flex>

        <Flex direction={"column"} my={2}>
          <Flex alignItems={"center"}>
            <TextBox fontWeight={"semibold"}>Cooking steps</TextBox>
            <IconButton
              my={1}
              variant={"ghost"}
              aria-label="Add new step"
              icon={<Icon as={GrAdd} />}
              ml={1}
              onClick={handleAddStep}
            />
          </Flex>
          {state.cookingInstructions &&
            state.cookingInstructions.map(({title, details}, index) => {
              const step = `${index + 1} - ${title}.`
              return (
                <HighlightRow key={title + index}>
                  <Flex direction={"column"}>
                    <TextBox mb={0}>{step}</TextBox>
                    {details && <TextBox mt={0}>{details}</TextBox>}
                  </Flex>
                  <IconButton
                    variant={"ghost"}
                    aria-label={`Remove step ${index + 1}`}
                    icon={<Icon as={GrTrash} />}
                    ml={1}
                    onClick={() => {
                      const newInstructions = state.cookingInstructions || []
                      setState({
                        ...state,
                        cookingInstructions: remove(index, 1, newInstructions),
                      })
                    }}
                  />
                </HighlightRow>
              )
            })}
        </Flex>
        <Button
          mt={2}
          minWidth={"100%"}
          onClick={async () => {
            if (state.name.trim().length === 0) {
              return
            }

            if (!user) {
              return
            }

            onSubmit(state)
          }}
          isLoading={loading}
        >
          Save Recipe
        </Button>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={modal.title}
        loading={modal.loading}
      >
        <ModalBody>
          {modal.modal === "ingredient" && modal.ingredient && (
            <IngredientModal
              ingredient={modal.ingredient}
              onSubmit={(ingredient) => {
                setState({
                  ...state,
                  ingredients: [...state.ingredients, ingredient],
                })
                setIngredientSelected("")
                onClose()
              }}
            />
          )}
          {modal.modal === "addStep" && (
            <AddStepModal
              onSubmit={(step) => {
                const instructions = state.cookingInstructions || []
                setState({
                  ...state,
                  cookingInstructions: [...instructions, step],
                })
                onClose()
              }}
            />
          )}
          {modal.modal === "createIngredient" && user != null && (
            <CreateIngredientModal
              user={user}
              onClose={onClose}
              onSubmit={(ingredient) => {
                if (ingredient) {
                  setModal({
                    modal: "ingredient",
                    loading: false,
                    title: "Ingredient Details",
                    ingredient,
                  })
                }
              }}
            />
          )}
        </ModalBody>
      </Modal>
    </>
  )
}
