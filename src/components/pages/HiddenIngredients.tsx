import {Flex} from "@chakra-ui/react"
import AuthedPage from "components/AuthedPage"
import {HighlightRow} from "components/common/HighlightRow"
import Section from "components/common/Section"
import {currentUser} from "FirebaseApi/auth"
import {useTypedSelector} from "hooks/typedSelector"

export default function HiddenIngredients() {
  const user = currentUser()
  const ingredients = useTypedSelector((state) => state.ingredients.ingredients)

  return (
    <AuthedPage user={user}>
      <Section>
        <p>Ingredients will be here</p>
        <Flex direction={"column"}>
          {ingredients.map((ingredient) => {
            return (
              <HighlightRow key={ingredient.id}>{ingredient.name}</HighlightRow>
            )
          })}
        </Flex>
      </Section>
    </AuthedPage>
  )
}
