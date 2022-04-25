import AuthedPage from "components/AuthedPage"
import {Input} from "components/common/Input"
import Section from "components/common/Section"
import Title from "components/common/Title"
import {currentUser} from "FirebaseApi/auth"
import {Recipe, ingredients} from "FirebaseApi/database"
import {useState} from "react"
import {
  Box,
  Flex,
  Icon,
  IconButton,
  ModalBody,
  Select,
  useDisclosure,
} from "@chakra-ui/react"
import TextBox from "components/common/TextBox"
import {Modal} from "components/Modals"
import {GrAdd, GrTrash} from "react-icons/gr"
import {remove} from "ramda"
import {IngredientModal} from "components/Modals/IngredientModal"
import {AddStepModal} from "components/Modals/AddStepModal"
import {CreateIngredientModal} from "components/Modals/CreateIngredientModal"
import {HighlightRow} from "components/common/HighlightRow"

const initialState: Recipe = {
  name: "",
  description: "",
  ingredients: [],
  serves: 0,
  cookingInstructions: [],
}

interface ModalToOpen {
  modal: "ingredient" | "addStep" | "createIngredient"
  loading: boolean
  title: string
  id?: string
}

export default function HiddenRecipesAdd() {
  const [state, setState] = useState<Recipe>(initialState)
  const user = currentUser()

  const {isOpen, onClose, onOpen} = useDisclosure()
  const [modal, setModal] = useState<ModalToOpen>({
    modal: "ingredient",
    loading: false,
    title: "Ingredient Details",
  })

  const handleAddIngredient = (id: string) => {
    setModal({
      modal: "ingredient",
      loading: false,
      title: "Ingredient Details",
      id,
    })
    onOpen()
  }

  const handleAddStep = () => {
    setModal({
      modal: "addStep",
      loading: false,
      title: "Add new step",
      id: undefined,
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

  return (
    <AuthedPage user={user}>
      <Section>
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
            width={400}
            placeholder="Add new ingredient"
            onChange={(event) => {
              if (event.target.value === "") {
                return
              }
              handleAddIngredient(event.target.value)
            }}
          >
            {Object.values(ingredients).map((ing) => (
              <option key={ing.id} value={ing.id}>
                {ing.name}
              </option>
            ))}
          </Select>
          <Flex direction={"column"} mb={2}>
            {state.ingredients.map(({id, quantity, variant, note}, index) => {
              const ingredient = ingredients[id]
              const info = `${quantity}${
                ingredient.unit !== "each" ? ingredient.unit : ""
              } x ${variant || ""} ${ingredient.name}${
                note ? ` (${note})` : ""
              }`
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
            })}
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
                          cookingInstructions: remove(
                            index,
                            1,
                            newInstructions,
                          ),
                        })
                      }}
                    />
                  </HighlightRow>
                )
              })}
          </Flex>
        </Box>
      </Section>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={modal.title}
        loading={modal.loading}
      >
        <ModalBody>
          {modal.modal === "ingredient" && modal.id && (
            <IngredientModal
              id={modal.id}
              onSubmit={(ingredient) => {
                setState({
                  ...state,
                  ingredients: [...state.ingredients, ingredient],
                })
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
          {modal.modal === "createIngredient" && (
            <CreateIngredientModal
              onSubmit={(id: string) => {
                setModal({
                  modal: "ingredient",
                  loading: false,
                  title: "Ingredient Details",
                  id,
                })
              }}
            />
          )}
        </ModalBody>
      </Modal>
    </AuthedPage>
  )
}
