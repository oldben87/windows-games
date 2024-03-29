import {Button, Select} from "@chakra-ui/react"
import {Input} from "../Input"
import TextBox from "../TextBox"
import {Ingredient, RecipeIngredient} from "../../../FirebaseApi/database"
import {useState} from "react"

export const IngredientModal = ({
  onSubmit,
  ingredient,
}: {
  onSubmit: (ingredient: RecipeIngredient) => void
  ingredient: Ingredient
}) => {
  const [state, setState] = useState<Omit<RecipeIngredient, "id">>({
    quantity: 0,
  })
  const ingredeintToAdd = ingredient
  return (
    <>
      <TextBox fontWeight={"semibold"}>{ingredeintToAdd.name}</TextBox>
      <Input
        title={`Quantity (${ingredeintToAdd.unit})`}
        isInvalid={false}
        type="number"
        value={state.quantity}
        onChange={(e) =>
          setState({...state, quantity: parseFloat(e.target.value)})
        }
      />
      <Input
        title={"Notes [optional]"}
        placeholder={"Finely chopped"}
        isInvalid={false}
        value={state.note || ""}
        onChange={(e) => setState({...state, note: e.target.value})}
      />
      {ingredeintToAdd.variants && ingredeintToAdd.variants.length && (
        <>
          <TextBox mt={3}>Pick a type [optional]</TextBox>
          <Select
            defaultValue={state.variant}
            onChange={(e) =>
              setState({
                ...state,
                variant: e.target.value.length > 0 ? e.target.value : undefined,
              })
            }
          >
            <option value="">Pick a type</option>
            {ingredeintToAdd.variants.map((variant, index) => (
              <option key={variant + index} value={variant}>
                {variant}
              </option>
            ))}
          </Select>
        </>
      )}
      <Button mt={6} onClick={() => onSubmit({...state, id: ingredient.id})}>
        Add to recipe
      </Button>
    </>
  )
}
