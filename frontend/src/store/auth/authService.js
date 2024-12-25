import axios from 'axios'
import { getAxiosConfig } from 'src/utils/get-axios-config'
import { USER_API_URL } from '../constants'
import { isTokenExpired } from 'src/utils/auth'

// Register User
const registerUser = async (userData) => {
  const res = await axios.post(USER_API_URL, userData)

  if (res.data) {
    localStorage.setItem('sm-user', JSON.stringify(res.data))
  }
  return res.data
}

const createUser = async (userData) => {
  const res = await axios.post(USER_API_URL, userData)

  if (res.data) {
    return res.data
  }
}

const updateUser = async (token, userData) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(`${USER_API_URL}`, userData, config)

  if (res.data) {
    res.data.token = token
    localStorage.setItem('sm-user', JSON.stringify(res.data))
  }
  return res.data
}

// Login User
const loginUser = async (userData) => {
  const res = await axios.post(`${USER_API_URL}/login`, userData)

  if (res.data) {
    localStorage.setItem('sm-user', JSON.stringify(res.data))
  }
  return res.data
}

const logoutUser = () => {
  localStorage.removeItem('sm-user')
}

// Delete member -> used in admin account deleting team members and when deleting main account
const deleteMember = async (token, memberId) => {
  const config = getAxiosConfig(token)
  const res = await axios.delete(`${USER_API_URL}/${memberId}`, config)

  if (res.data) return res.data.memberId
}

// Delete member -> used in admin account deleting team members and when deleting main account
const updateMember = async (token, memberData) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(`${USER_API_URL}`, memberData, config)

  if (res.data) return res.data
}

// Forgot Password - Request reset link
const forgotPassword = async (email) => {
  const res = await axios.post(`${USER_API_URL}/forgot-password`, { email })
  return res.data
}

// Reset Password - Update password
const resetPassword = async (token, password) => {
  const res = await axios.post(`${USER_API_URL}/reset-password/${token}`, {
    password,
  })
  return res.data
}

// Confirm Code - Validate the confirmation code (optional, if you use it)
const confirmCode = async (token, code) => {
  const res = await axios.post(`${USER_API_URL}/confirm-code`, { token, code })
  return res.data
}

const authService = {
  registerUser,
  updateUser,
  loginUser,
  logoutUser,
  createUser,
  deleteMember,
  updateMember,
  forgotPassword,
  resetPassword,
  confirmCode,
}

export default authService
