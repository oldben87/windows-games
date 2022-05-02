import {Ingredient, RecipeIngredient} from "FirebaseApi/database"

type Options = {noNote?: boolean} | undefined
export const getRecipeIngredientText = (
  {quantity, variant, note}: RecipeIngredient,
  {unit, name}: Ingredient,
  options?: Options,
) => {
  const noNote = options?.noNote === true

  return `${quantity}${unit !== "each" ? unit : ""} x ${variant || ""} ${name}${
    !noNote && note ? ` (${note})` : ""
  }`
}
