import axios from 'axios'
import { getAxiosConfig } from 'src/utils/get-axios-config'
import { ESTIMATE_API_URL } from '../constants'

const addEstimate = async (token, estimateData) => {
  const config = getAxiosConfig(token)
  const res = await axios.post(ESTIMATE_API_URL, estimateData, config)

  if (res.data) return res.data
}

const getEstimates = async (token, companyId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${ESTIMATE_API_URL}/${companyId}`, config)

  if (res.data) return res.data
}

const getEstimate = async (token, estimateId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${ESTIMATE_API_URL}/${estimateId}/get`, config)

  if (res.data) return res.data
}

const updateEstimate = async (token, estimateData) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(
    `${ESTIMATE_API_URL}/${estimateData._id}`,
    estimateData,
    config
  )

  if (res.data) return res.data
}

const deleteEstimate = async (token, estimateId) => {
  const config = getAxiosConfig(token)
  const res = await axios.delete(`${ESTIMATE_API_URL}/${estimateId}`, config)

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
