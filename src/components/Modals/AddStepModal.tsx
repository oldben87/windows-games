import {Button} from "@chakra-ui/react"
import {Input} from "components/common/Input"
import {RecipeStep} from "FirebaseApi/database"
import {useState} from "react"

export const AddStepModal = ({
  onSubmit,
}: {
  onSubmit: (step: RecipeStep) => void
}) => {
  const [state, setState] = useState<RecipeStep>({
    title: "",
  })
  return (
    <>
      <Input
        title={"Title"}
        isInvalid={false}
        value={state.title}
        onChange={(e) => setState({...state, title: e.target.value})}
      />
      <Input
        title={"Further detail [optional]"}
        isInvalid={false}
        value={state.details || ""}
        onChange={(e) => setState({...state, details: e.target.value})}
      />
      <Button onClick={() => onSubmit(state)}>Save step</Button>
    </>
  )
}
