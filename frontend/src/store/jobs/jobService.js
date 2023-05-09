import axios from 'axios'
import { getAxiosConfig } from 'src/utils/get-axios-config'

const API_URL = `/api/jobs`

const addJob = async (token, jobData) => {
  const config = getAxiosConfig(token)
  const res = await axios.post(API_URL, jobData, config)

  if (res.data) return res.data
}

const getJobs = async (token, companyId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/${companyId}`, config)

  if (res.data) return res.data
}

const getJob = async (token, jobId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${API_URL}/${jobId}/get`, config)

  if (res.data) return res.data
}

const updateJob = async (token, jobData) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(`${API_URL}/${jobData._id}`, jobData, config)

  if (res.data) return res.data
}

const deleteJob = async (token, jobId) => {
  const config = getAxiosConfig(token)
  const res = await axios.delete(`${API_URL}/${jobId}`, config)

  if (res.data) return res.data.jobId
}

const jobService = {
  addJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
}

export default jobService
