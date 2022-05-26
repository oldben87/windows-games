import {
  Button,
  Flex,
  Icon,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
} from "@chakra-ui/react"
import TextBox from "components/common/TextBox"
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
  currentList: Array<RecipeListItem>
  onNewList: ({
    noOfMeals,
    ignoreList,
  }: {
    noOfMeals: number
    ignoreList: boolean
  }) => void
}

export const ViewRecipeList = ({
  recipes,
  ingredients,
  list,
  currentList,
  onNewList,
}: Props) => {
  const [showShopping, setShowShopping] = useState(true)
  const [ignoreList, setIgnoreList] = useState(false)
  const [loading, setLoading] = useState(false)
  const [noOfMeals, setNoOfMeals] = useState(7)

  const ingredientsList = getIngredientsList(recipes, list)

  const handleNewListClick = () => {
    setLoading(true)

    onNewList({ignoreList, noOfMeals})
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

      <Flex
        my={3}
        width={"100%"}
        direction="column"
        borderTop={"solid darkgrey 1px"}
        borderBottom={"solid darkgrey 1px"}
        py={3}
      >
        <Flex width={"100%"} alignItems="center" justify={"space-evenly"}>
          <Flex alignItems="center" maxW={"50%"}>
            <TextBox mr={2}>Ignore old list</TextBox>
            <Switch
              isChecked={ignoreList}
              onChange={() => setIgnoreList(!ignoreList)}
            />
          </Flex>
          <Flex alignItems="center" maxW={"50%"}>
            <TextBox mr={2}>Meals</TextBox>
            <NumberInput
              value={noOfMeals}
              min={1}
              max={10}
              onChange={(val) => setNoOfMeals(parseInt(val, 10))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </Flex>
        <Button
          width={"100%"}
          mt={2}
          isLoading={loading}
          onClick={handleNewListClick}
        >
          {currentList.length === 0 ? "Generate new list" : "View new list"}
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
