import {Button, Flex, Icon, IconButton, Select} from "@chakra-ui/react"
import TextBox from "components/common/TextBox"
import Title from "components/common/Title"
import {User} from "firebase/auth"
import {
  Ingredient,
  Recipe,
  RecipeListItem,
  saveRecipeList as saveList,
} from "FirebaseApi/database"
import {getIngredientsList} from "helpers/getIngredientsList"
import {getRecipeIngredientText} from "helpers/getRecipeIngredientText"
import {getRecipeList} from "helpers/getRecipeList"
import {useEffect, useState} from "react"
import {GrTrash, GrCopy} from "react-icons/gr"
import {useDispatch} from "react-redux"
import {
  removeFromCurrentRecipeList,
  replaceCurrentList,
  addToCurrentRecipeList,
  saveCurrentListToLastList,
} from "Redux/slices/recipeListSlice"

interface Props {
  recipes: Array<Recipe>
  ingredients: Array<Ingredient>
  currentList: Array<RecipeListItem>
  user: User | null
  onClose: () => void
}

const DEFAULT_LIST_LENGTH = 7

export const NewListModal = ({
  recipes,
  ingredients,
  currentList,
  user,
  onClose,
}: Props) => {
  const [showShopping, setShowShopping] = useState(true)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentList.length === 0) {
      const recipeList = getRecipeList(recipes, DEFAULT_LIST_LENGTH)
      dispatch(replaceCurrentList(recipeList))
    }
  }, [])

  const removeItemFromList = (id: string) => {
    dispatch(removeFromCurrentRecipeList(id))
  }

  const addToList = (recipe: Recipe) => {
    dispatch(
      addToCurrentRecipeList({recipeId: recipe.id, serves: recipe.serves}),
    )
  }

  const ingredientsList = getIngredientsList(recipes, currentList)

  const saveRecipeList = async () => {
    setLoading(true)
    if (!user) {
      setLoading(false)
      return
    }

    saveList(user.uid, currentList).then(() => {
      dispatch(saveCurrentListToLastList())
      onClose()
      setLoading(false)
    })
  }
  return (
    <>
      <Title>Meals</Title>
      {currentList.length > 0 && (
        <>
          {currentList
            .map((item) => {
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
                      removeItemFromList(item.recipeId)
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
          .filter((rec) => currentList.every((li) => li.recipeId !== rec.id))
          .map((rec) => {
            return (
              <option key={rec.id} value={rec.id}>
                {rec.name}
              </option>
            )
          })}
      </Select>
      <Flex width={"100%"} my={2}>
        <Button
          width={"100%"}
          onClick={async () => {
            await saveRecipeList()
          }}
          isLoading={loading}
        >
          Save List
        </Button>
      </Flex>
      {ingredientsList.length > 0 && (
        <>
          <Flex alignItems={"center"}>
            <Title>Shopping List</Title>
            <Button onClick={() => setShowShopping(!showShopping)} mx={2}>
              {showShopping ? "Hide" : "Show"}
            </Button>
            <IconButton
              variant={"ghost"}
              aria-label={`Copy shopping list`}
              icon={<Icon as={GrCopy} />}
              ml={2}
              my={1}
              size={"sm"}
              onClick={async () => {
                const list = ingredientsList.reduce<Array<string>>(
                  (acc, ing) => {
                    const ingredient = ingredients.find(
                      (ingred) => ing.id === ingred.id,
                    )
                    if (!ingredient) {
                      return acc
                    }

                    return [
                      ...acc,
                      getRecipeIngredientText(ing, ingredient, {
                        noNote: true,
                      }),
                    ]
                  },
                  [],
                )

                navigator.clipboard
                  .writeText(list.join("\n"))
                  .then(() => alert("Copied"))
              }}
            />
          </Flex>
          {showShopping &&
            ingredientsList
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
