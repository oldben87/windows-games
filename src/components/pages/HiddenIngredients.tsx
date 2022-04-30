import {
  Button,
  Flex,
  Icon,
  IconButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react"
import AuthedPage from "components/AuthedPage"
import {FoodGroupSelect} from "components/common/FoodGroupSelect"
import {HighlightRow} from "components/common/HighlightRow"
import Section from "components/common/Section"
import TextBox from "components/common/TextBox"
import {Modal} from "components/Modals"
import {CreateIngredientModal} from "components/Modals/CreateIngredientModal"
import {currentUser} from "FirebaseApi/auth"
import {FoodGroup, Ingredient} from "FirebaseApi/database"
import {getFoodGroupTitle} from "helpers/getFoodGroupTitle"
import {useTypedSelector} from "hooks/typedSelector"
import {filter, prop, sortBy} from "ramda"
import {useState} from "react"
import {GrAdd} from "react-icons/gr"
import {RiFilter2Fill, RiFilter2Line} from "react-icons/ri"

interface ModalToOpen {
  modal: "editIngredient" | "filter" | "createIngredient"
  loading: boolean
  title: string
  ingredient?: Ingredient
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
  const {onClose, isOpen, onOpen} = useDisclosure()
  const user = currentUser()
  const ingredients = useTypedSelector((state) => state.ingredients.ingredients)

  const filterWithValue = filterByFilterValue(filterValue)

  const filteredSortedIngredients = sortBy(
    prop("name"),
    filter(filterWithValue, ingredients),
  )

  return (
    <AuthedPage user={user}>
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
              return (
                <HighlightRow key={ingredient.id}>
                  {ingredient.name}
                </HighlightRow>
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
        </ModalBody>
      </Modal>
    </AuthedPage>
  )
}
