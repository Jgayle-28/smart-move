import axios from 'axios'
import { getAxiosConfig } from 'src/utils/get-axios-config'
import { INVENTORY_API_URL } from '../constants'

const addInventoryItem = async (token, itemData) => {
  const config = getAxiosConfig(token)
  const res = await axios.post(INVENTORY_API_URL, itemData, config)

  if (res.data) return res.data
}

const updateInventoryItem = async (token, itemData) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(
    `${INVENTORY_API_URL}/${itemData._id}`,
    itemData,
    config
  )

  if (res.data) return res.data
}

const getInventoryItems = async (token, companyId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${INVENTORY_API_URL}/${companyId}`, config)

  if (res.data) return res.data
}

const getInventoryItem = async (token, itemId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${INVENTORY_API_URL}/${itemId}`, config)

  if (res.data) return res.data
}

const deleteInventoryItem = async (token, itemId) => {
  const config = getAxiosConfig(token)
  const res = await axios.delete(`${INVENTORY_API_URL}/${itemId}`, config)

  if (res.data) return res.data.jobId
}

const inventoryService = {
  addInventoryItem,
  updateInventoryItem,
  getInventoryItems,
  getInventoryItem,
  deleteInventoryItem,
}

export default inventoryService
