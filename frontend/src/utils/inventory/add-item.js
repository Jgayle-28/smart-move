export const addItem = (item, inventory) => {
  let newInventory = [...inventory]
  // check if room exists in inventory
  let roomInInventory = newInventory.some(
    (elem) => elem.roomName === item.roomName
  )

  // if room is in inventory update room items
  if (roomInInventory) {
    // find current index room of passed in item then find the element
    var roomToUpdate = newInventory.filter(function (element) {
      return element.roomName === item.roomName
    })

    // Gets room items from current room
    let roomItems = roomToUpdate[0].items

    // checks to see if item is in room items
    let itemInRoom = roomItems.find((elem) => elem.name === item.item.name)

    // If item in room items
    if (itemInRoom) {
      // add 1 to amount
      itemInRoom.itemAmt += 1
      // update calculated volume
      itemInRoom.calcVolume =
        parseInt(itemInRoom.calcVolume) + parseInt(item.item.calcVolume)
      // update calculated weight
      itemInRoom.calcWeight =
        parseInt(itemInRoom.calcWeight) + parseInt(item.item.calcWeight)
    } else {
      // If item is not in room items then add item to room
      roomToUpdate[0].items.push(item.item)
      // this.setState({ inventory: roomToUpdate });
    }
  } else {
    // If room is not in inventory then add item to inventory
    let newItem = {
      roomName: item.roomName,
      items: [item.item],
    }
    newInventory.push(newItem)
  }

  return newInventory
}
