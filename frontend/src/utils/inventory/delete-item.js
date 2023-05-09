export const deleteItem = (roomName, itemName, inventory) => {
  let newInventory = [...inventory]
  // find current index room of passed in item then find the element
  var roomToUpdate = newInventory.filter(function (element) {
    return element.roomName === roomName
  })
  // If this is the last item in the room remove the room from the inventory
  if (roomToUpdate[0].items.length === 1) {
    newInventory = newInventory.filter((room) => room.roomName !== roomName)
  } else {
    // Get the room items
    let roomItems = roomToUpdate[0].items

    // get the index of item in the room items array
    var removeIndex = roomItems.map((item) => item.name).indexOf(itemName)
    // Remove the item from room items array
    ~removeIndex && roomItems.splice(removeIndex, 1)
  }

  return newInventory
}
