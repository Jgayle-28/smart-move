export const addItem = (item, inventory) => {
  let newInventory = [...inventory]
  // Check if room exists in inventory
  let roomInInventory = newInventory.some(
    (elem) => elem.roomName === item.roomName
  )

  // If room is in inventory, update room items
  if (roomInInventory) {
    // Find the index of the room to be updated
    let roomToUpdateIndex = newInventory.findIndex(
      (element) => element.roomName === item.roomName
    )

    // Get a copy of the room to be updated
    let roomToUpdate = { ...newInventory[roomToUpdateIndex] }

    // Get room items from the current room
    let roomItems = [...roomToUpdate.items]

    // Check if the item is in room items
    let itemInRoomIndex = roomItems.findIndex(
      (elem) => elem.name === item.item.name
    )

    // If item is in room items
    if (itemInRoomIndex !== -1) {
      // Update the existing item
      let updatedItem = { ...roomItems[itemInRoomIndex] }
      updatedItem.itemAmt += 1
      updatedItem.calcVolume =
        parseInt(updatedItem.calcVolume) + parseInt(item.item.calcVolume)
      updatedItem.calcWeight =
        parseInt(updatedItem.calcWeight) + parseInt(item.item.calcWeight)

      // Replace the item in roomItems with the updated one
      roomItems[itemInRoomIndex] = updatedItem
    } else {
      // If item is not in room items, add it to the room
      roomItems.push(item.item)
    }

    // Update the room items in the copied room object
    roomToUpdate.items = roomItems

    // Update the room in the newInventory array
    newInventory[roomToUpdateIndex] = roomToUpdate
  } else {
    // If room is not in inventory, add item to inventory
    let newItem = {
      roomName: item.roomName,
      items: [item.item],
    }
    newInventory.push(newItem)
  }

  return newInventory
}
