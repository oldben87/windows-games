import {Button, Flex, Icon, IconButton} from "@chakra-ui/react"
import {Input} from "../Input"
import TextBox from "../TextBox"
import {Ingredient, saveIngredient} from "../../../FirebaseApi/database"
import {useState} from "react"
import {HighlightRow} from "../HighlightRow"
import {GrAdd, GrTrash} from "react-icons/gr"
import {remove} from "ramda"
import {User} from "firebase/auth"
import {useDispatch} from "react-redux"
import {addIngredient} from "../../../Redux/slices/ingredientSlice"
import {FoodGroupSelect} from "../FoodGroupSelect"
import {FoodMeasurementSelect} from "../FoodMeasurementSelect"

export const CreateIngredientModal = ({
  user,
  onClose,
  onSubmit,
}: {
  user: User
  onSubmit: (ingredient?: Ingredient) => void
  onClose: () => void
}) => {
  const [state, setState] = useState<Omit<Ingredient, "id">>({
    name: "",
    unit: "g",
    group: "fruit/veg",
  })
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
    <>
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

              const newStuff = await saveIngredient(user.uid, state)
              if (newStuff.id === null) {
                onClose()
                return
              }

              const newIngredgient = {...state, id: newStuff.id}

              dispatch(addIngredient(newIngredgient))
              onSubmit(newIngredgient)
            } catch {
              setLoading(false)
            }
          }}
          isLoading={loading}
        >
          Save Ingredient
        </Button>
      </Flex>
    </>
  )
}
