import {Button, Flex, Icon, IconButton} from "@chakra-ui/react"
import {FoodGroupSelect} from "components/common/FoodGroupSelect"
import {FoodMeasurementSelect} from "components/common/FoodMeasurementSelect"
import {HighlightRow} from "components/common/HighlightRow"
import {Input} from "components/common/Input"
import TextBox from "components/common/TextBox"
import {User} from "firebase/auth"
import {Ingredient, updateIngredientForUser} from "FirebaseApi/database"
import {remove} from "ramda"
import {useState} from "react"
import {GrAdd, GrTrash} from "react-icons/gr"
import {useDispatch} from "react-redux"
import {updateIngredient} from "Redux/slices/ingredientSlice"

interface Props {
  ingredient: Ingredient
  onSubmit: (ingredient?: Ingredient) => void
  onClose: () => void
  user: User
}

export const EditIngredientModal = ({
  ingredient,
  onSubmit,
  onClose,
  user,
}: Props) => {
  const [state, setState] = useState(ingredient)
  const [loading, setLoading] = useState(false)
  const [newVariant, setNewVariant] = useState<string | null>(null)
  const handleNewVariant = () => {
    if (newVariant === null || newVariant.trim().length === 0) {
      return
    }
    const currentVariants = state.variants || []

    setState({...state, variants: [...currentVariants, newVariant]})

    setNewVariant(null)
  }

  const dispatch = useDispatch()

  return (
    <Flex maxWidth={400} direction={"column"}>
      <Input
        title={"Name"}
        isInvalid={false}
        value={state.name}
        onChange={(e) => setState({...state, name: e.target.value})}
      />
      <Flex maxWidth={400} direction="column" my={3}>
        <TextBox>Measurement</TextBox>
        <FoodMeasurementSelect
          onChange={(value) => {
            if (!value) {
              return
            }
            setState({...state, unit: value})
          }}
          defaultValue={state.unit}
        />
      </Flex>
      {(state.unit === "cup" || state.unit === "each") && (
        <Input
          title={"Unit in grams [optional]"}
          type="number"
          value={state.unitIngs !== undefined ? state.unitIngs.toString() : ""}
          onChange={(event) => {
            if (
              event.target.value === "" ||
              isNaN(parseInt(event.target.value))
            ) {
              setState({
                ...state,
                unitIngs: undefined,
              })
              return
            } else {
              setState({
                ...state,
                unitIngs: parseFloat(event.target.value),
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
                unitIngs: undefined,
              })
              return
            }
            setState({
              ...state,
              unitIngs: Math.round(parseFloat(event.target.value)),
            })
          }}
          isInvalid={false}
        />
      )}
      <Flex maxWidth={400} direction="column" my={3}>
        <TextBox>Category</TextBox>
        <FoodGroupSelect
          defaultTitle="Pick category"
          onChange={(value) => {
            if (!value) {
              return
            }

            setState({...state, group: value})
          }}
        />
      </Flex>
      <Flex maxWidth={400} direction="column" my={3}>
        <Flex alignItems={"flex-end"}>
          <Input
            title="Varieties [optional]"
            type="text"
            value={newVariant}
            isInvalid={false}
            onChange={(e) => setNewVariant(e.target.value)}
          />
          <IconButton
            variant={"ghost"}
            aria-label={`Add new variety`}
            icon={<Icon as={GrAdd} />}
            ml={1}
            mb={2}
            onClick={handleNewVariant}
          />
        </Flex>
        {state.variants &&
          state.variants.map((variant, index) => {
            return (
              <HighlightRow key={variant + index}>
                <TextBox fontSize="sm">{variant}</TextBox>
                <IconButton
                  variant={"ghost"}
                  aria-label={`Remove ${variant}`}
                  icon={<Icon as={GrTrash} />}
                  ml={1}
                  my={1}
                  size={"sm"}
                  onClick={() => {
                    const variants = state.variants || []
                    setState({
                      ...state,
                      variants: remove(index, 1, variants),
                    })
                  }}
                />
              </HighlightRow>
            )
          })}
        <Button
          mt={2}
          onClick={async () => {
            setLoading(true)
            try {
              setLoading(false)
              if (state.name.trim().length === 0) {
                setLoading(false)
                return
              }

              const newStuff = await updateIngredientForUser(user.uid, state)
              if (newStuff.id === null) {
                onClose()
                return
              }

              const newIngredgient = {...state, id: newStuff.id}

              dispatch(updateIngredient(newIngredgient))
              onSubmit()
            } catch {
              setLoading(false)
            }
          }}
          isLoading={loading}
        >
          Save Ingredient
        </Button>
      </Flex>
    </Flex>
  )
}
