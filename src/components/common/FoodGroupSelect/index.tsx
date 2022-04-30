import {Select} from "@chakra-ui/react"
import {FoodGroup} from "FirebaseApi/database"
import {getFoodGroupTitle} from "helpers/getFoodGroupTitle"

const foodGroupsList = [
  "fruit/veg",
  "meat/poultry",
  "seafood/fish",
  "dairy",
  "herb",
  "spice",
  "seasoning",
  "tin/jar",
  "sauce",
  "cupboard",
]

interface Props {
  defaultTitle: string
  onChange: (value?: FoodGroup) => void
  defaultValue?: FoodGroup
}

export const FoodGroupSelect = ({
  defaultValue,
  onChange,
  defaultTitle,
}: Props) => {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={(event) => {
        onChange(event.target.value as FoodGroup | undefined)
      }}
    >
      <option value={""}>{defaultTitle}</option>
      {foodGroupsList.map((group) => {
        return (
          <option key={group} value={group}>
            {getFoodGroupTitle(group as FoodGroup)}
          </option>
        )
      })}
    </Select>
  )
}
