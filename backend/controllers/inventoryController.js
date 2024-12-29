const asyncHandler = require('express-async-handler')
const { userHasPermissions } = require('../utils/auth')
const Inventory = require('../models/inventoryModel')

// @desc POST add a an inventory item
// @route /api/inventory
// @access private
const addInventoryItem = asyncHandler(async (req, res) => {
  // create inventory item
  const inventoryItem = await Inventory.create(req.body)

  if (inventoryItem) {
    res.status(201).json(inventoryItem)
  } else {
    res.status(400)
    throw new Error('Invalid company data')
  }
})

// @desc PUT Edit a inventory item
// @route /api/inventory/:itemId
// @access private
const updateInventoryItem = asyncHandler(async (req, res) => {
  const inventoryItem = await Inventory.findById(req.params.itemId)

  if (!inventoryItem) {
    res.status(404)
    throw new Error('Inventory Item not found')
  }
  // Update and return new patient
  const updatedInventoryItem = await Inventory.findByIdAndUpdate(
    req.params.itemId,
    req.body,
    {
      new: true,
    }
  )
  // .populate('customer')
  // .populate('createdBy')
  // .populate('estimate')

  res.status(200).json(updatedInventoryItem)
})

// @desc GET inventory item by id
// @route /api/inventory/:itemId
// @access private
const getInventoryItem = asyncHandler(async (req, res) => {
  const inventoryItem = await Inventory.findOne({ _id: req.params.itemId })
    .populate('company')
    .populate('createdBy')

  if (inventoryItem) {
    res.status(200).json(inventoryItem)
  } else {
    res.status(401)
    throw new Error('Inventory item not found...')
  }
})

// @desc GET customer inventory items by company
// @route /api/inventory/:companyIdd
// @access private
const getInventoryItems = asyncHandler(async (req, res) => {
  const inventoryItems = await Inventory.find({
    company: req.params.companyId,
  })
    .populate('company')
    .populate('createdBy')

  if (!inventoryItems) {
    res.status(404)
    throw new Error(
      'Error getting inventory items, please refresh and try again.'
    )
  }
  res.status(200).json(inventoryItems)
})

// @desc DELETE job
// @route /api/jobs
// @access private
const deleteInventoryItem = asyncHandler(async (req, res) => {
  const inventoryItem = await Inventory.findById(req.params.itemId)
  const canDelete = userHasPermissions(req.user.role)

  if (!inventoryItem) {
    res.status(404)
    throw new Error('Job not found')
  }
  if (!canDelete) {
    res.status(404)
    throw new Error(
      'You do not have the correct credentials to delete the customer.'
    )
  }

  await inventoryItem.deleteOne()

  res.status(200).json({
    success: true,
    message: 'Inventory Item deleted',
    jobId: req.params.id,
  })
})

module.exports = {
  addInventoryItem,
  updateInventoryItem,
  getInventoryItem,
  getInventoryItems,
  deleteInventoryItem,
}
