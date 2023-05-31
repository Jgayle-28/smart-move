const express = require('express')
const {
  addJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getCustomerJobs,
  getCurrentWeekJobs,
} = require('../controllers/jobController')

const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protectRoute, addJob)
router.get('/:id', protectRoute, getJobs)
router.get('/:id/current-week', protectRoute, getCurrentWeekJobs)
router.get('/customer/:id', protectRoute, getCustomerJobs)
router.get('/:id/get', protectRoute, getJob)
router.put('/:id', protectRoute, updateJob)
router.delete('/:id', protectRoute, deleteJob)

module.exports = router
