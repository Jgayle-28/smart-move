import axios from 'axios'
import { getAxiosConfig } from 'src/utils/get-axios-config'

const API_URL = `/api/estimates`

const addEstimate = async (token, estimateData) => {
  const config = getAxiosConfig(token)
  const res = await axios.post(API_URL, estimateData, config)

  if (res.data) return res.data
}

const getEstimates = async (token, companyId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/${companyId}`, config)

  if (res.data) return res.data
}

const getEstimate = async (token, estimateId) => {
  console.log('estimateId in service', estimateId)
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/${estimateId}/get`, config)

  if (res.data) return res.data
}

const updateEstimate = async (token, estimateData) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(
    `${API_URL}/${estimateData._id}`,
    estimateData,
    config
  )

  if (res.data) return res.data
}

const deleteEstimate = async (token, estimateId) => {
  const config = getAxiosConfig(token)
  const res = await axios.delete(`${API_URL}/${estimateId}`, config)

  if (res.data) return res.data.estimateId
}

const estimateService = {
  addEstimate,
  getEstimates,
  getEstimate,
  updateEstimate,
  deleteEstimate,
}

export default estimateService
