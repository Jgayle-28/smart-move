const express = require('express')
const {
  addEstimate,
  getEstimates,
  getEstimate,
  updateEstimate,
  deleteEstimate,
  getCustomerEstimates,
  getCurrentWeekEstimates,
} = require('../controllers/estimateController')

const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protectRoute, addEstimate)
router.get('/:id', protectRoute, getEstimates)
router.get('/:id/current-week', protectRoute, getCurrentWeekEstimates)
router.get('/customer/:id', protectRoute, getCustomerEstimates)
router.get('/:id/get', protectRoute, getEstimate)
router.put('/:id', protectRoute, updateEstimate)
router.delete('/:id', protectRoute, deleteEstimate)

module.exports = router
