import axios from 'axios'

const API_URL = `/api/users`

// Register User
const registerUser = async (userData) => {
  const res = await axios.post(API_URL, userData)

  if (res.data) {
    localStorage.setItem('sm-user', JSON.stringify(res.data))
  }
  return res.data
}

// Login User
const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData)

  if (res.data) {
    localStorage.setItem('sm-user', JSON.stringify(res.data))
  }
  return res.data
}

const logoutUser = () => {
  localStorage.removeItem('sm-user')
}

const authService = { registerUser, loginUser, logoutUser }

export default authService
