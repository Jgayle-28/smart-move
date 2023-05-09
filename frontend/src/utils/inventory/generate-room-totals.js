export const generateTotalWeight = (items) => {
  let totalWeight = 0
  items.forEach((item) => {
    // parseInt because item.calcWeight is passed in as string
    totalWeight = totalWeight + parseInt(item.calcWeight)
  })
  return totalWeight
}
export const generateTotalVolume = (items) => {
  let totalVolume = 0
  items.forEach((item) => {
    // parseInt because item.calcVolume is passed in as string
    totalVolume = totalVolume + parseInt(item.calcVolume)
  })
  return totalVolume
}
export const generateTotalItems = (items) => {
  let totalItems = 0
  items.forEach((item) => {
    // parseInt because item.calcVolume is passed in as string
    totalItems = totalItems + parseInt(item.itemAmt)
  })
  return totalItems
}
