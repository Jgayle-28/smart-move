const asyncHandler = require('express-async-handler')
const { userHasPermissions } = require('../utils/auth')
const {
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
} = require('date-fns')

const Job = require('../models/jobModel')

// @desc POST add a job
// @route /api/jobs
// @access private
const addJob = asyncHandler(async (req, res) => {
  const { customer, jobType } = req.body

  if (!customer || !jobType) {
    res.status(400)
    throw new Error(
      `Please include -> ${!customer ? 'customer' : ''} ${
        !jobType ? 'jobType' : ''
      }`
    )
  }

  // create job
  const job = await Job.create(req.body)

  if (job) {
    res.status(201).json(job)
  } else {
    res.status(400)
    throw new Error('Invalid company data')
  }
})

// @desc PUT Edit a job
// @route /api/jobs
// @access private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)

  if (!job) {
    res.status(404)
    throw new Error('Job not found')
  }
  // Update and return new patient
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate('customer')
    .populate('createdBy')
    .populate('estimate')

  res.status(200).json(updatedJob)
})

// @desc GET jobs by company id for current week
// @route /api/jobs/:id/current-week
// @access private
const getCurrentWeekJobs = asyncHandler(async (req, res) => {
  const { id } = req.params

  // Get the current date and calculate the start and end dates of the current week
  const currentDate = new Date()
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }) // Start of the week (Monday)
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 }) // End of the week (Sunday)

  const jobs = await Job.find({
    company: id,
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  })
  // .populate('customer')
  // .populate('createdBy')
  // .populate('estimate')

  if (!jobs) {
    res.status(404)
    throw new Error('Error getting jobs, please refresh and try again.')
  }

  res.status(200).json(jobs)
})

// @desc GET jobs by company id
// @route /api/jobs/:id
// @access private
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({
    company: req.params.id,
  })
    .populate('customer')
    .populate('createdBy')
    .populate('estimate')

  if (!jobs) {
    res.status(404)
    throw new Error('Error getting jobs, please refresh and try again.')
  }
  res.status(200).json(jobs)
})

// @desc GET jobs by company id per month
// @route /api/jobs/:id/annual-jobs
// @access private
const getAnnualJobs = asyncHandler(async (req, res) => {
  const { id } = req.params
  // Get the current date and calculate the start and end dates of the current year
  const currentDate = new Date()
  const startYear = startOfYear(currentDate) // Start of the year (January 1st)
  const endYear = endOfYear(currentDate) // End of the year (December 31st)

  const jobs = await Job.find({
    company: id,
    jobDate: {
      $gte: startYear,
      $lte: endYear,
    },
  })

  // Calculate the number of jobs per month
  const jobsCountPerMonth = []
  for (let i = 0; i < 12; i++) {
    const startMonth = startOfMonth(new Date(currentDate.getFullYear(), i)) // Start of the month
    const endMonth = endOfMonth(new Date(currentDate.getFullYear(), i)) // End of the month

    const jobsCount = jobs.filter(
      (job) => job.jobDate >= startMonth && job.jobDate <= endMonth
    ).length
    jobsCountPerMonth.push(jobsCount)
  }

  if (!jobs) {
    res.status(404)
    throw new Error('Error getting jobs, please refresh and try again.')
  }
  res.status(200).json(jobsCountPerMonth)
})

// @desc GET job by id
// @route /api/jobs/:id
// @access private
const getJob = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id })
    .populate('customer')
    .populate('createdBy')
    .populate('estimate')

  if (job) {
    res.status(200).json(job)
  } else {
    res.status(401)
    throw new Error('Job not found...')
  }
})

// @desc GET customer jobs by company customerId
// @route /api/jobs/customer/:id
// @access private
const getCustomerJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({
    customer: req.params.id,
  })

  if (!jobs) {
    res.status(404)
    throw new Error('Error getting jobs, please refresh and try again.')
  }
  res.status(200).json(jobs)
})

// @desc DELETE job
// @route /api/jobs
// @access private
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
  const canDelete = userHasPermissions(req.user.role)

  if (!job) {
    res.status(404)
    throw new Error('Job not found')
  }
  if (!canDelete) {
    res.status(404)
    throw new Error(
      'You do not have the correct credentials to delete the customer.'
    )
  }
  // delete the company
  await job.deleteOne()

  res.status(200).json({
    success: true,
    message: 'Job deleted',
    jobId: req.params.id,
  })
})

module.exports = {
  addJob,
  updateJob,
  getCurrentWeekJobs,
  getAnnualJobs,
  getJobs,
  getCustomerJobs,
  getJob,
  deleteJob,
}
