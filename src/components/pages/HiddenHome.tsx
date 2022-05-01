import {Flex, IconButton, Icon} from "@chakra-ui/react"
import {currentUser} from "FirebaseApi/auth"
import Section from "components/common/Section"
import {GrAdd} from "react-icons/gr"
import AuthedPage from "components/AuthedPage"
import {Link} from "react-router-dom"
import {useTypedSelector} from "hooks/typedSelector"
import {HighlightRow} from "components/common/HighlightRow"

export default function HiddenHome() {
  const user = currentUser()

  const recipes = useTypedSelector((state) => state.recipes.recipes)

  return (
    <AuthedPage user={user}>
      <Section pt={[0, 0, 0]}>
        <Flex alignItems={"center"}>
          Recipes:
          <Link to={"/hidden/recipe"}>
            <IconButton
              variant={"ghost"}
              aria-label="Add new recipe"
              icon={<Icon as={GrAdd} />}
              ml={2}
            >
              New Recipes
            </IconButton>
          </Link>
        </Flex>
        <Flex>
          {recipes.map((recipe) => {
            return <HighlightRow key={recipe.id}>{recipe.name}</HighlightRow>
          })}
        </Flex>
      </Section>
    </AuthedPage>
  )
}
