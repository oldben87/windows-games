import {Flex, IconButton, Icon} from "@chakra-ui/react"
import {currentUser} from "FirebaseApi/auth"
import Section from "components/common/Section"
import {GrAdd, GrTrash} from "react-icons/gr"
import AuthedPage from "components/AuthedPage"
import {Link, useNavigate} from "react-router-dom"
import {useTypedSelector} from "hooks/typedSelector"
import {HighlightRow} from "components/common/HighlightRow"
import TextBox from "components/common/TextBox"

export default function HiddenHome() {
  const user = currentUser()

  const recipes = useTypedSelector((state) => state.recipes.recipes)
  const navigate = useNavigate()

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
        <Flex direction={"column"}>
          {recipes.map((recipe) => {
            return (
              <RowToList
                key={recipe.id}
                item={recipe}
                onClick={() => {
                  navigate(`/hidden/recipe/${recipe.id}`)
                }}
                onTrashClick={() => {}}
                trashLoading={false}
              />
            )
          })}
        </Flex>
      </Section>
    </AuthedPage>
  )
}

interface RowToListProps {
  item: {id: string; name: string}
  onTrashClick: () => void
  onClick: () => void
  trashLoading: boolean
}

const RowToList = ({
  item,
  onClick,
  onTrashClick,
  trashLoading,
}: RowToListProps) => (
  <Flex key={item.id} maxWidth={400} alignItems="center">
    <IconButton
      variant={"ghost"}
      aria-label={`Remove ${item.name}`}
      icon={<Icon as={GrTrash} />}
      ml={2}
      my={1}
      size={"sm"}
      onClick={onTrashClick}
      isLoading={trashLoading}
    />
    <HighlightRow>
      <Flex h="100%" w="100%" onClick={onClick} alignItems="center">
        <TextBox>{item.name}</TextBox>
      </Flex>
    </HighlightRow>
  </Flex>
)
