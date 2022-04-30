import {Select} from "@chakra-ui/react"
import {FoodUnit} from "FirebaseApi/database"

const FoodUnitList = ["g", "kg", "ml", "ltr", "cup", "each"]

interface Props {
  onChange: (value?: FoodUnit) => void
  defaultValue: FoodUnit
}

export const FoodMeasurementSelect = ({defaultValue, onChange}: Props) => {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={(event) => {
        onChange(event.target.value as FoodUnit | undefined)
      }}
    >
      {FoodUnitList.map((measurement) => {
        return (
          <option key={measurement} value={measurement}>
            {measurement}
          </option>
        )
      })}
    </Select>
  )
}
