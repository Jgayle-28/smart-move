import { jwtDecode } from 'jwt-decode'

export var Issuer
;(function (Issuer) {
  Issuer['Auth0'] = 'Auth0'
  Issuer['Firebase'] = 'Firebase'
  Issuer['JWT'] = 'JWT'
  Issuer['Amplify'] = 'Amplify'
})(Issuer || (Issuer = {}))

export function extractErrorMessage(error) {
  return error.response?.data?.message || error.message || error.toString()
}

// Decode JWT token
export const decodeToken = (token) => {
  try {
    return jwtDecode(token)
  } catch (error) {
    return null
  }
}

// Check if JWT token is expired
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token)
  if (!decoded) return true

  const currentTime = Date.now() / 1000 // Current time in seconds
  return decoded.exp < currentTime
}
