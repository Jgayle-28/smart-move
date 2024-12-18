const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { userHasPermissions } = require('../utils/auth')

const Company = require('../models/companyModel')
const User = require('../models/userModel')

// @desc POST register a new company
// @route /api/companies
// @access public
const registerCompany = asyncHandler(async (req, res) => {
  const {
    companyName,
    companyEmail,
    companyPhoneNumber,
    companyAddress,
    companyWebsite,
    owner,
  } = req.body

  //  Error checks
  if (!companyName || !companyEmail || !companyPhoneNumber || !companyAddress) {
    res.status(400)
    throw new Error(
      `Please include -> 
      ${!companyName ? 'Company Name' : ''}
       ${!companyEmail ? 'Company Email' : ''} 
      ${!companyPhoneNumber ? 'Company Phone Number' : ''} 
      ${!companyAddress ? 'Company Address' : ''}`
    )
  }

  // Find if company exists
  const companyExists = await Company.findOne({ companyEmail })

  if (companyExists) {
    res.status(400)
    throw new Error('Company already exists')
  }

  // create company
  const company = await Company.create({
    companyName,
    companyEmail,
    companyPhoneNumber,
    companyAddress,
    companyWebsite,
    owner,
  })

  if (company) {
    res.status(201).json(company)
  } else {
    res.status(400)
    throw new Error('Invalid company data')
  }
})

// @desc PUT Edit a company
// @route /api/companies
// @access public
const updateCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id)

  if (!company) {
    res.status(404)
    throw new Error('Company not found')
  }
  // Update and return the updated company
  const updatedCompany = await Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  res.status(200).json(updatedCompany)
})

// @desc GET team by company id
// @route /api/companies
// @access public
const getCompanyTeam = asyncHandler(async (req, res) => {
  const staff = await User.find({
    company: req.params.id,
    isAdmin: false,
  })

  if (!staff) {
    res.status(404)
    throw new Error('Error getting team members, please refresh and try again.')
  }
  res.status(200).json(staff)
})

// @desc GET company by id
// @route /api/companies
// @access public
const getCompany = asyncHandler(async (req, res) => {
  const { companyId } = req.body
  console.log('companyId :>> ', companyId)

  const company = await Company.findOne({ _id: companyId })

  // // If there is a user and the passwords match
  if (company) {
    res.status(200).json({ company })
  } else {
    res.status(401)
    throw new Error('Company not found...')
  }
})

// @desc DELETE user
// @route /api/companies
// @access private
const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id)
  const canDelete = userHasPermissions(req.user.role)

  if (!company) {
    res.status(404)
    throw new Error('Company not found')
  }
  if (!canDelete) {
    res.status(404)
    throw new Error(
      'You do not have the correct credentials to delete the company.'
    )
  }
  // delete the company
  await company.deleteOne()

  res.status(200).json({
    success: true,
    message: 'Company deleted',
    companyId: req.params.id,
  })
})

module.exports = {
  registerCompany,
  updateCompany,
  getCompany,
  deleteCompany,
  getCompanyTeam,
}
