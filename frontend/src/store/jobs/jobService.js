import axios from 'axios'
import { getAxiosConfig } from 'src/utils/get-axios-config'
import { JOB_API_URL } from '../constants'

const addJob = async (token, jobData) => {
  const config = getAxiosConfig(token)
  const res = await axios.post(JOB_API_URL, jobData, config)

  if (res.data) return res.data
}

const getJobs = async (token, companyId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${JOB_API_URL}/${companyId}`, config)

  if (res.data) return res.data
}

const getCurrentWeekJobs = async (token, companyId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(
    `${JOB_API_URL}/${companyId}/current-week`,
    config
  )

  if (res.data) return res.data
}

const getAnnualJobs = async (token, companyId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${JOB_API_URL}/${companyId}/annual-jobs`, config)

  if (res.data) return res.data
}

const getJob = async (token, jobId) => {
  const config = getAxiosConfig(token)
  const res = await axios.get(`${JOB_API_URL}/${jobId}/get`, config)

  if (res.data) return res.data
}

const updateJob = async (token, jobData) => {
  const config = getAxiosConfig(token)
  const res = await axios.put(`${JOB_API_URL}/${jobData._id}`, jobData, config)

  if (res.data) return res.data
}

const deleteJob = async (token, jobId) => {
  const config = getAxiosConfig(token)
  const res = await axios.delete(`${JOB_API_URL}/${jobId}`, config)

  if (res.data) return res.data.jobId
}

const jobService = {
  addJob,
  getJobs,
  getCurrentWeekJobs,
  getAnnualJobs,
  getJob,
  updateJob,
  deleteJob,
}

export default jobService
