import axios from 'axios'
import { getAxiosConfig } from 'src/utils/get-axios-config'

const API_URL = `/api/companies`

// Register company
const registerCompany = async (companyData) => {
  const res = await axios.post(API_URL, companyData)

  if (res.data) {
    localStorage.setItem('sm-company', JSON.stringify(res.data))
  }
  return res.data
}

// Get company
const getCompany = async (token, companyId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/${companyId}`, config)

  if (res.data) return res.data
}

// Update company
const updateCompany = async (token, companyData) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(
    `${API_URL}/${companyData._id}`,
    companyData,
    config
  )

  if (res.data) {
    localStorage.setItem('sm-company', JSON.stringify(res.data))
  }
  return res.data
}

// Delete company
const deleteCompany = async (token, companyId) => {
  const config = getAxiosConfig(token)
  const res = await axios.delete(`${API_URL}/${companyId}`, config)

  if (res.data) {
    localStorage.removeItem('sm-company')
  }
  return res.data
}

const companyService = {
  registerCompany,
  getCompany,
  updateCompany,
  deleteCompany,
}

export default companyService
