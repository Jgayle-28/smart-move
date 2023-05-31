const asyncHandler = require('express-async-handler')
const { userHasPermissions } = require('../utils/auth')

const Estimate = require('../models/estimateModel')

// @desc POST add a estimate
// @route /api/estimates
// @access private
const addEstimate = asyncHandler(async (req, res) => {
  // const { customer, jobType } = req.body

  // if (!customer || !jobType) {
  //   res.status(400)
  //   throw new Error(
  //     `Please include -> ${!customer ? 'customer' : ''} ${
  //       !jobType ? 'jobType' : ''
  //     }`
  //   )
  // }

  // create Estimate
  const estimate = await Estimate.create(req.body)

  if (estimate) {
    res.status(201).json(estimate)
  } else {
    res.status(400)
    throw new Error('Invalid estimate data')
  }
})

// @desc PUT Edit a job
// @route /api/estimates
// @access private
const updateEstimate = asyncHandler(async (req, res) => {
  const estimate = await Estimate.findById(req.params.id)

  if (!estimate) {
    res.status(404)
    throw new Error('Estimate not found')
  }
  // Update and return new estimate
  const updatedEstimate = await Estimate.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  res.status(200).json(updatedEstimate)
})

// @desc GET estimates by company id
// @route /api/estimates/:id
// @access private
const getEstimates = asyncHandler(async (req, res) => {
  const estimates = await Estimate.find({
    company: req.params.id,
  })
    .populate('customer')
    .populate('createdBy')
    .populate('job')

  if (!estimates) {
    res.status(404)
    throw new Error('Error getting estimates, please refresh and try again.')
  }
  res.status(200).json(estimates)
})

// @desc GET estimates by company id
// @route /api/estimates/customer/:id
// @access private
const getCustomerEstimates = asyncHandler(async (req, res) => {
  const estimates = await Estimate.find({
    customer: req.params.id,
  })

  if (!estimates) {
    res.status(404)
    throw new Error('Error getting estimates, please refresh and try again.')
  }
  res.status(200).json(estimates)
})

// @desc GET estimate by id
// @route /api/estimates/:id/get
// @access private
const getEstimate = asyncHandler(async (req, res) => {
  const estimate = await Estimate.findOne({ _id: req.params.id })
    .populate('customer')
    .populate('createdBy')
  // .populate('company')

  if (estimate) {
    res.status(200).json(estimate)
  } else {
    res.status(401)
    throw new Error('Estimate not found...')
  }
})

// @desc DELETE estimate
// @route /api/estimates
// @access private
const deleteEstimate = asyncHandler(async (req, res) => {
  const estimate = await Estimate.findById(req.params.id)
  const canDelete = userHasPermissions(req.user.role)

  if (!estimate) {
    res.status(404)
    throw new Error('Estimate not found')
  }
  if (!canDelete) {
    res.status(404)
    throw new Error(
      'You do not have the correct credentials to delete the customer.'
    )
  }
  // delete the company
  await estimate.deleteOne()

  res.status(200).json({
    success: true,
    message: 'Estimate deleted',
    estimateId: req.params.id,
  })
})

module.exports = {
  addEstimate,
  updateEstimate,
  getEstimates,
  getCustomerEstimates,
  getEstimate,
  deleteEstimate,
}
