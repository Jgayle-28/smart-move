import _ from 'lodash'

export const deleteItem = (roomName, itemName, inventory) => {
  // Deeply clone the inventory to avoid mutating the original reference
  let newInventory = _.cloneDeep(inventory)

  // Find the room to update
  let roomToUpdate = newInventory.find((room) => room.roomName === roomName)

  if (roomToUpdate) {
    // If this is the last item in the room, remove the room
    if (roomToUpdate.items.length === 1) {
      newInventory = newInventory.filter((room) => room.roomName !== roomName)
    } else {
      // Find the index of the item to remove
      let removeIndex = roomToUpdate.items.findIndex(
        (item) => item.name === itemName
      )

      // If the item exists, remove it
      if (removeIndex !== -1) {
        roomToUpdate.items.splice(removeIndex, 1)
      }
    }
  }

  return newInventory // Return the updated newInventory
}
