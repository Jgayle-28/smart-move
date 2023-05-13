export const generateItemObj = (item, currentRoom) => {
  let room = currentRoom
  let volume = item.itemVolume || item.volume
  let weight = item.itemWeight || item.weight
  let name = item.itemName || item.name
  let itemAmt = 1

  return {
    roomName: room,
    item: {
      name,
      itemAmt,
      volume,
      weight,
      calcVolume: volume,
      calcWeight: weight,
    },
  }
}
