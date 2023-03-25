const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// Used for Primary APPLICATION ACTIONS
// I.E. -> Deleting users, etc...
const userHasPermissions = (userRole) => {
  if (userRole === 'super-admin' || userRole === 'admin') {
    return true
  } else return false
}

module.exports = { generateToken, userHasPermissions }
