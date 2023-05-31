import axios from 'axios'
import { getAxiosConfig } from 'src/utils/get-axios-config'
import { USER_API_URL } from '../constants'

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

const authService = {
  registerUser,
  updateUser,
  loginUser,
  logoutUser,
  createUser,
  deleteMember,
  updateMember,
}

export default authService
