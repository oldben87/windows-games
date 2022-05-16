import {Button, Flex, Icon, IconButton} from "@chakra-ui/react"
import Title from "components/common/Title"
import {Ingredient, Recipe, RecipeListItem} from "FirebaseApi/database"
import {getIngredientsList} from "helpers/getIngredientsList"
import {getRecipeIngredientText} from "helpers/getRecipeIngredientText"
import {useState} from "react"
import {GrCopy} from "react-icons/gr"

interface Props {
  recipes: Array<Recipe>
  ingredients: Array<Ingredient>
  list: Array<RecipeListItem>
  onNewList: () => void
}

export const ViewRecipeList = ({
  recipes,
  ingredients,
  list,
  onNewList,
}: Props) => {
  const [showShopping, setShowShopping] = useState(true)
  const [loading, setLoading] = useState(false)

  const ingredientsList = getIngredientsList(recipes, list)

  const handleNewListClick = () => {
    setLoading(true)

    onNewList()
  }

  return (
    <>
      <Title>Meals</Title>
      {list.length > 0 && (
        <>
          {list
            .map((item) => {
              const recipe = recipes.find((rec) => rec.id === item.recipeId)
              if (!recipe) {
                return
              }
              return (
                <Flex key={item.recipeId}>
                  <p>{recipe.name}</p>
                </Flex>
              )
            })
            .filter(Boolean)}
        </>
      )}

      <Flex my={2} width={"100%"}>
        <Button width={"100%"} isLoading={loading} onClick={handleNewListClick}>
          Generate new list
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
