import {
  Flex,
  Icon,
  IconButton,
  ModalBody,
  Select,
  useDisclosure,
} from "@chakra-ui/react"
import AuthedPage from "components/AuthedPage"
import {HighlightRow} from "components/common/HighlightRow"
import Section from "components/common/Section"
import TextBox from "components/common/TextBox"
import {Modal} from "components/Modals"
import {CreateIngredientModal} from "components/Modals/CreateIngredientModal"
import {currentUser} from "FirebaseApi/auth"
import {FoodGroup, Ingredient} from "FirebaseApi/database"
import {useTypedSelector} from "hooks/typedSelector"
import {useState} from "react"
import {GrAdd} from "react-icons/gr"
import {RiFilter2Fill, RiFilter2Line} from "react-icons/ri"

interface ModalToOpen {
  modal: "editIngredient" | "filter" | "createIngredient"
  loading: boolean
  title: string
  ingredient?: Ingredient
}

const foodGroupsList = [
  "fruit/veg",
  "meat/poultry",
  "seafood/fish",
  "dairy",
  "herb",
  "spice",
  "seasoning",
  "tin/jar",
  "sauce",
  "cupboard",
]

export default function HiddenIngredients() {
  const [filterValue, setFilterValue] = useState<FoodGroup | undefined>()
  const [modal, setModal] = useState<ModalToOpen>({
    modal: "createIngredient",
    loading: false,
    title: "Ingredient: None",
  })
  const {onClose, isOpen, onOpen} = useDisclosure()
  console.log(filterValue, setFilterValue)
  const user = currentUser()
  const ingredients = useTypedSelector((state) => state.ingredients.ingredients)

  return (
    <AuthedPage user={user}>
      <Section>
        <Flex mt={2} alignItems={"center"}>
          <TextBox fontWeight={"semibold"}>Ingredients</TextBox>
          <IconButton
            variant={"ghost"}
            aria-label="Add new ingredient"
            ml={1}
            my={1}
            onClick={() => {
              setModal({
                modal: "createIngredient",
                loading: false,
                title: "New ingredient",
              })
              onOpen()
            }}
            icon={<Icon mr={1} as={GrAdd} />}
          />
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
              <Icon mr={1} as={filterValue ? RiFilter2Fill : RiFilter2Line} />
            }
          />
        </Flex>
        <Flex direction={"column"}>
          {ingredients
            .filter((ing) => {
              if (filterValue) {
                return ing.group === filterValue
              } else {
                return true
              }
            })
            .map((ingredient) => {
              return (
                <HighlightRow key={ingredient.id}>
                  {ingredient.name}
                </HighlightRow>
              )
            })}
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
          {modal.modal === "filter" && (
            <>
              <Select
                defaultValue={filterValue}
                onChange={(event) => {
                  if (event.target.value === "") {
                    setFilterValue(undefined)
                    onClose()
                    return
                  }
                  setFilterValue(event.target.value as FoodGroup)
                  onClose()
                }}
              >
                <option value={""}>No filter</option>
                {foodGroupsList.map((group) => {
                  return (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                })}
              </Select>
            </>
          )}
        </ModalBody>
      </Modal>
    </AuthedPage>
  )
}
