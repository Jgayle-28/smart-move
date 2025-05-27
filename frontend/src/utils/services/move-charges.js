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
  if (isNaN(total)) return 0
  else return total.toLocaleString()
}

// used to check if required fields are filled in the move charges
// and return an array of missing fields
const REQUIRED_FIELDS = [
  { key: 'totalMen', label: 'number of movers' },
  { key: 'totalTrucks', label: 'number of trucks' },
  { key: 'ratePerHour', label: 'hourly rate' },
]

const isEmpty = (v) => v === '' || v === 0 || v == null

export const getMissingFields = (moveCharges) =>
  !moveCharges
    ? REQUIRED_FIELDS.map((f) => f.label)
    : REQUIRED_FIELDS.filter((f) => isEmpty(moveCharges[f.key])).map(
        (f) => f.label
      )
