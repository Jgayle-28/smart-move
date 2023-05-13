import _ from 'lodash'

// Service Item Handlers ---------------------------------------------
export const addServiceItem = (serviceItems, serviceObj) => {
  let tempItems = serviceItems.length ? [...serviceItems] : []

  if (tempItems.length > 0) {
    // Check it item is in the array already
    const itemIsPresent = tempItems.some(
      (i) => i.serviceName === serviceObj.serviceName
    )
    if (itemIsPresent) {
      // Find the index and update the qty & amt
      const itemIndex = _.findIndex(tempItems, {
        serviceName: serviceObj.serviceName,
      })

      tempItems[itemIndex].serviceName = serviceObj.serviceName
      tempItems[itemIndex].serviceAmount = parseFloat(serviceObj.serviceAmount)
      return tempItems
    }
  }
  const newItemObj = {
    serviceName: serviceObj.serviceName,
    serviceAmount: parseFloat(serviceObj.serviceAmount),
  }
  // If item is not present add it to the array
  tempItems.push(newItemObj)
  return tempItems
}

export const removeServiceItem = (serviceItems, serviceItem) => {
  console.log('serviceItems :>> ', serviceItems)
  console.log('serviceItem :>> ', serviceItem)
  const tempItems = serviceItems.filter(
    (item) => item.serviceName !== serviceItem
  )
  return tempItems
}
