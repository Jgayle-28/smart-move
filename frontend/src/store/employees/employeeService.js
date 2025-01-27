import axios from 'axios'
import { getAxiosConfig } from 'src/utils/get-axios-config'
import { EMPLOYEE_API_URL } from '../constants'

const createEmployee = async (token, employeeData) => {
  const config = getAxiosConfig(token)
  const res = await axios.post(EMPLOYEE_API_URL, employeeData, config)

  if (res.data) return res.data
}

const updateEmployee = async (token, employeeData) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(
    `${EMPLOYEE_API_URL}/${employeeData._id}`,
    employeeData,
    config
  )

  if (res.data) return res.data
}

const getCurrentEmployee = async (token, employeeId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(
    `${EMPLOYEE_API_URL}/current-employee/${employeeId}`,
    config
  )

  if (res.data) return res.data
}

const getEmployees = async (token, companyId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(
    `${EMPLOYEE_API_URL}/current-employees/${companyId}`,
    config
  )

  if (res.data) return res.data
}

const deleteEmployee = async (token, employeeId) => {
  const config = getAxiosConfig(token)
  const res = await axios.delete(`${EMPLOYEE_API_URL}/${employeeId}`, config)

  if (res.data) return res.data.employeeId
}

const jobService = {
  createEmployee,
  updateEmployee,
  getCurrentEmployee,
  getEmployees,
  deleteEmployee,
}

export default jobService
