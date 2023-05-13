import _ from 'lodash'

// Calculate totals ---------------------------------------------
export const calculatePackingItemTotal = (packingItemQty, packingItemRate) => {
  let total = 0
  total = parseFloat(packingItemQty) * parseFloat(packingItemRate)
  // check if total is a number to stop NaN display
  if (isNaN(total)) {
    total = ''
  }
  return total
}

// Packing Items ---------------------------------------------
export const addPackingItem = (packingItems, packingObj) => {
  let tempItems = packingItems.length ? [...packingItems] : []

  if (tempItems.length > 0) {
    // Check it item is in the array already
    const itemIsPresent = tempItems.some(
      (i) => i.packingItem === packingObj.packingItem
    )
    if (itemIsPresent) {
      // Find the index and update the qty & amt
      const itemIndex = _.findIndex(tempItems, {
        packingItem: packingObj.packingItem,
      })
      tempItems[itemIndex].packingItemQty =
        parseFloat(packingObj.packingItemQty) +
        parseFloat(tempItems[itemIndex].packingItemQty)
      tempItems[itemIndex].packingItemPrice = parseFloat(
        packingObj.packingItemPrice
      )
      return tempItems
    }
  }
  const newItemObj = {
    packingItem: packingObj.packingItem,
    packingItemQty: parseFloat(packingObj.packingItemQty),
    packingItemPrice: parseFloat(packingObj.packingItemPrice),
    packingTotalItemAmt: calculatePackingItemTotal(
      packingObj.packingItemQty,
      packingObj.packingItemPrice
    ),
  }
  // If item is not present add it to the array
  tempItems.push(newItemObj)
  return tempItems
}

export const removePackingItem = (packingItems, packingItem) => {
  const tempItems = packingItems.filter(
    (item) => item.packingItem !== packingItem
  )
  return tempItems
}
