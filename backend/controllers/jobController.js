const asyncHandler = require('express-async-handler')
const { userHasPermissions } = require('../utils/auth')

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

  res.status(200).json(updatedJob)
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
  getJobs,
  getJob,
  deleteJob,
}