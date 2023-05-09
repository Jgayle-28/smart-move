export const getChangedValues = (values, initialValues) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    const hasChanged = initialValues[key] !== value

    if (hasChanged) {
      acc[key] = value
    }
    if (Object.entries(acc).length > 0) {
      return true
    } else return false
    // return acc
  }, {})
}
