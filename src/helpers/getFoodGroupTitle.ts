import {FoodGroup} from "FirebaseApi/database"

export const getFoodGroupTitle = (group: FoodGroup) => {
  if (!group.includes("/")) {
    return group.charAt(0).toUpperCase() + group.slice(1)
  }

  let splitGroup = group.split("/")

  return `${splitGroup[0].charAt(0).toUpperCase() + splitGroup[0].slice(1)} & ${
    splitGroup[1].charAt(0).toUpperCase() + splitGroup[1].slice(1)
  }`
}
