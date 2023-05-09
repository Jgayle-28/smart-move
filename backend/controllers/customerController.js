const asyncHandler = require('express-async-handler')
const { userHasPermissions } = require('../utils/auth')

const Customer = require('../models/customerModel')

// @desc POST add a customer
// @route /api/customers
// @access private
const addCustomer = asyncHandler(async (req, res) => {
  const {
    customerName,
    customerEmail,
    customerPhoneNumber,
    altCustomerPhoneNumber,
    customerAddress,
    referredBy,
    company,
    comments,
    addedBy,
  } = req.body

  // Find if company exists
  const customerExists = await Customer.findOne({ customerEmail })

  if (customerExists) {
    res.status(400)
    throw new Error(
      'Customer already exists, please search for customer by email.'
    )
  }

  // create company
  const customer = await Customer.create({
    customerName,
    customerEmail,
    customerPhoneNumber,
    altCustomerPhoneNumber,
    customerAddress,
    referredBy,
    company,
    comments,
    addedBy,
  })

  if (customer) {
    res.status(201).json(customer)
  } else {
    res.status(400)
    throw new Error('Invalid company data')
  }
})

// @desc PUT Edit a customer
// @route /api/customers
// @access private
const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (!customer) {
    res.status(404)
    throw new Error('Customer not found')
  }
  // Update and return new patient
  const updatedCompany = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  res.status(200).json(updatedCompany)
})

// @desc GET customers company id
// @route /api/customers/:id
// @access private
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({
    company: req.params.id,
  })

  if (!customers) {
    res.status(404)
    throw new Error('Error getting customers, please refresh and try again.')
  }
  res.status(200).json(customers)
})

// @desc GET customer by id
// @route /api/customers
// @access private
const getCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findOne({ _id: req.params.id })

  // // If there is a user and the passwords match
  if (customer) {
    res.status(200).json(customer)
  } else {
    res.status(401)
    throw new Error('Customer not found...')
  }
})

// @desc DELETE customer
// @route /api/customers
// @access private
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id)
  const canDelete = userHasPermissions(req.user.role)

  if (!customer) {
    res.status(404)
    throw new Error('Customer not found')
  }
  if (!canDelete) {
    res.status(404)
    throw new Error(
      'You do not have the correct credentials to delete the customer.'
    )
  }
  // delete the company
  await customer.deleteOne()

  res.status(200).json({
    success: true,
    message: 'Company deleted',
    customer: req.params.id,
  })
})

module.exports = {
  addCustomer,
  updateCustomer,
  getCustomer,
  getCustomers,
  deleteCustomer,
}
