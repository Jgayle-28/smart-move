export const generateTotalWeight = (inventory) => {
  let totalWeight = 0
  inventory.forEach((room, i) =>
    room.items.forEach((item) => {
      // parseInt because item.calcWeight is passed in as string
      totalWeight = totalWeight + parseInt(item.calcWeight)
    })
  )
  return totalWeight
}

export const generateTotalVolume = (inventory) => {
  let totalVolume = 0
  inventory.forEach((room, i) =>
    room.items.forEach((item) => {
      // parseInt because item.calcVolume is passed in as string
      totalVolume = totalVolume + parseInt(item.calcVolume)
    })
  )
  return totalVolume
}

export const generateTotalItems = (inventory) => {
  let totalItems = 0
  inventory.forEach((room, i) =>
    room.items.forEach((item) => {
      // parseInt because item.itemAmt is passed in as string
      totalItems = totalItems + parseInt(item.itemAmt)
    })
  )
  return totalItems
}
