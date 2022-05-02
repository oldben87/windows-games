import Title from "components/common/Title"
import {Ingredient, Recipe, RecipeIngredient} from "FirebaseApi/database"
import {getRecipeIngredientText} from "helpers/getRecipeIngredientText"
import {useEffect, useState} from "react"

interface Props {
  recipes: Array<Recipe>
  ingredients: Array<Ingredient>
}

interface RecipeListItem {
  recipeId: string
  serves?: number
}

const DEFAULT_LIST_LENGTH = 7

export const getRecipeList = (list: Array<{id: string}>, maxNumber: number) => {
  const result: Array<RecipeListItem> = []

  const maxNum = list.length > maxNumber ? maxNumber : list.length

  do {
    const rdmNum = Math.random()
    const index = Math.floor(rdmNum * maxNum)

    if (
      list[index] !== undefined &&
      result.every(({recipeId}) => recipeId !== list[index].id)
    ) {
      result.push({recipeId: list[index].id})
    }
  } while (result.length < 4)

  return result
}

const getIngredientsList = (
  recipes: Array<Recipe>,
  recipeList: Array<RecipeListItem>,
) => {
  const ingredientsHash: Record<string, RecipeIngredient> = {}

  recipeList.forEach(({recipeId}) => {
    const recipe = recipes.find((rec) => rec.id === recipeId)
    if (!recipe) {
      return
    }

    recipe.ingredients.forEach((ing) => {
      const hashKey = ing.variant ? `${ing.id}---${ing.variant}` : ing.id
      const current = ingredientsHash[hashKey]
      if (!current) {
        ingredientsHash[hashKey] = ing
      } else {
        ingredientsHash[hashKey] = {
          ...current,
          quantity: current.quantity + ing.quantity,
        }
      }
    })
  })

  return Object.values(ingredientsHash)
}

export const NewListModal = ({recipes, ingredients}: Props) => {
  const [list, setList] = useState<Array<RecipeListItem>>([])
  const [ingredientsList, setIngredientsList] = useState<
    Array<RecipeIngredient>
  >([])

  useEffect(() => {
    if (list.length === 0) {
      const recipeList = getRecipeList(recipes, DEFAULT_LIST_LENGTH)
      setList(recipeList)
      setIngredientsList(getIngredientsList(recipes, recipeList))
    }
  }, [])

  return (
    <>
      {list.length > 0 && (
        <>
          <Title>Meals</Title>
          {list
            .map((item) => {
              const recipe = recipes.find((rec) => rec.id === item.recipeId)
              if (!recipe) {
                return
              }
              return <p key={item.recipeId}>{recipe.name}</p>
            })
            .filter(Boolean)}
        </>
      )}
      {ingredientsList.length > 0 && (
        <>
          <Title>Shopping List</Title>
          {ingredientsList
            .map((ing) => {
              const ingredient = ingredients.find(
                (ingred) => ing.id === ingred.id,
              )
              if (!ingredient) {
                return
              }

              const key = ing.variant ? ing.id + ing.variant : ing.id

              return (
                <p key={key}>
                  {getRecipeIngredientText(ing, ingredient, {noNote: true})}
                </p>
              )
            })
            .filter(Boolean)}
        </>
      )}
    </>
  )
}
