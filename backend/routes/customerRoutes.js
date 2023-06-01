const express = require('express')
const {
  addCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  getCurrentWeekCustomers,
} = require('../controllers/customerController')

const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protectRoute, addCustomer)
router.get('/:id', protectRoute, getCustomers)
router.get('/:id/current-week', protectRoute, getCurrentWeekCustomers)
router.get('/:id/get', protectRoute, getCustomer)
router.put('/:id', protectRoute, updateCustomer)
router.delete('/:id', protectRoute, deleteCustomer)

module.exports = router
