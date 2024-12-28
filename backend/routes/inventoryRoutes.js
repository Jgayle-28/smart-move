const express = require('express')
const {
  addInventoryItem,
  updateInventoryItem,
  getInventoryItem,
  getInventoryItems,
  deleteInventoryItem,
} = require('../controllers/inventoryController')

const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protectRoute, addInventoryItem)
router.get('/:companyId', protectRoute, getInventoryItems)
router.get('/:itemId', protectRoute, getInventoryItem)
router.put('/:itemId', protectRoute, updateInventoryItem)
router.delete('/:itemId', protectRoute, deleteInventoryItem)

module.exports = router
