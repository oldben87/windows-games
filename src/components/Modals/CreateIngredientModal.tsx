import {Button, Flex, Icon, IconButton, Select} from "@chakra-ui/react"
import {Input} from "components/common/Input"
import TextBox from "components/common/TextBox"
import {FoodGroup, FoodUnit, Ingredient} from "FirebaseApi/database"
import {useState} from "react"
import {HighlightRow} from "components/common/HighlightRow"
import {GrAdd, GrTrash} from "react-icons/gr"
import {remove} from "ramda"

const FoodUnitList = ["g", "kg", "ml", "ltr", "cup", "each"]
const FoodGroupList = [
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

export const CreateIngredientModal = ({
  onSubmit,
}: {
  onSubmit: (id: string) => void
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
        <Select
          placeholder="Pick measurement"
          onChange={(event) => {
            if (event.target.value === "") {
              return
            }
            setState({...state, unit: event.target.value as FoodUnit})
          }}
        >
          {FoodUnitList.map((unit) => {
            return (
              <option key={unit} value={unit}>
                {unit}
              </option>
            )
          })}
        </Select>
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
        <Select
          placeholder="Pick category"
          onChange={(event) => {
            if (event.target.value === "") {
              return
            }
            setState({...state, group: event.target.value as FoodGroup})
          }}
        >
          {FoodGroupList.map((group) => {
            return (
              <option key={group} value={group}>
                {group}
              </option>
            )
          })}
        </Select>
      </Flex>
      <Flex width={400} direction="column" my={3}>
        <Flex alignItems={"flex-end"}>
          <Input
            title="Varieties"
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
              const newStuff = ""
              onSubmit(newStuff)
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
