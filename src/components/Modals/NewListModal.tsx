import {Flex, Icon, IconButton, Select} from "@chakra-ui/react"
import TextBox from "components/common/TextBox"
import Title from "components/common/Title"
import {Ingredient, Recipe, RecipeIngredient} from "FirebaseApi/database"
import {getRecipeIngredientText} from "helpers/getRecipeIngredientText"
import {remove} from "ramda"
import {useEffect, useState} from "react"
import {GrTrash} from "react-icons/gr"

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

  const maxNum = maxNumber < list.length ? maxNumber : list.length
  do {
    const rdmNum = Math.random()
    const index = Math.floor(rdmNum * list.length)

    if (
      list[index] !== undefined &&
      result.every(({recipeId}) => recipeId !== list[index].id)
    ) {
      result.push({recipeId: list[index].id})
    }
  } while (result.length < maxNum)

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

  const removeItemFromList = (index: number) => {
    const newList = remove(index, 1, list)
    setList(newList)
    setIngredientsList(getIngredientsList(recipes, newList))
  }

  const addToList = (recipe: Recipe) => {
    const newList = [...list, {recipeId: recipe.id, serves: recipe.serves}]
    setList(newList)
    setIngredientsList(getIngredientsList(recipes, newList))
  }

  return (
    <>
      <Title>Meals</Title>
      {list.length > 0 && (
        <>
          {list
            .map((item, index) => {
              const recipe = recipes.find((rec) => rec.id === item.recipeId)
              if (!recipe) {
                return
              }
              return (
                <Flex key={item.recipeId} alignItems="center">
                  <IconButton
                    variant={"ghost"}
                    aria-label={`Remove ${recipe.name}`}
                    icon={<Icon as={GrTrash} />}
                    mr={2}
                    my={1}
                    size={"sm"}
                    onClick={() => {
                      removeItemFromList(index)
                    }}
                  />
                  <p>{recipe.name}</p>
                </Flex>
              )
            })
            .filter(Boolean)}
        </>
      )}
      <TextBox>Add a recipe:</TextBox>
      <Select
        onChange={(event) => {
          const recipeId = event.target.value
          const recipe = recipes.find((rec) => rec.id === recipeId)

          if (!recipe) {
            return
          }

          addToList(recipe)
        }}
        defaultValue={""}
      >
        <option value={""} disabled>
          Choose a recipe
        </option>
        {recipes
          .filter((rec) => list.every((li) => li.recipeId !== rec.id))
          .map((rec) => {
            return (
              <option key={rec.id} value={rec.id}>
                {rec.name}
              </option>
            )
          })}
      </Select>
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
