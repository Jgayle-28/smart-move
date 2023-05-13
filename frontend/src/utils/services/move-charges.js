export const calculateMoveHours = (totalWeight, totalMen) => {
  let hours = parseFloat(totalWeight) / parseFloat(totalMen * 500)
  hours = (Math.round(hours * 4) / 4).toFixed(2)

  if (isNaN(hours)) {
    hours = ''
  }
  if (totalMen === '') {
    hours = 0
  }

  return hours
}

export const calculateTotalHours = (
  moveHrs = 0,
  driveTime = 0,
  stairHrs = 0,
  longCarryHrs = 0,
  adjustmentTime = 0
) => {
  let total = 0
  total =
    parseFloat(moveHrs) +
    parseFloat(driveTime) +
    parseFloat(stairHrs) +
    parseFloat(longCarryHrs) +
    parseFloat(adjustmentTime)
  return total.toLocaleString()
  // const {} = data
  // let totalHrs = 0
  // // move
  // if (moveHrs.length !== 0) {
  //   totalHrs = parseFloat(moveHrs)
  // }
  // // move , drive time
  // if (moveHrs.length !== 0 && driveTime.length !== 0) {
  //   totalHrs = parseFloat(moveHrs) + parseFloat(driveTime)
  // }
  // // move , stair hours
  // if (moveHrs.length !== 0 && stairHrs.length !== 0) {
  //   totalHrs = parseFloat(moveHrs) + parseFloat(stairHrs)
  // }
  // // move , long carry hours
  // if (moveHrs.length !== 0 && longCarryHrs.length !== 0) {
  //   totalHrs = parseFloat(moveHrs) + parseFloat(longCarryHrs)
  // }
  // // move , adjustment time
  // if (moveHrs.length !== 0 && adjustmentTime.length !== 0) {
  //   totalHrs = parseFloat(moveHrs) + parseFloat(adjustmentTime)
  // }
  // // move , drive time, stairs
  // if (moveHrs.length !== 0 && driveTime.length !== 0 && stairHrs.length !== 0) {
  //   totalHrs =
  //     parseFloat(moveHrs) + parseFloat(driveTime) + parseFloat(stairHrs)
  // }
  // // move , drive time, long carry
  // if (
  //   moveHrs.length !== 0 &&
  //   driveTime.length !== 0 &&
  //   longCarryHrs.length !== 0
  // ) {
  //   totalHrs =
  //     parseFloat(moveHrs) + parseFloat(driveTime) + parseFloat(longCarryHrs)
  // }
  // // move , drive time, adjustment time
  // if (
  //   moveHrs.length !== 0 &&
  //   driveTime.length !== 0 &&
  //   adjustmentTime.length !== 0
  // ) {
  //   totalHrs =
  //     parseFloat(moveHrs) + parseFloat(driveTime) + parseFloat(adjustmentTime)
  // }
  // // move, stairs, long carry hours
  // if (
  //   moveHrs.length !== 0 &&
  //   stairHrs.length !== 0 &&
  //   longCarryHrs.length !== 0
  // ) {
  //   totalHrs =
  //     parseFloat(moveHrs) + parseFloat(stairHrs) + parseFloat(longCarryHrs)
  // }
  // // move, stairs, adjustment time
  // if (
  //   moveHrs.length !== 0 &&
  //   stairHrs.length !== 0 &&
  //   adjustmentTime.length !== 0
  // ) {
  //   totalHrs =
  //     parseFloat(moveHrs) + parseFloat(stairHrs) + parseFloat(adjustmentTime)
  // }
  // // move, stairs, long carry, adjustment time
  // if (
  //   moveHrs.length !== 0 &&
  //   stairHrs.length !== 0 &&
  //   longCarryHrs.length !== 0 &&
  //   adjustmentTime.length !== 0
  // ) {
  //   totalHrs =
  //     parseFloat(moveHrs) +
  //     parseFloat(stairHrs) +
  //     parseFloat(longCarryHrs) +
  //     parseFloat(adjustmentTime)
  // }
  // // move, long carry, adjustment time
  // if (
  //   moveHrs.length !== 0 &&
  //   longCarryHrs.length !== 0 &&
  //   adjustmentTime.length !== 0
  // ) {
  //   totalHrs =
  //     parseFloat(moveHrs) +
  //     parseFloat(longCarryHrs) +
  //     parseFloat(adjustmentTime)
  // }
  // // all hours
  // if (
  //   moveHrs.length !== 0 &&
  //   driveTime.length !== 0 &&
  //   stairHrs.length !== 0 &&
  //   longCarryHrs.length !== 0 &&
  //   adjustmentTime.length !== 0
  // ) {
  //   totalHrs =
  //     parseFloat(moveHrs) +
  //     parseFloat(driveTime) +
  //     parseFloat(stairHrs) +
  //     parseFloat(longCarryHrs) +
  //     parseFloat(adjustmentTime)
  // }
  // // reset total hours to 0
  // if (
  //   moveHrs.length === 0 &&
  //   driveTime.length === 0 &&
  //   stairHrs.length === 0 &&
  //   longCarryHrs.length === 0
  // ) {
  //   totalHrs = 0
  // }
  // return totalHrs
}

export const calculateTotalMoveCharges = (totalHrs, ratePerHour) => {
  return totalHrs * ratePerHour
}

export const calculateTotalMoveCost = (
  totalMoveCost = 0,
  packingTotal = 0,
  additionalServices = 0,
  totalFees = 0,
  storageTotal = 0
) => {
  let total = 0
  total =
    parseFloat(totalMoveCost) +
    parseFloat(packingTotal) +
    parseFloat(additionalServices) +
    parseFloat(totalFees) +
    parseFloat(storageTotal)
  return total.toLocaleString()
}
