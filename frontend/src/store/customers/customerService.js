import axios from 'axios'
import { getAxiosConfig } from 'src/utils/get-axios-config'

const API_URL = `/api/customers`

const addCustomer = async (token, companyData) => {
  const config = getAxiosConfig(token)
  const res = await axios.post(API_URL, companyData, config)

  if (res.data) return res.data
}

const getCustomers = async (token, companyId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/${companyId}`, config)

  if (res.data) return res.data
}

const getCustomer = async (token, customerId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/${customerId}/get`, config)

  if (res.data) return res.data
}

const updateCustomer = async (token, customerData) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(
    `${API_URL}/${customerData._id}`,
    customerData,
    config
  )

  if (res.data) return res.data
}

const deleteCustomer = async (token, customerId) => {
  const config = getAxiosConfig(token)
  const res = await axios.delete(`${API_URL}/${customerId}`, config)

  if (res.data) return res.data.customerId
}

const customerService = {
  addCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
}

export default customerService
